import * as THREE from 'three';

const stage = document.querySelector('.lunar-stage');
if (stage) {
 const host = stage.querySelector('.lunar-canvas');
 let renderer;
 try { renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'}); }
 catch { stage.querySelector('.lunar-hint').textContent='Ваш браузер не поддерживает WebGL.'; }
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
 renderer.shadowMap.type=THREE.PCFShadowMap;
 host.append(renderer.domElement);
 const scene=new THREE.Scene();
 scene.fog=new THREE.FogExp2(0x141414,.032);
 const camera=new THREE.PerspectiveCamera(34,1,.1,100);
 const aim=new THREE.Vector3(0,.5,0);
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
 const groundMat=new THREE.MeshStandardMaterial({color:0x373c40,roughness:1,bumpMap:bump,bumpScale:.1});
 const groundGeo=new THREE.PlaneGeometry(38,22,110,65);groundGeo.rotateX(-Math.PI/2);
 const gp=groundGeo.attributes.position;
 for(let i=0;i<gp.count;i++)gp.setY(i,heightAt(gp.getX(i),gp.getZ(i)));
 groundGeo.computeVertexNormals();
 const ground=new THREE.Mesh(groundGeo,groundMat);ground.receiveShadow=true;scene.add(ground);
 const rocks=[[-5.5,-1.5,2.1,1.3,1.5],[-3.4,-2,1.3,.75,1.1],[5,-2,1.8,2.8,1.45],[7.1,-1,1.1,1.75,1.1],[3.4,-.4,1.2,.8,1.15],[-8,3,.7,.4,.8]];
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
 const grassMat=new THREE.MeshStandardMaterial({color:0xb3b8bd,roughness:.75,metalness:.08,side:THREE.DoubleSide});
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
 const count=mobile?14000:34000,grass=new THREE.InstancedMesh(blade,grassMat,count);
 let placed=0,attempts=0;
 while(placed<count && attempts<count*8){
  attempts++;const x=(rand()-.5)*32,z=(rand()-.5)*17;
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
 const pointer=new THREE.Vector2(),raycaster=new THREE.Raycaster();
 const target=new THREE.Vector3(1000,0,1000),touch=uniforms.uTouch.value;
 const plane=new THREE.Plane(new THREE.Vector3(0,1,0),0);
 const hit=new THREE.Vector3(),away=new THREE.Vector3(1000,0,1000);let active=false,visible=false,frame=0,last=0,time=0;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=document.body.classList.contains('motion-paused')||reduced.matches;
 function resize(){
  const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;
  camera.position.set(0,w<600?9.5:5.6,w<600?23:17);camera.lookAt(aim);camera.updateProjectionMatrix();render();
 }
 function render(){renderer.render(scene,camera);}
 function tick(now){
  frame=0;if(!visible||paused||document.hidden)return;
  const dt=Math.min((now-last)/1000||.016,.05);last=now;time+=dt;
  uniforms.uTime.value=time;
  if(active)touch.lerp(target,1-Math.exp(-dt*9));else touch.lerp(away,1-Math.exp(-dt*2));
  render();frame=requestAnimationFrame(tick);
 }
 function wake(){if(!frame&&visible&&!paused&&!document.hidden){last=performance.now();frame=requestAnimationFrame(tick);}}
 function sync(){cancelAnimationFrame(frame);frame=0;render();wake();}
 stage.addEventListener('pointermove',e=>{
  if(e.pointerType==='touch')return;
  const r=host.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);
  raycaster.setFromCamera(pointer,camera);
  if(raycaster.ray.intersectPlane(plane,hit)){target.copy(hit);active=true;}
 },{passive:true});
 stage.addEventListener('pointerleave',()=>{active=false;});
 document.addEventListener('lancer:motion',({detail})=>{paused=detail.paused;sync();});
 document.addEventListener('visibilitychange',sync);
 new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync();},{rootMargin:'80px'}).observe(stage);
 new ResizeObserver(resize).observe(host);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frame);frame=0;stage.querySelector('.lunar-hint').textContent='Графическая сцена приостановлена. Обновите страницу.';});
 stage.dataset.sceneReady='true';
 resize();
}
