import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';

const host=document.querySelector('.sculpture-stage');
if(host){try{mount();}catch(error){host.dataset.state='fallback';host.querySelector('.sculpture-hint').textContent='3D недоступно в этом браузере';console.warn(error.message);}}
function mount(){
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
 renderer.setClearColor(0x141414,1);
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
 const canvas=renderer.domElement;canvas.setAttribute('aria-hidden','true');canvas.style.touchAction='pan-y';
 host.querySelector('.sculpture-canvas').append(canvas);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,80);
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();
 const environment=pmrem.fromScene(room,.025);scene.environment=environment.texture;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xffffff,0x272c34,1.5));
 const key=new THREE.DirectionalLight(0xffffff,4);key.position.set(-5,6,5);scene.add(key);
 const rim=new THREE.DirectionalLight(0x76bde8,3);rim.position.set(5,2,-5);scene.add(rim);
 const object=new THREE.Group();scene.add(object);
 class RibbonPath extends THREE.Curve{
  getPoint(t,target=new THREE.Vector3()){
   const a=t*Math.PI*2;
   return target.set(3.1*(2+Math.cos(3*a)*.46)*Math.cos(2*a),1.25*Math.sin(3*a),1.45*(2+Math.cos(3*a)*.46)*Math.sin(2*a));
  }
 }
 const path=new RibbonPath(),steps=420,sides=16,frames=path.computeFrenetFrames(steps,true);
 const vertices=[],normals=[],indices=[];
 const p=new THREE.Vector3(),offset=new THREE.Vector3(),normal=new THREE.Vector3();
 for(let i=0;i<=steps;i++){
  path.getPoint(i/steps,p);
  const twist=i/steps*Math.PI*4;
  const n=frames.normals[i].clone().applyAxisAngle(frames.tangents[i],twist);
  const b=frames.binormals[i].clone().applyAxisAngle(frames.tangents[i],twist);
  for(let j=0;j<=sides;j++){
   const a=j/sides*Math.PI*2;
   offset.copy(n).multiplyScalar(Math.cos(a)*.55).addScaledVector(b,Math.sin(a)*.095);
   vertices.push(p.x+offset.x,p.y+offset.y,p.z+offset.z);
   normal.copy(n).multiplyScalar(Math.cos(a)/.55).addScaledVector(b,Math.sin(a)/.095).normalize();
   normals.push(normal.x,normal.y,normal.z);
   if(i<steps&&j<sides){const k=i*(sides+1)+j;indices.push(k,k+1,k+sides+1,k+1,k+sides+2,k+sides+1);}
  }
 }
 const geometry=new THREE.BufferGeometry();
 geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
 geometry.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));geometry.setIndex(indices);
 const material=new THREE.MeshPhysicalMaterial({color:0xbccbd4,metalness:1,roughness:.22,clearcoat:1,side:THREE.DoubleSide});
 object.add(new THREE.Mesh(geometry,material));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let raf=0,last=0,elapsed=0,visible=true,lost=false,x=0,y=0,targetX=0,targetY=0;
 function paused(){return reduced.matches||document.body.classList.contains('motion-paused');}
 function render(){if(!lost)renderer.render(scene,camera);}
 canvas.addEventListener('pointermove',e=>{
  if(e.pointerType==='touch'||paused())return;
  const r=canvas.getBoundingClientRect();
  targetY=((e.clientX-r.left)/r.width-.5)*.26;
  targetX=((e.clientY-r.top)/r.height-.5)*.20;
 },{passive:true});
 canvas.addEventListener('pointerleave',()=>{targetX=0;targetY=0;});
 function frame(now){
  raf=0;if(!visible||document.hidden||paused()||lost)return;
  const dt=Math.min((now-last)/1000,.05);last=now;elapsed+=dt;
  const ease=1-Math.exp(-4*dt);x+=(targetX-x)*ease;y+=(targetY-y)*ease;
  object.rotation.set(x+Math.sin(elapsed*.22)*.025,y,Math.sin(elapsed*.18)*.02);
  render();raf=requestAnimationFrame(frame);
 }
 function sync(){cancelAnimationFrame(raf);raf=0;host.dataset.motion='paused';render();if(visible&&!document.hidden&&!paused()&&!lost){last=performance.now();raf=requestAnimationFrame(frame);host.dataset.motion='running';}}
 new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync();},{threshold:.01}).observe(host);
 new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
 new ResizeObserver(()=>{
  const {width,height}=host.getBoundingClientRect();renderer.setSize(width,height,false);camera.aspect=width/height;
  // Fill a wide hero; mobile uses a rotated portrait framing, without shrinking to a tiny object.
  object.scale.setScalar(width<650?.68:1);
  const distance=width<650?15:Math.max(11.5,8.5/camera.aspect/Math.tan(THREE.MathUtils.degToRad(17)));
  camera.position.set(0,distance*.32,distance);camera.lookAt(0,0,0);camera.updateProjectionMatrix();render();
 }).observe(host);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;sync();});
 canvas.addEventListener('webglcontextrestored',()=>{lost=false;sync();});
 addEventListener('pagehide',()=>{cancelAnimationFrame(raf);raf=0;});addEventListener('pageshow',sync);
 host.dataset.state='ready';sync();
}
