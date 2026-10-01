import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';

// A physical, three-layer interpretation of the studio mark. No remote scene.
const host=document.querySelector('.object-canvas');
if(host) mountObject(host);

function roundedRect(width,height,radius){
 const shape=new THREE.Shape(),x=-width/2,y=-height/2;
 shape.moveTo(x+radius,y);
 shape.lineTo(x+width-radius,y);
 shape.quadraticCurveTo(x+width,y,x+width,y+radius);
 shape.lineTo(x+width,y+height-radius);
 shape.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);
 shape.lineTo(x+radius,y+height);
 shape.quadraticCurveTo(x,y+height,x,y+height-radius);
 shape.lineTo(x,y+radius);
 shape.quadraticCurveTo(x,y,x+radius,y);
 return shape;
}

function mountObject(host){
 const stage=host.parentElement,reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let renderer;
 try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}
 catch{stage.dataset.objectState='fallback';return;}
 const mobile=matchMedia('(max-width:750px)').matches;
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,mobile?1.25:1.5));
 renderer.setClearColor(0x161719,0);
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.1;
 host.append(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(32,1,.1,40);
 camera.position.set(5.5,5.6,9.8);camera.lookAt(0,0,0);
 const room=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(renderer);
 const environment=pmrem.fromScene(room,.04);
 scene.environment=environment.texture;scene.environmentIntensity=1.35;
 room.dispose();pmrem.dispose();
 const light=new THREE.DirectionalLight(0xffffff,3);light.position.set(-4,8,4);scene.add(light);
 const fill=new THREE.DirectionalLight(0xd3dce7,1.5);fill.position.set(6,1,-4);scene.add(fill);
 const group=new THREE.Group();scene.add(group);group.rotation.set(-.12,-.18,-.08);group.scale.setScalar(1.35);
 const frameShape=roundedRect(4.45,3.28,.76);
 frameShape.holes.push(new THREE.Path(roundedRect(3.45,2.28,.4).getPoints(40).reverse()));
 const geometry=new THREE.ExtrudeGeometry(frameShape,{depth:.18,steps:1,bevelEnabled:true,bevelSegments:5,bevelSize:.085,bevelThickness:.085,curveSegments:32});
 geometry.center();geometry.rotateX(-Math.PI/2);
 const silver=new THREE.MeshPhysicalMaterial({color:0xc8ccce,metalness:1,roughness:.18,clearcoat:.5,clearcoatRoughness:.22});
 const satin=new THREE.MeshPhysicalMaterial({color:0x888d91,metalness:.95,roughness:.3});
 const copper=new THREE.MeshPhysicalMaterial({color:0xc8987c,metalness:.9,roughness:.24});
 const materials=[silver,copper,satin],layers=[];
 for(let i=0;i<3;i++){
  const layer=new THREE.Mesh(geometry,materials[i]);layer.position.y=(1-i)*.82;
  layer.rotation.y=(i-1)*.045;group.add(layer);layers.push(layer);
 }
 // Slim connecting pins make the stack read as an assembled object.
 const pins=new THREE.Group(),pinGeo=new THREE.CylinderGeometry(.04,.04,2.0,14);
 for(const [x,z] of [[-1.93,-.85],[1.93,.85]]){
  const pin=new THREE.Mesh(pinGeo,satin);pin.position.set(x,0,z);pins.add(pin);
 }
 group.add(pins);
 let active=false,frame=0,last=0,time=0,entrance=reduced.matches?1:0,hover=0,hoverTarget=0;
 const target=new THREE.Vector2(),pointer=new THREE.Vector2();
 function resize(){
  const {width,height}=host.getBoundingClientRect();
  if(!width||!height)return;
  renderer.setSize(width,height,false);camera.aspect=width/height;
  camera.fov=width<420?39:32;camera.updateProjectionMatrix();draw();
 }
 function draw(){renderer.render(scene,camera);}
 function pose(dt){
  const settle=1-Math.exp(-dt*4.5);
  pointer.lerp(target,settle);hover+=(hoverTarget-hover)*settle;
  entrance=Math.min(1,entrance+dt/.95);
  const arrival=1-Math.pow(1-entrance,4),drift=reduced.matches?0:Math.sin(time*.26)*.035;
  group.rotation.y=-.18+pointer.x*.17+drift;
  group.rotation.x=-.12+pointer.y*.09;
  group.position.y=reduced.matches?0:Math.sin(time*.55)*.025;
  for(let i=0;i<layers.length;i++){
   layers[i].position.y=(1-i)*(.82+hover*.28)+(1-arrival)*(i-1)*.7;
   layers[i].rotation.y=(i-1)*(.045+hover*.06);
  }
  pins.scale.y=1+hover*.27;
 }
 function tick(now){
  frame=0;if(!active||document.hidden||reduced.matches)return;
  const dt=Math.min((now-last)/1000||1/60,.04);last=now;time+=dt;pose(dt);draw();
  frame=requestAnimationFrame(tick);
 }
 function sync(){
  cancelAnimationFrame(frame);frame=0;
  if(reduced.matches){entrance=1;pointer.set(0,0);target.set(0,0);hover=0;hoverTarget=0;pose(0);draw();}
  else if(active&&!document.hidden){last=performance.now();frame=requestAnimationFrame(tick);}
 }
 stage.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch'||reduced.matches)return;
  hoverTarget=1;
  const box=stage.getBoundingClientRect();
  target.set((event.clientX-box.left)/box.width*2-1,(event.clientY-box.top)/box.height*2-1);
 },{passive:true});
 stage.addEventListener('pointerleave',()=>{target.set(0,0);hoverTarget=0;});
 document.addEventListener('visibilitychange',sync);
 reduced.addEventListener('change',sync);
 const observer=new IntersectionObserver(entries=>{active=entries[0].isIntersecting;sync();},{threshold:.01});
 observer.observe(stage);
 const sizes=new ResizeObserver(resize);sizes.observe(host);
 renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();active=false;sync();stage.dataset.objectState='fallback';});
 resize();pose(reduced.matches?0:1/60);draw();stage.dataset.objectState='ready';
 addEventListener('pagehide',event=>{
  if(event.persisted)return;
  cancelAnimationFrame(frame);observer.disconnect();sizes.disconnect();
  geometry.dispose();pinGeo.dispose();materials.forEach(m=>m.dispose());environment.dispose();renderer.dispose();
 });
}
