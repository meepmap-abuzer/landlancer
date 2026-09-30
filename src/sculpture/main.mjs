import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import noise from './noise.glsl?raw';
// Terrain displacement adapted from André Mattos / Codrops InteractiveLandscape.
// The shipped notice retains the original resource terms and noise license.
const host=document.querySelector('.sculpture-stage');
if(host) init().catch(error=>{host.dataset.state='fallback';host.querySelector('.sculpture-hint').textContent='Интерактивная сцена недоступна в этом браузере';host.querySelector('.sculpture-react').hidden=true;console.warn('3D scene unavailable',error.message)});
async function init(){
 const canvasHost=host.querySelector('.sculpture-canvas');
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700?1.25:1.6));
 renderer.setClearColor(0x141414,1);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
 canvasHost.append(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(40,1,.1,100);
 const env=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const environment=env.fromScene(room,.04);scene.environment=environment.texture;room.dispose();env.dispose();
 scene.add(new THREE.HemisphereLight(0xddeaf5,0x29282a,2.4));
 const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(-5,8,4);scene.add(key);
 const rim=new THREE.DirectionalLight(0x78bde1,2);rim.position.set(8,3,-3);scene.add(rim);
 const uniforms={time:{value:0},pointer:{value:new THREE.Vector2()},pulse:{value:0}};
 const material=new THREE.ShaderMaterial({uniforms,side:THREE.DoubleSide,vertexShader:noise+`
 uniform float time;uniform vec2 pointer;uniform float pulse;varying vec3 vWorld;varying float vH;
 void main(){
 float t=time*.035;
 float angleCenter=uv.y*3.14159265*4.0+t*.9;
 float centerOff=(sin(angleCenter)+sin(angleCenter*.5))*.14;
 vec3 noiseIn=vec3(uv,1.0)*3.0;
 float n=cnoise(vec3(noiseIn.x,noiseIn.y+t,noiseIn.z))+1.0;
 float f=abs(cos((uv.x-centerOff)*3.14159265));
 float h=n*pow(f,2.0)*2.9;
 h+=sin(uv.x*14.0+uv.y*9.0+t)*.2;
 h+=pulse*.12*sin(uv.x*20.0+time*2.0);
 vec3 transformed=vec3(position.xy,position.z+h);
 vec4 world=modelMatrix*vec4(transformed,1.0);vWorld=world.xyz;vH=h;
 gl_Position=projectionMatrix*viewMatrix*world;
 }`,fragmentShader:`
 varying vec3 vWorld;varying float vH;
 void main(){
 vec3 normal=normalize(cross(dFdx(vWorld),dFdy(vWorld)));
 if(!gl_FrontFacing)normal=-normal;
 vec3 light=normalize(vec3(-.5,1.0,.7));
 float diffuse=max(0.0,dot(normal,light));
 vec3 viewDir=normalize(cameraPosition-vWorld);
 float spec=pow(max(dot(normal,normalize(light+viewDir)),0.0),36.0);
 float fresnel=pow(1.0-abs(dot(normal,viewDir)),3.0);
 float grain=fract(sin(dot(vWorld.xz*550.0,vec2(12.9898,78.233)))*43758.5453);
 vec3 base=mix(vec3(.038,.042,.047),vec3(.20,.22,.24),clamp(vH/3.5,0.0,1.0));
 vec3 color=base*(.45+diffuse*1.6)+spec*.22+fresnel*vec3(.07,.11,.14);
 color*=.88+grain*.16;
 float fog=smoothstep(6.0,14.0,-vWorld.z);
 color=mix(color,vec3(.007),fog);
 gl_FragColor=vec4(color,1.0);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`});
 const ground=new THREE.Mesh(new THREE.PlaneGeometry(32,24,220,140),material);ground.rotation.x=-Math.PI/2;ground.position.set(0,-1,-4);scene.add(ground);
 const butterflies=[];const hitTargets=[];
 const wingShape=new THREE.Shape();wingShape.moveTo(0,0);wingShape.bezierCurveTo(.15,.42,.8,.62,.72,.16);wingShape.bezierCurveTo(.7,-.04,.47,-.04,.40,-.08);wingShape.bezierCurveTo(.67,-.27,.38,-.60,.14,-.30);wingShape.quadraticCurveTo(.07,-.15,0,0);
 const wingGeometry=new THREE.ExtrudeGeometry(wingShape,{depth:.012,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.012,bevelThickness:.008,curveSegments:20});
 for(let i=0;i<5;i++){
  const group=new THREE.Group();const mat=new THREE.MeshPhysicalMaterial({color:i%2?0xd8d2c5:0x97c9e4,metalness:.82,roughness:.2,clearcoat:1,side:THREE.DoubleSide});
  const wings=[new THREE.Mesh(wingGeometry,mat),new THREE.Mesh(wingGeometry,mat)];
  wings[1].scale.x=-1;wings.forEach(w=>{group.add(w);hitTargets.push(w);w.userData.butterfly=i});
  const body=new THREE.Mesh(new THREE.CapsuleGeometry(.035,.40,4,8),new THREE.MeshStandardMaterial({color:0x282a2d,metalness:.9,roughness:.3}));group.add(body);
  group.rotation.x=-.65;group.scale.setScalar(.42+i*.025);scene.add(group);
  butterflies.push({group,wings,base:new THREE.Vector3(-5+i*2.6,1.6+(i%2)*.6,-.6-(i%3)*1.3),flight:0,seed:i*1.7});
 }
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let visible=true,paused=false,raf=0,last=0,elapsed=0;
 const pointer=new THREE.Vector2();const raycaster=new THREE.Raycaster();let pendingRay=false;
 function wake(index=-1){if(reduced.matches||paused)return;butterflies.forEach((b,i)=>{if(index<0||i===index)b.flight=1});uniforms.pulse.value=1;host.querySelector('.sculpture-status').textContent='Бабочки взлетают над ландшафтом.';}
 host.querySelector('.sculpture-react').addEventListener('click',()=>wake());
 host.addEventListener('pointermove',event=>{if(event.pointerType==='touch'||paused||reduced.matches)return;const r=host.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1));pendingRay=true;start()},{passive:true});
 host.addEventListener('pointerleave',()=>pointer.set(0,0));
 host.addEventListener('click',event=>{if(event.target===renderer.domElement)wake()});
 const pause=document.querySelector('.garden-motion');
 function sync(){paused=document.body.classList.contains('motion-paused');if(paused||reduced.matches||!visible||document.hidden){cancelAnimationFrame(raf);raf=0;host.dataset.motion='paused';}else start();renderOnce();}
 new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()},{threshold:.01}).observe(host);
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
 function renderOnce(){renderer.render(scene,camera)}
 function start(){if(!raf&&visible&&!document.hidden&&!paused&&!reduced.matches){last=performance.now();raf=requestAnimationFrame(frame);host.dataset.motion='running'}}
 function frame(now){raf=0;if(!visible||document.hidden||paused||reduced.matches)return;const dt=Math.min((now-last)/1000,.05);if(now-last<32){raf=requestAnimationFrame(frame);return}last=now;elapsed+=dt;uniforms.time.value=elapsed;uniforms.pulse.value*=.96;
  camera.position.x+=(pointer.x*.7-camera.position.x)*.04;camera.lookAt(0,.4,-2);
  if(pendingRay){raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(hitTargets);if(hits.length)wake(hits[0].object.userData.butterfly);pendingRay=false;}
  butterflies.forEach(b=>{b.flight=Math.max(0,b.flight-dt*.18);const t=elapsed+b.seed;const fly=Math.sin(b.flight*Math.PI);b.group.position.copy(b.base);b.group.position.x+=Math.sin(t*.8)*.20+fly*Math.sin(t*1.7)*1.4;b.group.position.y+=Math.sin(t)*.1+fly*1.8;b.group.position.z+=fly*Math.cos(t)*1.2;b.group.rotation.z=Math.sin(t)*.10+fly*.2;const flap=Math.sin(t*(b.flight>0?18:3))*(b.flight>0?1.1:.40);b.wings[0].rotation.y=flap;b.wings[1].rotation.y=-flap;});
  renderOnce();raf=requestAnimationFrame(frame);
 }
 function resize(){const {width,height}=host.getBoundingClientRect();renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.set(0,width<650?8:5.0,width<650?15:10.8);camera.lookAt(0,.4,-2);camera.updateProjectionMatrix();renderOnce();}
 new ResizeObserver(resize).observe(host);resize();butterflies.forEach(b=>b.group.position.copy(b.base));host.dataset.state='ready';sync();
 renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(raf);raf=0;host.dataset.state='fallback';host.querySelector('.sculpture-hint').textContent='3D-сцена приостановлена. Обновите страницу для восстановления.'});
 addEventListener('pagehide',event=>{cancelAnimationFrame(raf);raf=0;if(!event.persisted){renderer.dispose();environment.dispose();}});addEventListener('pageshow',sync);
}
