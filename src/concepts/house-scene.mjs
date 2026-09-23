import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {homeModels,facades} from './model.mjs';

export function createHouseScene(host,initial){
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
  host.replaceChildren(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
  const scene=new THREE.Scene();renderer.setClearColor(0x000000,0);
  const camera=new THREE.OrthographicCamera(-10,10,7,-7,.1,100);camera.position.set(13,12,15);
  const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,1,0);controls.enableDamping=!matchMedia('(prefers-reduced-motion: reduce)').matches;controls.dampingFactor=.085;controls.enablePan=false;controls.minZoom=.7;controls.maxZoom=2.5;controls.minPolarAngle=.08;controls.maxPolarAngle=Math.PI*.47;controls.update();
  scene.add(new THREE.HemisphereLight(0xffffff,0x8e9188,2.2));
  const sun=new THREE.DirectionalLight(0xfff5da,4);sun.position.set(-7,15,9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-14,right:14,top:14,bottom:-14,near:.5,far:45});sun.shadow.normalBias=.035;sun.shadow.bias=-.0003;sun.shadow.radius=3;scene.add(sun);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(150,150),new THREE.ShadowMaterial({opacity:.12}));ground.rotation.x=-Math.PI/2;ground.position.y=-.45;ground.receiveShadow=true;scene.add(ground);
  let house,roof,state={...initial},visible=true,disposed=false,last=0,raf=0,dirty=true;
  controls.addEventListener('change',()=>{dirty=true;});
  const material=(color,roughness=.8,extra={})=>new THREE.MeshStandardMaterial({color,roughness,...extra});
  function rebuild(next){state={...state,...next};if(house){scene.remove(house);const geometries=new Set(),materials=new Set();house.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)materials.add(o.material);});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}
    house=new THREE.Group();scene.add(house);const w=homeModels[state.area].width,depth=6;
    const wood=material(facades[state.facade].color),slats=material(new THREE.Color(facades[state.facade].color).offsetHSL(0,0,.04)),woodLight=material(0xc2a585),frame=material(0x303a34),floor=material(0xcbb89b),linen=material(0xe4e0d3),leaf=material(0x526d4d),soil=material(0x8d9d78),stone=material(0xc9cfc2);
    function box(x,y,z,px,py,pz,mat,parent=house){const mesh=new THREE.Mesh(new THREE.BoxGeometry(x,y,z),mat);mesh.position.set(px,py,pz);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
    box(16,.36,11.5,0,-.25,0,stone);box(15.8,.08,11.3,0,-.03,0,soil);
    box(w+.25,.35,depth+.25,0,.3,0,frame);box(w,.1,depth,0,.525,0,floor);
    box(w,2.65,.16,0,1.88,-depth/2,wood);box(.14,2.65,depth,-w/2,1.88,0,wood);box(.14,2.65,depth,w/2,1.88,0,wood);
    // Vertical boards and a continuous dark lintel make the module's construction readable.
    for(let x=-w/2+.08;x<w/2;x+=.16){box(.022,2.66,.04,x,1.89,-3.09,slats);}
    for(const side of [-1,1])for(let z=-2.95;z<3;z+=.16){box(.04,2.66,.022,side*(w/2+.08),1.89,z,slats);}
    box(w+.3,.17,.15,0,3.3,-3.08,frame);box(w+.3,.17,.15,0,3.3,3.08,frame);
    box(.15,.17,6.3,-w/2-.08,3.3,0,frame);box(.15,.17,6.3,w/2+.08,3.3,0,frame);box(w,.12,.12,0,.61,3.03,frame);
    const glass=material(0xa5c4ba,.15,{transparent:true,opacity:.18,metalness:.2,side:THREE.DoubleSide,depthWrite:false});
    for(let x=-w/2;x<=w/2+.01;x+=w/4){box(.07,2.6,.1,x,1.94,3.02,frame);}
    for(let i=0;i<4;i++)box(w/4-.07,2.5,.025,-w/2+(i+.5)*w/4,1.93,3.025,glass);
    roof=new THREE.Group();house.add(roof);box(w+.34,.14,6.35,0,3.44,0,frame,roof);for(let z=-3;z<3;z+=.32)box(w+.1,.025,.028,0,3.52,z,frame,roof);
    const partitions=homeModels[state.area].bedrooms;
    const roomStart=0,roomWidth=w/2/partitions;
    for(let i=0;i<partitions;i++){const cx=roomStart+roomWidth*(i+.5);if(i>0)box(.1,2.6,4.4,roomStart+roomWidth*i,1.85,-.7,linen);box(Math.min(1.6,roomWidth-.25),.4,2.0,cx,.8,-1.3,woodLight);box(Math.min(1.52,roomWidth-.32),.22,1.95,cx,1.11,-1.3,linen);box(Math.min(1.35,roomWidth-.45),.13,.45,cx,1.29,-1.91,linen);box(roomWidth-.1,.08,.1,cx,1.25,-1,woodLight);}
    box(.11,2.6,4.5,0,1.85,-.68,linen);
    // Kitchen, sofa, dining table, bath partition, and floor lamp.
    box(w/2-.4,.85,.65,-w/4,1,-2.52,linen);box(w/2-.35,.07,.7,-w/4,1.48,-2.52,stone);
    box(1.8,.42,.85,-w/4,.82,1.13,linen);box(1.8,.48,.16,-w/4,1.18,.73,linen);for(const x of [-.82,.82])box(.16,.6,.85,-w/4+x,1.1,1.13,linen);
    const table=new THREE.Mesh(new THREE.CylinderGeometry(.52,.52,.075,32),woodLight);table.position.set(-w/4,.99,-.43);table.castShadow=true;house.add(table);box(.09,.4,.09,-w/4,.75,-.43,frame);
    for(const x of [-.73,.73]){box(.34,.07,.35,-w/4+x,.93,-.43,woodLight);box(.06,.45,.06,-w/4+x,.68,-.43,frame);}
    box(w/2,.1,.1,w/4,1,1,frame);box(w/2,1.85,.1,w/4,1.49,.92,linen);
    if(state.terrace){box(w+.4,.28,2.0,0,.21,4.1,woodLight);for(let x=-w/2-.1;x<w/2+.2;x+=.14)box(.017,.018,1.96,x,.36,4.1,wood);
      for(const x of [-w*.3,w*.3]){box(.65,.38,.7,x,.58,4.15,linen);box(.65,.6,.12,x,.81,3.9,linen);}
      const coffee=new THREE.Mesh(new THREE.CylinderGeometry(.38,.38,.08,24),wood);coffee.position.set(0,.7,4.25);coffee.castShadow=true;house.add(coffee);box(.07,.34,.07,0,.5,4.25,frame);
    }
    function tree(x,z,height){const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.06,.12,height*.8,8),woodLight);trunk.position.set(x,height*.4,z);trunk.castShadow=true;house.add(trunk);for(let j=0;j<6;j++){const radius=.9-j*.12;const mesh=new THREE.Mesh(new THREE.ConeGeometry(radius,height*.34,11),leaf);mesh.position.set(x,height*.35+j*height*.1,z);mesh.rotation.y=j*.75;mesh.castShadow=true;house.add(mesh);}}
    tree(-6.5,-4,4.4);tree(5.8,-4.2,4.9);tree(7,1.3,3.5);
    for(let i=0;i<14;i++){const x=Math.sin(i*2.4)*7.2,z=Math.cos(i*2.4)*5;if(Math.abs(x)<w/2+.5&&z>-3.6&&z<5.2)continue;const shrub=new THREE.Mesh(new THREE.IcosahedronGeometry(.28+(i%3)*.08,1),leaf);shrub.position.set(x,.22,z);shrub.scale.y=.8;shrub.castShadow=true;house.add(shrub);}
    for(let i=0;i<3;i++)box(.8,.045,.6,-6.3,.035,3+i*.83,stone);
    roof.visible=state.view==='exterior';renderer.render(scene,camera);
  }
  function resize(){const width=host.clientWidth,height=host.clientHeight;if(!width||!height)return;const aspect=width/height,viewHeight=Math.max(14,22/aspect);camera.left=-viewHeight*aspect/2;camera.right=viewHeight*aspect/2;camera.top=viewHeight/2;camera.bottom=-viewHeight/2;camera.updateProjectionMatrix();renderer.setSize(width,height,false);renderer.render(scene,camera);}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  const visibilityObserver=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!raf)raf=requestAnimationFrame(frame);},{rootMargin:'100px'});visibilityObserver.observe(host);
  function frame(time){raf=0;if(disposed||!visible||document.hidden)return;if(time-last>28){controls.update();if(dirty){renderer.render(scene,camera);dirty=false;}last=time;}raf=requestAnimationFrame(frame);}
  function visibility(){if(!document.hidden&&visible&&!raf)raf=requestAnimationFrame(frame);}
  document.addEventListener('visibilitychange',visibility);
  function rotate(direction){dirty=true;const offset=camera.position.clone().sub(controls.target),axis=new THREE.Vector3(0,1,0);offset.applyAxisAngle(axis,direction*.25);camera.position.copy(controls.target).add(offset);controls.update();}
  function zoom(direction){dirty=true;camera.zoom=THREE.MathUtils.clamp(camera.zoom+direction*.15,.7,2.5);camera.updateProjectionMatrix();controls.update();}
  function key(e){if(['ArrowLeft','ArrowRight','+','=','-','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();if(e.key==='ArrowLeft')rotate(-1);else if(e.key==='ArrowRight')rotate(1);else zoom(['+','=','ArrowUp'].includes(e.key)?1:-1);}}
  host.addEventListener('keydown',key);
  function setView(view){dirty=true;state.view=view;roof.visible=view==='exterior';if(view==='top'){camera.position.set(0,22,.01);controls.target.set(0,0,0);}else{camera.position.set(13,12,15);controls.target.set(0,1,0);}camera.zoom=1;camera.updateProjectionMatrix();controls.update();}
  rebuild(initial);resize();raf=requestAnimationFrame(frame);
  return {update:rebuild,rotate,zoom,setView,reset:()=>setView(state.view),dispose(){disposed=true;cancelAnimationFrame(raf);resizeObserver.disconnect();visibilityObserver.disconnect();document.removeEventListener('visibilitychange',visibility);host.removeEventListener('keydown',key);controls.dispose();scene.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});renderer.dispose();}};
}
