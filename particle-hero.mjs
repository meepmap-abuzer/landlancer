const hero = document.querySelector('.particle-hero');
if (hero) {
  const canvas = hero.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const toggle = hero.querySelector('.particle-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const arts = [...document.querySelectorAll('[data-ascii]')];
  const visibleArts = new Set();
  let paused = reduced.matches, heroVisible = false, frame = 0, last = 0, lastAscii = 0;
  let width = 0, height = 0, points = [], moving = false;
  const pointer = {x:-1000,y:-1000};
  function resize() {
    width = hero.clientWidth; height = hero.clientHeight;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr);
    ctx?.setTransform(dpr,0,0,dpr,0,0);
    points=[];
    const gap = width < 600 ? 23 : 25;
    for(let y=14;y<height;y+=gap) for(let x=12;x<width;x+=gap) {
      const jitter = Math.sin(x*7+y*3);
      points.push({ox:x+jitter*3,oy:y+jitter*3,x:x+jitter*3,y:y+jitter*3,vx:0,vy:0});
    }
    draw(); wake();
  }
  function draw() {
    if(!ctx) return;
    ctx.clearRect(0,0,width,height);
    for(const p of points) {
      // Keep the type area quiet; the lower field carries the interaction.
      const alpha = .12 + .3*Math.min(1,p.oy/height);
      ctx.fillStyle=`rgba(183,198,206,${alpha})`;
      ctx.beginPath();ctx.arc(p.x,p.y,.85,0,Math.PI*2);ctx.fill();
    }
  }
  function ascii(el,t) {
    const cols=34,rows=16,buffer=Array.from({length:rows},()=>Array(cols).fill(' '));
    const put=(x,y,z)=>{
      const rx=x*Math.cos(t)+z*Math.sin(t),rz=-x*Math.sin(t)+z*Math.cos(t);
      const ry=y*Math.cos(.35)+rz*Math.sin(.35);
      const px=Math.round(cols/2+rx*12),py=Math.round(rows/2+ry*6);
      if(px>=0&&px<cols&&py>=0&&py<rows) buffer[py][px]=rz>.3?'*':rz>-.3?'+':'.';
    };
    if(el.dataset.ascii==='cube') {
      for(let axis=0;axis<3;axis++)for(const a of [-.75,.75])for(const b of [-.75,.75])for(let s=-.75;s<=.76;s+=.09){const p=[s,a,b];put(p[(axis+0)%3],p[(axis+1)%3],p[(axis+2)%3]);}
    } else {
      for(let lat=-1.2;lat<=1.2;lat+=.4)for(let lon=0;lon<Math.PI*2;lon+=.16)put(Math.cos(lat)*Math.cos(lon),Math.sin(lat),Math.cos(lat)*Math.sin(lon));
    }
    el.textContent=buffer.map(row=>row.join('')).join('\n');
  }
  function tick(now) {
    frame=0;
    if(paused||document.hidden) return;
    const dt=Math.min((now-last)/16.667||1,2);last=now;
    if(heroVisible && (moving || pointer.x>=0)) {
      moving=false;
      for(const p of points) {
        let dx=p.x-pointer.x,dy=p.y-pointer.y,d=Math.hypot(dx,dy);
        if(d<115){const force=(1-d/115)*1.8;dx=d<.1?1:dx/d;dy=d<.1?0:dy/d;p.vx+=dx*force*dt;p.vy+=dy*force*dt;}
        p.vx+=(p.ox-p.x)*.018*dt;p.vy+=(p.oy-p.y)*.018*dt;
        p.vx*=Math.pow(.86,dt);p.vy*=Math.pow(.86,dt);p.x+=p.vx*dt;p.y+=p.vy*dt;
        if(Math.abs(p.vx)+Math.abs(p.vy)>.015||Math.abs(p.x-p.ox)+Math.abs(p.y-p.oy)>.2)moving=true;
      }
      draw();
    }
    if(now-lastAscii>100){visibleArts.forEach(el=>ascii(el,now*.00025));lastAscii=now;}
    if(heroVisible && (moving||pointer.x>=0)||visibleArts.size)frame=requestAnimationFrame(tick);
  }
  function wake(){if(!frame&&!paused&&!document.hidden){last=performance.now();frame=requestAnimationFrame(tick);}}
  function sync(){cancelAnimationFrame(frame);frame=0;toggle.textContent=paused?'Включить анимацию':'Пауза анимации';toggle.setAttribute('aria-pressed',String(paused));wake();}
  hero.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=hero.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;moving=true;wake();},{passive:true});
  hero.addEventListener('pointerleave',()=>{pointer.x=-1000;pointer.y=-1000;wake();});
  toggle.addEventListener('click',()=>{paused=!paused;sync();});
  reduced.addEventListener('change',()=>{paused=reduced.matches;sync();});
  document.addEventListener('visibilitychange',sync);
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(entries=>{for(const e of entries){if(e.target===hero)heroVisible=e.isIntersecting;else if(e.isIntersecting)visibleArts.add(e.target);else visibleArts.delete(e.target);}wake();}).observe(hero);
  const artObserver=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting)visibleArts.add(e.target);else visibleArts.delete(e.target);}wake();});
  arts.forEach(el=>{ascii(el,.4);artObserver.observe(el);});
  sync();
}
