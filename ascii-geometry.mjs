// An original Möbius ribbon. The same character frame supplies HTML and canvas.
export const ASCII_COLUMNS=92;
export const ASCII_ROWS=44;
export const ASCII_WIDTH=644;
export const ASCII_HEIGHT=396;
export const ASCII_COLORS=['#627744','#93b954','#bded52','#e1f4bd'];
const ramp=' .:-=+*#%@';
function point(u,v){
 const radius=1.43+v*Math.cos(u/2);
 return [radius*Math.cos(u),radius*Math.sin(u),v*Math.sin(u/2)];
}
const mesh=[];
for(let i=0;i<420;i++)for(let j=0;j<25;j++){
 const u=i/420*Math.PI*2,v=(j/24-.5)*1.05;
 const p=point(u,v),a=point(u+.002,v),b=point(u,v+.002);
 const du=a.map((n,k)=>n-p[k]),dv=b.map((n,k)=>n-p[k]);
 const normal=[du[1]*dv[2]-du[2]*dv[1],du[2]*dv[0]-du[0]*dv[2],du[0]*dv[1]-du[1]*dv[0]];
 const length=Math.hypot(...normal);
 mesh.push({p,n:normal.map(n=>n/length),edge:Math.abs(v)/.525});
}
export function ribbonFrame(phase=0,pointerX=0,pointerY=0){
 const ax=.92+Math.sin(phase*.43)*.12+pointerY*.12;
 const ay=-.3+Math.sin(phase*.31)*.24+pointerX*.18;
 const az=-.42+Math.sin(phase*.24)*.08;
 const sx=Math.sin(ax),cx=Math.cos(ax),sy=Math.sin(ay),cy=Math.cos(ay),sz=Math.sin(az),cz=Math.cos(az);
 const matrix=[cz*cy,cz*sy*sx-sz*cx,cz*sy*cx+sz*sx,sz*cy,sz*sy*sx+cz*cx,sz*sy*cx-cz*sx,-sy,cy*sx,cy*cx];
 const lightVector=[0,1,2].map(i=>-.35*matrix[i]-.48*matrix[i+3]+.8*matrix[i+6]);
 const depths=new Float32Array(ASCII_COLUMNS*ASCII_ROWS).fill(-Infinity),cells=new Array(depths.length);
 for(const {p,n,edge} of mesh){
  const x=matrix[0]*p[0]+matrix[1]*p[1]+matrix[2]*p[2];
  const y=matrix[3]*p[0]+matrix[4]*p[1]+matrix[5]*p[2];
  const z=matrix[6]*p[0]+matrix[7]*p[1]+matrix[8]*p[2],perspective=3.8/(4.6-z);
  const column=Math.round(ASCII_COLUMNS/2+x*perspective*24),row=Math.round(ASCII_ROWS/2+y*perspective*13);
  if(column<0||column>=ASCII_COLUMNS||row<0||row>=ASCII_ROWS)continue;
  const index=row*ASCII_COLUMNS+column;
  if(z<=depths[index])continue;
  depths[index]=z;
  const light=Math.min(1,.23+Math.abs(n[0]*lightVector[0]+n[1]*lightVector[1]+n[2]*lightVector[2])*.77);
  const shade=Math.min(3,Math.floor(light*3.65));
  const char=edge>.97?'+' :ramp[Math.max(2,Math.min(9,Math.round(light*9)))];
  cells[index]={x:column*7,y:row*9+8,char,shade};
 }
 return cells.filter(Boolean);
}
export function ribbonSvg(){
 const chars=ribbonFrame().map(({x,y,char,shade})=>`<text x="${x}" y="${y}" fill="${ASCII_COLORS[shade]}">${char}</text>`).join('');
 return `<svg class="ascii-rest" viewBox="0 0 ${ASCII_WIDTH} ${ASCII_HEIGHT}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g font-family="monospace" font-size="10" font-weight="400">${chars}</g></svg>`;
}
