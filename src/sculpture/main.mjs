import * as THREE from 'three';
import {createSilverTree} from './silver-tree.mjs';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {radialReveal} from './garden-reveal.mjs';

const stage = document.querySelector('.lunar-stage');
if (stage) {
 const host = stage.querySelector('.lunar-canvas');
 let renderer;
 try { renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'}); }
 catch { stage.dataset.sceneReady='failed';stage.querySelector('.lunar-status').textContent='Ваш браузер не поддерживает WebGL.'; }
 if(renderer) createGarden(renderer,host,stage);
}

function createGarden(renderer,host,stage){
 const mobile=matchMedia('(max-width:700px)').matches;
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,mobile?1.2:1.5));
 renderer.setClearColor(0x141414,0);
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.15;
 renderer.shadowMap.enabled=true;
 renderer.shadowMap.autoUpdate=false;
 renderer.shadowMap.type=THREE.PCFShadowMap;
 host.append(renderer.domElement);
 const scene=new THREE.Scene();
 const studio=new RoomEnvironment(),environment=new THREE.PMREMGenerator(renderer);
 scene.environment=environment.fromScene(studio,.04).texture;scene.environmentIntensity=.6;
 studio.dispose();environment.dispose();
 scene.fog=new THREE.FogExp2(0x141414,.032);
 const camera=new THREE.PerspectiveCamera(34,1,.1,100);
 const aim=new THREE.Vector3(0,2.8,0);
 camera.position.set(0,5.6,17);camera.lookAt(aim);
 const hemi=new THREE.HemisphereLight(0xe3ebf4,0x161819,1.7);scene.add(hemi);
 const sun=new THREE.DirectionalLight(0xf1f4f9,4.3);sun.position.set(-7,10,2);sun.castShadow=true;
 sun.shadow.mapSize.set(mobile?512:1024,mobile?512:1024);
 Object.assign(sun.shadow.camera,{left:-17,right:17,top:11,bottom:-11,near:.5,far:40});
 sun.shadow.bias=-.0003;sun.shadow.normalBias=.025;scene.add(sun);
 const rim=new THREE.DirectionalLight(0x9daec2,2.5);rim.position.set(8,3,-7);scene.add(rim);
 let seed=4107;
 const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const heightAt=(x,z)=>-.3+.3*Math.sin(x*.27+z*.32)+.24*Math.cos(z*.54-x*.12)+.7*Math.exp(-((x-5)**2+(z+1)**2)/25);
 const noiseTexture=document.createElement('canvas');noiseTexture.width=noiseTexture.height=256;
 const nc=noiseTexture.getContext('2d'), pixels=nc.createImageData(256,256);
 const hash=(x,y)=>{const v=Math.sin(x*127.1+y*311.7)*43758.5453;return v-Math.floor(v);};
 const noise=(x,y)=>{const ix=Math.floor(x),iy=Math.floor(y);let fx=x-ix,fy=y-iy;fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);const a=hash(ix,iy),b=hash(ix+1,iy),c=hash(ix,iy+1),d=hash(ix+1,iy+1);return a+(b-a)*fx+(c-a)*fy+(a-b-c+d)*fx*fy;};
 for(let i=0;i<pixels.data.length;i+=4){
  const x=(i/4)%256,y=Math.floor(i/1024);
  const v=65+noise(x*.06,y*.06)*65+noise(x*.22,y*.22)*50+noise(x*.7,y*.7)*40+rand()*30;
  pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=v;pixels.data[i+3]=255;
 }
 nc.putImageData(pixels,0,0);
 const bump=new THREE.CanvasTexture(noiseTexture);bump.wrapS=bump.wrapT=THREE.RepeatWrapping;bump.repeat.set(5,5);
 const stoneMap=new THREE.CanvasTexture(noiseTexture);stoneMap.colorSpace=THREE.SRGBColorSpace;stoneMap.wrapS=stoneMap.wrapT=THREE.RepeatWrapping;stoneMap.repeat.set(2,2);
 const stoneMat=new THREE.MeshStandardMaterial({color:0xc0c2c5,map:stoneMap,roughness:.95,bumpMap:bump,bumpScale:.26});
 const groundMat=new THREE.MeshStandardMaterial({color:0x394139,roughness:1,bumpMap:bump,bumpScale:.1});
 const groundGeo=new THREE.PlaneGeometry(68,44,110,65);groundGeo.rotateX(-Math.PI/2);
 const gp=groundGeo.attributes.position;
 for(let i=0;i<gp.count;i++)gp.setY(i,heightAt(gp.getX(i),gp.getZ(i)));
 groundGeo.computeVertexNormals();
 const ground=new THREE.Mesh(groundGeo,groundMat);ground.receiveShadow=true;scene.add(ground);
 const rocks=[[-5.5,-1.5,2.1,1.3,1.5],[-3.4,-2,1.3,.75,1.1],[6,-1,1.4,1.1,1.2],[3.4,-.4,1.2,.8,1.15],[-8,3,.7,.4,.8]];
 function rockGeometry(){
  const g=new THREE.SphereGeometry(1,48,32),p=g.attributes.position;
  const offset=rand()*12;
  for(let i=0;i<p.count;i++){
   const x=p.getX(i),y=p.getY(i),z=p.getZ(i);
   const n=1+.16*Math.sin(x*4.1+offset)*Math.cos(z*3.7)+.09*Math.sin(y*8.3+z*4.2)+.035*Math.sin(x*17+z*12+y*11);
   p.setXYZ(i,x*n,y*n,z*n);
  }
  g.computeVertexNormals();return g;
 }
 for(const [x,z,sx,sy,sz] of rocks){
  const mesh=new THREE.Mesh(rockGeometry(),stoneMat);mesh.scale.set(sx,sy,sz);mesh.rotation.set(.08,rand()*2,.18*(rand()-.5));mesh.position.set(x,heightAt(x,z)+sy*.64,z);mesh.castShadow=mesh.receiveShadow=true;scene.add(mesh);
 }
 const pebbleGeo=new THREE.IcosahedronGeometry(1,1);
 const pebbles=new THREE.InstancedMesh(pebbleGeo,stoneMat,170);
 const dummy=new THREE.Object3D();
 for(let i=0;i<170;i++){const x=(rand()-.5)*31,z=(rand()-.5)*16,s=.04+rand()*.15;dummy.position.set(x,heightAt(x,z)+s*.3,z);dummy.rotation.set(rand(),rand()*6,rand());dummy.scale.set(s,s*.6,s);dummy.updateMatrix();pebbles.setMatrixAt(i,dummy.matrix);}
 pebbles.receiveShadow=true;scene.add(pebbles);

 // Curved tapering blades, instanced once and bent on the GPU at their roots.
 const positions=[],uvs=[],indices=[];
 for(let row=0;row<=7;row++){
  const t=row/7,w=.045*(1-t)+.001;
  positions.push(-w,t,Math.pow(t,2)*.13,w,t,Math.pow(t,2)*.13);
  uvs.push(0,t,1,t);
  if(row<7){const a=row*2;indices.push(a,a+1,a+2,a+1,a+3,a+2);}
 }
 const blade=new THREE.BufferGeometry();blade.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));blade.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));blade.setIndex(indices);blade.computeVertexNormals();
 const uniforms={uTime:{value:0},uTouch:{value:new THREE.Vector3(1000,0,1000)},uMotion:{value:1}};
 const grassMat=new THREE.MeshStandardMaterial({color:0x9eae97,roughness:.82,metalness:.05,side:THREE.DoubleSide});
 grassMat.onBeforeCompile=shader=>{
  Object.assign(shader.uniforms,uniforms);
  shader.vertexShader=shader.vertexShader.replace('#include <common>',`#include <common>
   uniform float uTime; uniform vec3 uTouch; uniform float uMotion; varying float vBladeHeight;`)
   .replace('#include <begin_vertex>',`#include <begin_vertex>
    vBladeHeight=uv.y;
    vec3 root=(modelMatrix*instanceMatrix*vec4(0.,0.,0.,1.)).xyz;
    float wind=sin(uTime*.72+root.x*.52+root.z*.63)*.11+sin(uTime*1.08-root.z*.48)*.055;
    vec2 delta=root.xz-uTouch.xz;float dist=length(delta);
    float push=exp(-dist*dist/2.4)*.85*uMotion;
    vec2 direction=delta/max(dist,.01);
    vec2 localPush=vec2(dot(direction,instanceMatrix[0].xz),dot(direction,instanceMatrix[2].xz));
    transformed.x+=(wind*uMotion+localPush.x*push)*uv.y*uv.y;
    transformed.z+=(wind*.55*uMotion+localPush.y*push)*uv.y*uv.y;
    transformed.y-=push*.3*uv.y*uv.y;`);
  shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying float vBladeHeight;').replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb*=mix(.38,1.18,vBladeHeight);');
 };
 const count=mobile?9500:26000,grass=new THREE.InstancedMesh(blade,grassMat,count);
 let placed=0,attempts=0;
 while(placed<count && attempts<count*8){
  attempts++;const x=(rand()-.5)*48,z=(rand()-.5)*24;
  if(rocks.some(([rx,rz,sx,,sz])=>((x-rx)/sx)**2+((z-rz)/sz)**2<.9))continue;
  const path=Math.sin(z*.3)*1.8;
  if(Math.abs(x-path)<.75 && rand()<.9)continue;
  const patch=.5+.3*Math.sin(x*.68+z*.44)*Math.sin(z*.95);
  if(rand()>patch+.18)continue;
  const len=.35+rand()*.58;
  dummy.position.set(x,heightAt(x,z)-.04,z);dummy.rotation.set((rand()-.5)*.18,rand()*Math.PI*2,(rand()-.5)*.18);dummy.scale.set(.55+rand()*.65,len,.55+rand()*.6);dummy.updateMatrix();grass.setMatrixAt(placed,dummy.matrix);
  grass.setColorAt(placed,new THREE.Color().setScalar(.6+rand()*.4));placed++;
 }
 grass.count=placed;grass.instanceMatrix.needsUpdate=true;grass.instanceColor.needsUpdate=true;grass.receiveShadow=true;grass.frustumCulled=false;scene.add(grass);
 const reveal={radius:{value:-4},origin:{value:new THREE.Vector2(-14,10)}};
 [groundMat,stoneMat,grassMat].forEach(material=>radialReveal(material,reveal));
 const silverTree=createSilverTree({scene,rand,heightAt,mobile});
 const pointer=new THREE.Vector2(),raycaster=new THREE.Raycaster();
 const target=new THREE.Vector3(1000,0,1000),touch=uniforms.uTouch.value;
 const plane=new THREE.Plane(new THREE.Vector3(0,1,0),0);
 const hit=new THREE.Vector3(),away=new THREE.Vector3(1000,0,1000);let active=false,visible=false,frame=0,last=0,time=0;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=document.body.classList.contains('motion-paused')||reduced.matches;
 let introTime=0,baseScale=1,growth=paused?1:0,lastShadowGrowth=-1;
 const canopyPlane=new THREE.Plane(),canopyHit=new THREE.Vector3(),canopyCenter=new THREE.Vector3(),cameraDirection=new THREE.Vector3(),localHit=new THREE.Vector3();
 function intro(){
  if(paused){growth=1;reveal.radius.value=90;introTime=3;}
  else{const p=Math.min(1,introTime/2.8);reveal.radius.value=-4+94*(1-(1-p)**3);const g=Math.max(0,Math.min(1,(introTime-.65)/2.2));growth=1-(1-g)**3;}
  silverTree.tree.scale.setScalar(baseScale*Math.max(.001,growth));silverTree.setGrowth(growth);
  const state=growth>=1?'complete':'running';if(stage.dataset.intro!==state)stage.dataset.intro=state;
  if(Math.abs(growth-lastShadowGrowth)>.08||growth===1&&lastShadowGrowth!==1){renderer.shadowMap.needsUpdate=true;lastShadowGrowth=growth;}
 }
 function resize(){
  const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;
  const compact=w<900;
  // Keep the entire crown in frame, with the tree in front of the rocks.
  silverTree.tree.scale.setScalar(compact ? 1.05 : Math.min(1.55,1.3+(w-1000)/1600));
  silverTree.tree.position.x=compact?1.3:6+(w-1265)*.005;
  silverTree.tree.position.z=3.3;
  silverTree.tree.position.y=heightAt(silverTree.tree.position.x,3.3);
  aim.y=compact?2.8:4.3;
  camera.position.set(0,compact?10.5:8.6,compact?27:28);camera.lookAt(aim);camera.updateProjectionMatrix();
  const screen=new THREE.Vector3(),targetTop=compact?h*.18:Math.max(22,document.querySelector('.particle-heading h1').getBoundingClientRect().top-host.getBoundingClientRect().top+8);
  function projectedFrame(){
   silverTree.tree.updateMatrixWorld(true);camera.updateMatrixWorld();
   let left=Infinity,right=-Infinity,top=Infinity;
   for(const point of silverTree.framePoints){screen.copy(point).applyMatrix4(silverTree.tree.matrixWorld).project(camera);left=Math.min(left,(1+screen.x)*w/2);right=Math.max(right,(1+screen.x)*w/2);top=Math.min(top,(1-screen.y)*h/2);}
   return {left,right,top};
  }
  for(let i=0;i<4;i++){
   const frame=projectedFrame(),span=2*camera.position.distanceTo(silverTree.tree.position)*Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
   silverTree.tree.scale.multiplyScalar(Math.min(1,w*(compact ? .8 : .4)/(frame.right-frame.left)));
   silverTree.tree.position.x+=(w*(compact ? .53 : .765)-(frame.left+frame.right)/2)*span*camera.aspect/w;
   silverTree.tree.position.y=heightAt(silverTree.tree.position.x,3.3);
   aim.y+=(targetTop-frame.top)*span/h;camera.lookAt(aim);
  }
  baseScale=silverTree.tree.scale.x;
  raycaster.setFromCamera(new THREE.Vector2(-.84,-.68),camera);
  if(raycaster.ray.intersectPlane(plane,hit))reveal.origin.value.set(hit.x,hit.z);
  if(/^(localhost|127\.0\.0\.1)$/.test(location.hostname)){const frame=projectedFrame();stage.dataset.treeFrame=JSON.stringify({...frame,top:Math.round(host.getBoundingClientRect().top+scrollY+frame.top),scale:silverTree.tree.scale.x});}
  intro();renderer.shadowMap.needsUpdate=true;render();
 }
 function render(){renderer.render(scene,camera);}
 function tick(now){
  frame=0;if(!visible||paused||document.hidden)return;
  if(now-last<(mobile?1000/30:1000/60)-1){frame=requestAnimationFrame(tick);return;}
   const dt=Math.min((now-last)/1000||.016,.05);last=now;time+=dt;
  if(introTime<3){introTime+=dt;intro();}
   uniforms.uTime.value=time;
  silverTree.update(time,dt);
  if(active)touch.lerp(target,1-Math.exp(-dt*9));else touch.lerp(away,1-Math.exp(-dt*2));
  render();frame=requestAnimationFrame(tick);
 }
 function wake(){if(!frame&&visible&&!paused&&!document.hidden){last=performance.now();frame=requestAnimationFrame(tick);}}
 function sync(){cancelAnimationFrame(frame);frame=0;silverTree.setMotion(!paused);if(paused)intro();render();wake();}
 stage.addEventListener('pointermove',e=>{
  if(e.pointerType==='touch')return;
  const r=host.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);
  raycaster.setFromCamera(pointer,camera);
  if(raycaster.ray.intersectPlane(plane,hit)){target.copy(hit);active=true;}
  silverTree.tree.updateMatrixWorld(true);canopyCenter.set(0,5.3,0).applyMatrix4(silverTree.tree.matrixWorld);
  canopyPlane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(cameraDirection),canopyCenter);
  let overLeaves=false;
  if(growth>.95&&raycaster.ray.intersectPlane(canopyPlane,canopyHit)){
   localHit.copy(canopyHit);silverTree.tree.worldToLocal(localHit);
   overLeaves=(localHit.x/3.8)**2+((localHit.y-5.3)/2.25)**2+(localHit.z/3.4)**2<1.5;
  }
  silverTree.setPointer(canopyHit,overLeaves);
  if(/^(localhost|127\.0\.0\.1)$/.test(location.hostname))stage.dataset.leafInteraction=overLeaves?'active':'idle';
 },{passive:true});
 stage.addEventListener('pointerleave',()=>{active=false;silverTree.setPointer(null,false);stage.dataset.leafInteraction='idle';});
 document.addEventListener('lancer:motion',({detail})=>{paused=detail.paused;sync();});
 document.addEventListener('visibilitychange',sync);
 new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync();},{rootMargin:'80px'}).observe(stage);
 new ResizeObserver(resize).observe(host);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frame);frame=0;stage.querySelector('.lunar-status').textContent='Графическая сцена приостановлена. Обновите страницу.';});
 resize();
 stage.dataset.sceneReady='true';
}
