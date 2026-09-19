/** Rounded lens map: neutral centre and an inward refracting bevel.
 * Technique: https://kube.io/blog/liquid-glass-css-svg/
 * Coordinates are calculated in CSS pixels, stored in a bounded raster.
 */
export function createRefractionMap(cssWidth,cssHeight,radius){
 const ratio=Math.min(1,320/Math.max(cssWidth,cssHeight));
 const width=Math.max(1,Math.round(cssWidth*ratio)),height=Math.max(1,Math.round(cssHeight*ratio));
 const r=Math.min(radius,cssWidth/2,cssHeight/2),bevel=Math.min(18,r*.7,cssWidth/4,cssHeight/4);
 const pixels=new Uint8ClampedArray(width*height*4);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const px=(x+.5)/width*cssWidth,py=(y+.5)/height*cssHeight;
  const cx=Math.max(r,Math.min(cssWidth-r,px)),cy=Math.max(r,Math.min(cssHeight-r,py));
  const dx=px-cx,dy=py-cy,length=Math.hypot(dx,dy);
  let distance,nx,ny;
  if(length>0){distance=r-length;nx=dx/length;ny=dy/length;}
  else{
   const edges=[px,cssWidth-px,py,cssHeight-py];distance=Math.min(...edges);
   const edge=edges.indexOf(distance);nx=[-1,1,0,0][edge];ny=[0,0,-1,1][edge];
  }
  let displacement=0;
  if(distance>=0&&distance<bevel&&bevel>0){const t=distance/bevel;displacement=Math.pow(1-t,2)*.88;}
  const i=(y*width+x)*4;
  pixels[i]=Math.round(128-nx*displacement*127);
  pixels[i+1]=Math.round(128-ny*displacement*127);
  pixels[i+2]=128;pixels[i+3]=255;
 }
 return {width,height,pixels};
}
