// One world-space front reveals terrain, stones and blades from the same seed.
export function radialReveal(material,{radius,origin}){
 const original=material.onBeforeCompile;
 material.onBeforeCompile=shader=>{
  original.call(material,shader);
  shader.uniforms.uGardenRadius=radius;shader.uniforms.uGardenOrigin=origin;
  shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vGardenWorld;').replace('#include <project_vertex>',`vec4 gardenVertex=vec4(transformed,1.0);
   #ifdef USE_INSTANCING
    gardenVertex=instanceMatrix*gardenVertex;
   #endif
   vGardenWorld=(modelMatrix*gardenVertex).xyz;
   #include <project_vertex>`);
  shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nuniform float uGardenRadius; uniform vec2 uGardenOrigin; varying vec3 vGardenWorld;').replace('#include <dithering_fragment>',`#include <dithering_fragment>
   float front=1.0-smoothstep(uGardenRadius-2.0,uGardenRadius+2.0,distance(vGardenWorld.xz,uGardenOrigin));
   float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
   if(front<grain)discard;`);
 };
}
