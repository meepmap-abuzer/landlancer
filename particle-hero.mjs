const canvas = document.querySelector('.page-particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const hero = document.querySelector('.particle-hero');
  const toggle = document.querySelector('.particle-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const arts = [...document.querySelectorAll('[data-ascii]')];
  const visibleArts = new Set();
  let paused = reduced.matches, frame = 0, last = 0, lastAscii = 0;
  let width = 0, height = 0, pageHeight = 0, points = [], visiblePoints = [];
  let elapsed = 0;
  const pointer = {x:-1000,y:-1000};
  function collect(){const top=scrollY-40,bottom=scrollY+height+40;visiblePoints=points.filter(p=>p.oy>top&&p.oy<bottom);}
  function resize() {
    width = innerWidth; height = innerHeight;
    pageHeight = document.documentElement.scrollHeight;
    const dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx?.setTransform(dpr,0,0,dpr,0,0);
    const denseEnd=hero.getBoundingClientRect().bottom+scrollY;
    points=[];
    for(let y=14;y<pageHeight;y+=y<denseEnd?29:59)for(let x=12;x<width;x+=y<denseEnd?29:59){
      const seed=Math.sin(x*7+y*3),ox=x+seed*7,oy=y+Math.cos(x+y)*7;
      points.push({ox,oy,x:ox,y:oy,vx:0,vy:0,phase:seed*10,speed:.18+Math.abs(seed)*.16,dense:y<denseEnd});
    }
    collect();draw();wake();
  }
  function draw(){
    if(!ctx)return;
    ctx.clearRect(0,0,width,height);
    for(const dense of [false,true]){
      ctx.fillStyle=dense?'rgba(180,193,202,.30)':'rgba(180,193,202,.19)';ctx.beginPath();
      for(const p of visiblePoints)if(p.dense===dense){ctx.moveTo(p.x+.85,p.y-scrollY);ctx.arc(p.x,p.y-scrollY,.85,0,Math.PI*2);}
      ctx.fill();
    }
  }
  function ascii(el,t){
    const cols=34,rows=16,buffer=Array.from({length:rows},()=>Array(cols).fill(' '));
    const put=(x,y,z)=>{const rx=x*Math.cos(t)+z*Math.sin(t),rz=-x*Math.sin(t)+z*Math.cos(t),ry=y*Math.cos(.35)+rz*Math.sin(.35),px=Math.round(cols/2+rx*12),py=Math.round(rows/2+ry*6);if(px>=0&&px<cols&&py>=0&&py<rows)buffer[py][px]=rz>.3?'*':rz>-.3?'+':'.';};
    for(let axis=0;axis<3;axis++)for(const a of [-.75,.75])for(const b of [-.75,.75])for(let s=-.75;s<=.76;s+=.09){const p=[s,a,b];put(p[axis%3],p[(axis+1)%3],p[(axis+2)%3]);}
    el.textContent=buffer.map(row=>row.join('')).join('\n');
  }
  function tick(now){
    frame=0;if(paused||document.hidden)return;
    const dt=Math.min((now-last)/16.667||1,2);last=now;elapsed+=dt/60;
    for(const p of visiblePoints){
      const tx=p.ox+Math.sin(elapsed*p.speed+p.phase)*9+Math.cos(elapsed*.43+p.phase*3)*3;
      const ty=p.oy+Math.cos(elapsed*p.speed*.8+p.phase)*8;
      let dx=p.x-pointer.x,dy=p.y-pointer.y,d=Math.hypot(dx,dy);
      if(d<110){const f=(1-d/110)*1.5;p.vx+=(d<.1?1:dx/d)*f*dt;p.vy+=(d<.1?0:dy/d)*f*dt;}
      p.vx+=(tx-p.x)*.012*dt;p.vy+=(ty-p.y)*.012*dt;p.vx*=Math.pow(.88,dt);p.vy*=Math.pow(.88,dt);p.x+=p.vx*dt;p.y+=p.vy*dt;
    }
    draw();
    if(now-lastAscii>100){visibleArts.forEach(el=>ascii(el,elapsed*.25));lastAscii=now;}
    frame=requestAnimationFrame(tick);
  }
  function wake(){if(!frame&&!paused&&!document.hidden){last=performance.now();frame=requestAnimationFrame(tick);}}
  function sync(){cancelAnimationFrame(frame);frame=0;document.body.classList.toggle('motion-paused',paused);if(toggle){toggle.textContent=paused?'Включить анимацию':'Пауза анимации';toggle.setAttribute('aria-pressed',String(paused));}document.dispatchEvent(new CustomEvent('lancer:motion',{detail:{paused}}));wake();}
  document.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;pointer.x=e.clientX;pointer.y=e.clientY+scrollY;},{passive:true});
  document.addEventListener('pointerleave',()=>{pointer.x=-1000;pointer.y=-1000;});
  document.addEventListener('scroll',()=>{pointer.x=-1000;collect();draw();},{passive:true});
  toggle?.addEventListener('click',()=>{paused=!paused;sync();});
  reduced.addEventListener('change',()=>{paused=reduced.matches;sync();});
  document.addEventListener('visibilitychange',sync);
  new ResizeObserver(()=>{if(width!==innerWidth||height!==innerHeight||pageHeight!==document.documentElement.scrollHeight)resize();}).observe(document.body);
  addEventListener('resize',resize,{passive:true});
  const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting)visibleArts.add(e.target);else visibleArts.delete(e.target);}});
  arts.forEach(el=>{ascii(el,.4);observer.observe(el);});
  resize();sync();
}
