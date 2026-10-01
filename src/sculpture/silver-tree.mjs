import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// An authored, volumetric tree: tapered branches and curved individual leaves.
export function createSilverTree({scene,rand,heightAt,mobile}){
 const tree=new THREE.Group();
 scene.add(tree);
 const branches=[],tips=[];
 function branch(points,radius){
  const curve=new THREE.CatmullRomCurve3(points);
  const geometry=new THREE.TubeGeometry(curve,20,radius,8,false),positions=geometry.attributes.position;
  for(let ring=0;ring<=20;ring++){
   const t=ring/20,center=curve.getPoint(t),taper=1-t*.87;
   for(let side=0;side<=8;side++){
    const index=ring*9+side;
    positions.setXYZ(index,center.x+(positions.getX(index)-center.x)*taper,center.y+(positions.getY(index)-center.y)*taper,center.z+(positions.getZ(index)-center.z)*taper);
   }
  }
  geometry.computeVertexNormals();branches.push(geometry);return curve;
 }
 const trunk=branch([new THREE.Vector3(0,0,0),new THREE.Vector3(-.22,1.7,.05),new THREE.Vector3(.12,3.7,-.2),new THREE.Vector3(-.35,6.1,.05)],.27);
 // Uneven levels and forked tips keep the crown open and asymmetric.
 for(let i=0;i<13;i++){
  const t=.31+i*.046,root=trunk.getPoint(t),angle=i*2.399+.2;
  const reach=1.6+Math.sin(i/13*Math.PI)*1.15;
  const end=new THREE.Vector3(Math.cos(angle)*reach,4.35+Math.cos(angle)*.45+rand()*1.35,Math.sin(angle)*reach*.95);
  const mid=root.clone().lerp(end,.58);mid.y-=.28;
  branch([root,mid,end],.065+(1-t)*.06);
  for(let fork=0;fork<3;fork++){
   const tip=end.clone().add(new THREE.Vector3((rand()-.5)*1.25,.2+rand()*.55,(rand()-.5)*1));
   branch([mid.clone().lerp(end,.7),end,tip],.026);tips.push(tip);
  }
 }
 const wood=new THREE.MeshStandardMaterial({color:0xb4beb3,metalness:.42,roughness:.5});
 const merged=mergeGeometries(branches),trunkMesh=new THREE.Mesh(merged,wood);
 branches.forEach(g=>g.dispose());trunkMesh.castShadow=trunkMesh.receiveShadow=true;tree.add(trunkMesh);
 const vertices=[],uv=[],indices=[];
 for(let row=0;row<=6;row++){
  const t=row/6,w=Math.pow(Math.sin(t*Math.PI),.85)*.115;
  vertices.push(-w,t*.43,Math.sin(t*Math.PI)*.015,0,t*.43,Math.sin(t*Math.PI)*.07,w,t*.43,Math.sin(t*Math.PI)*.015);
  uv.push(0,t,.5,t,1,t);
  if(row<6){const a=row*3;indices.push(a,a+1,a+3,a+1,a+4,a+3,a+1,a+2,a+4,a+2,a+5,a+4);}
 }
 const leafGeometry=new THREE.BufferGeometry();leafGeometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));leafGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));leafGeometry.setIndex(indices);leafGeometry.computeVertexNormals();
 const wind={value:0},leafBloom={value:1},leafTouch={value:new THREE.Vector3(1000,1000,1000)},leafPower={value:0};
 const pointerTarget=new THREE.Vector3(1000,1000,1000);let pointerActive=false,motionEnabled=true,growth=1;
 const material=new THREE.MeshStandardMaterial({color:0xa8b9a0,metalness:.24,roughness:.58,side:THREE.DoubleSide});
 material.onBeforeCompile=shader=>{
  Object.assign(shader.uniforms,{uTreeTime:wind,uLeafBloom:leafBloom,uLeafTouch:leafTouch,uLeafPower:leafPower});
  shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nuniform float uTreeTime; uniform float uLeafBloom; uniform vec3 uLeafTouch; uniform float uLeafPower;').replace('#include <begin_vertex>',`#include <begin_vertex>
   transformed*=uLeafBloom;
   vec3 root=(modelMatrix*instanceMatrix*vec4(0.,0.,0.,1.)).xyz;
   vec3 delta=root-uLeafTouch;float dist=length(delta);
   float push=exp(-dist*dist/3.5)*uLeafPower*.36;
   vec3 direction=delta/max(dist,.01);
   vec3 axisX=normalize((modelMatrix*vec4(instanceMatrix[0].xyz,0.)).xyz);
   vec3 axisY=normalize((modelMatrix*vec4(instanceMatrix[1].xyz,0.)).xyz);
   vec3 axisZ=normalize((modelMatrix*vec4(instanceMatrix[2].xyz,0.)).xyz);
   transformed+=vec3(dot(direction,axisX),dot(direction,axisY),dot(direction,axisZ))*push;
   transformed.z+=sin(uTreeTime*7.+root.x*3.+root.y)*push*.25*uv.y;
   transformed.z+=sin(uTreeTime*1.15+instanceMatrix[3].x*2.1+instanceMatrix[3].y)*.045*uv.y*uv.y;`);
 };
 const count=mobile?1400:3000,leaves=new THREE.InstancedMesh(leafGeometry,material,count);
 const dummy=new THREE.Object3D(),origins=[],framePoints=[new THREE.Vector3()];
 for(let i=0;i<count;i++){
  const tip=tips[i%tips.length],r=Math.cbrt(rand()),a=rand()*Math.PI*2,z=rand()*2-1;
  const spherical=Math.sqrt(1-z*z)*r;
  if(i%5<3)dummy.position.copy(tip).add(new THREE.Vector3(Math.cos(a)*spherical*.8,z*r*.85,Math.sin(a)*spherical*.9));
  else dummy.position.set(Math.cos(a)*spherical*2.65,5.35+z*r*1.55,Math.sin(a)*spherical*2.25);
  dummy.rotation.set(rand()*Math.PI,rand()*Math.PI*2,(rand()-.5)*2.1);
  dummy.scale.setScalar(.65+rand()*.65);dummy.updateMatrix();leaves.setMatrixAt(i,dummy.matrix);
  // Sample real leaf outlines for framing, rather than oversized box corners.
  if(i%4===0)for(const point of [[0,0,0],[0,.43,0],[-.115,.215,.07],[.115,.215,.07]])framePoints.push(new THREE.Vector3(...point).applyMatrix4(dummy.matrix));
  leaves.setColorAt(i,new THREE.Color().setScalar(.65+rand()*.35));
  if(i%83===0)origins.push(dummy.position.clone());
 }
 leaves.frustumCulled=false;leaves.castShadow=leaves.receiveShadow=true;leaves.instanceMatrix.needsUpdate=true;leaves.instanceColor.needsUpdate=true;tree.add(leaves);
 const fallingCount=mobile?7:12,falling=new THREE.InstancedMesh(leafGeometry,material,fallingCount);
 falling.frustumCulled=false;falling.instanceMatrix.setUsage(THREE.DynamicDrawUsage);tree.add(falling);
 const falls=Array.from({length:fallingCount},(_,i)=>({origin:origins[i%origins.length],phase:i*36/fallingCount,spin:rand()*Math.PI*2,drift:(rand()-.5)*.7}));
 function update(time,dt=.016){
  wind.value=time;tree.rotation.z=Math.sin(time*.31)*.004;
  const blend=1-Math.exp(-dt*9);leafTouch.value.lerp(pointerTarget,blend);leafPower.value+=(Number(pointerActive&&motionEnabled)-leafPower.value)*blend;
  falls.forEach((leaf,i)=>{
   const age=(time+leaf.phase)%36;
   if(age<10){
    const drift=Math.sin(age*.75+leaf.spin)*.35;
    dummy.position.set(leaf.origin.x+drift+age*leaf.drift*.1,leaf.origin.y-age*.57,leaf.origin.z+Math.cos(age*.48+leaf.spin)*.27);
    dummy.rotation.set(leaf.spin+age*.65,leaf.spin+age*.4,Math.sin(age*.8+leaf.spin)*.6);
    dummy.scale.setScalar(Math.max(0,Math.min(1,age*1.8,(10-age)*1.5))*.85);
   }else dummy.scale.setScalar(0);
   dummy.updateMatrix();falling.setMatrixAt(i,dummy.matrix);
  });
  falling.instanceMatrix.needsUpdate=true;
 }
 update(0);
 function setGrowth(value){growth=value;leafBloom.value=THREE.MathUtils.smoothstep(value,.35,.95);leaves.visible=value>.1;falling.visible=motionEnabled&&value>.99;}
 return {update,setGrowth,setPointer:(point,active)=>{if(point)pointerTarget.copy(point);pointerActive=active;},setMotion:enabled=>{motionEnabled=enabled;falling.visible=enabled&&growth>.99;if(!enabled)leafPower.value=0;},tree,framePoints};
}
