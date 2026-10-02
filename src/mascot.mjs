// Original character-cell sprite: a cloth hood, scarf, gloves and split boots.
// Every visible cell is a real ASCII character; there is no downloaded artwork.
const WIDTH=64,HEIGHT=72,CELL_X=8,CELL_Y=9;
const tones=['#707077','#a5a5ad','#e4e4e8','#bded52'];
const parts={
 scarf:[[41,30],[53,33],[57,39],[49,37],[44,38]],
 body:[[23,31],[40,31],[45,40],[48,56],[37,59],[30,56],[19,59],[16,53],[20,40]],
 leftArm:[[20,33],[25,36],[21,43],[19,48],[12,45],[14,38]],
 rightArm:[[41,33],[46,33],[51,39],[53,46],[46,49],[43,41]],
 leftBoot:[[23,55],[29,56],[29,64],[19,64],[19,61],[23,60]],
 rightBoot:[[36,56],[42,55],[42,61],[46,61],[46,64],[36,64]]
};
const inside=(x,y,polygon)=>{
 let hit=false;
 for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
  const [a,b]=polygon[i],[c,d]=polygon[j];
  if((b>y)!==(d>y)&&x<(c-a)*(y-b)/(d-b)+a)hit=!hit;
 }
 return hit;
};
const ellipse=(x,y,cx,cy,rx,ry)=>((x-cx)/rx)**2+((y-cy)/ry)**2<=1;
function spritePart(name){
 const cells=[];
 for(let y=0;y<HEIGHT;y++)for(let x=0;x<WIDTH;x++){
  let hit=name==='head'?ellipse(x,y,32,19,16,15):inside(x,y,parts[name]);
  if(name==='head'&&ellipse(x,y,32,23,11.5,8))hit=false;
  if(!hit)continue;
  let shade=name==='scarf'?3:x<29?2:x<38?1:0;
  if(name==='body'&&Math.abs(x+y-66)<2)shade=3;
  const char=shade===3?'+':'#@%=:'[(x*3+y*7)%5];
  cells.push(`<text x="${x*CELL_X}" y="${y*CELL_Y+8}" fill="${tones[shade]}">${char}</text>`);
 }
 return `<g class="mascot-${name}">${cells.join('')}</g>`;
}
const sprite=['scarf','leftBoot','rightBoot','body','leftArm','rightArm','head'].map(spritePart).join('');
const eye=(x,y)=>Array.from({length:6},(_,i)=>`<text x="${(x+i%3)*CELL_X}" y="${(y+Math.floor(i/3))*CELL_Y+8}">+</text>`).join('');
const eyes=`<g class="mascot-eyes" fill="#bded52">${eye(25,22)}${eye(36,22)}</g>`;
const packet=`<g class="mascot-packet" fill="#bded52" font-size="24"><text x="390" y="330">.----.</text><text x="390" y="354">| ++ |</text><text x="390" y="378">'----'</text></g>`;
export const MASCOT_POSES=['idle','wave','inspect','carry','sit'];
export function mascot(pose='idle',small=false){
 const safePose=MASCOT_POSES.includes(pose)?pose:'idle';
 return `<div class="mascot${small?' mascot-small':''} mascot-${safePose}" data-mascot="${safePose}" data-digital-scene aria-hidden="true"><svg viewBox="0 0 512 648" xmlns="http://www.w3.org/2000/svg"><g class="mascot-sprite" font-family="monospace" font-size="10" font-weight="400">${sprite}<g class="mascot-face">${eyes}</g>${safePose==='inspect'||safePose==='carry'?packet:''}</g></svg></div>`;
}
