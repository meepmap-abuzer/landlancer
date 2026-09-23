import {$,$$,initCommon,selectBooking} from './shared.mjs';
import {trainingGoals,daySchedule,membershipPrice,money} from './model.mjs';
import './fitness.css';
let goal='strength',day=0,months=1;
const dayNames=['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
function updateGoal(){const g=trainingGoals[goal];$$('[data-goal]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.goal===goal)));
  $('[data-training-title]').textContent=g.title;$('[data-training-subtitle]').textContent=g.subtitle;$('[data-training-description]').textContent=g.description;$('[data-training-duration]').textContent=`${g.duration} минут`;$('[data-training-focus]').textContent=g.focus;$('[data-training-number]').textContent='0'+(Object.keys(trainingGoals).indexOf(goal)+1);
  $('.training-detail').dataset.goal=goal;
}
$$('[data-goal]').forEach(b=>b.addEventListener('click',()=>{goal=b.dataset.goal;updateGoal();}));
function schedule(){const filter=$('#class-filter').value,rows=daySchedule(day).filter(r=>filter==='all'||r.goal===filter);
  $('.schedule-list').dataset.filtered=String(filter!=='all');
  $('.schedule-list').innerHTML=rows.length?rows.map(r=>`<article class="schedule-row"><time>${r.time}</time><div><h3>${trainingGoals[r.goal].className}</h3><span>${r.level}</span></div><p>${trainingGoals[r.goal].duration} мин <span>Тренер ${r.coach}</span></p><button aria-label="Выбрать ${trainingGoals[r.goal].className}, ${r.time}" data-class="${r.goal}" data-time="${r.time}">Записаться <span aria-hidden="true">+</span></button></article>`).join(''):'<div class="schedule-empty"><h3>В этот день такого занятия нет.</h3><p>Выберите другой день или посмотрите все направления.</p><button class="text-button" data-clear-filter>Показать все занятия ↗</button></div>';
  $$('[data-class]').forEach(b=>b.addEventListener('click',()=>selectBooking(`${dayNames[day]}, ${b.dataset.time} · ${trainingGoals[b.dataset.class].className}`)));
  $('[data-clear-filter]')?.addEventListener('click',()=>{$('#class-filter').value='all';schedule();});
}
$$('[data-day]').forEach(b=>b.addEventListener('click',()=>{day=Number(b.dataset.day);$$('[data-day]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));schedule();}));
$('#class-filter').addEventListener('change',schedule);
$('[data-find-class]').addEventListener('click',()=>{$('#class-filter').value=goal;schedule();$('#schedule').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
$$('[data-months]').forEach(b=>b.addEventListener('click',()=>{months=Number(b.dataset.months);$$('[data-months]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));const price=membershipPrice(months);$('[data-membership-total]').textContent=money(price.total);$('[data-membership-monthly]').textContent=months===1?'За один месяц':`${money(price.monthly)} в месяц · оплата за ${months} месяцев`;}));
$('[data-select-membership]').addEventListener('click',()=>selectBooking(`Абонемент на ${months} ${months===1?'месяц':months===3?'месяца':'месяцев'} · ${money(membershipPrice(months).total)}`));
let running=false,remaining=30,round=1,phase='work',deadline=0,tickId=null,finished=false;
function timerPaint(){const s=Math.ceil(remaining);$('[data-timer-time]').textContent=`00:${String(s).padStart(2,'0')}`;$('[data-timer-round]').textContent=`Круг ${round} из 3`;$('[data-timer-phase]').textContent=finished?'Отличный ритм!':!running&&remaining===30&&round===1?'Готовы?':phase==='work'?'Движение':'Отдых';$('.timer-progress').style.strokeDashoffset=String(100-remaining/(phase==='work'?30:15)*100);$('[data-timer-start]').textContent=finished?'Ещё раз':running?'Пауза':remaining===30&&round===1?'Запустить таймер':'Продолжить';}
function stop(){running=false;clearInterval(tickId);tickId=null;timerPaint();}
function reset(){stop();remaining=30;round=1;phase='work';finished=false;timerPaint();}
function tick(){remaining=Math.max(0,(deadline-performance.now())/1000);if(remaining===0){if(phase==='work'&&round===3){finished=true;stop();$('[data-timer-announcement]').textContent='Три круга завершены.';return;}if(phase==='work'){phase='rest';remaining=15;}else{phase='work';remaining=30;round++;}deadline=performance.now()+remaining*1000;$('[data-timer-announcement]').textContent=phase==='work'?`Движение, круг ${round}`:'Время отдохнуть';}timerPaint();}
$('[data-timer-start]').addEventListener('click',()=>{if(finished)reset();if(running){remaining=Math.max(0,(deadline-performance.now())/1000);stop();}else{running=true;deadline=performance.now()+remaining*1000;tickId=setInterval(tick,100);timerPaint();}});
$('[data-timer-reset]').addEventListener('click',reset);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&running){remaining=Math.max(0,(deadline-performance.now())/1000);stop();}});
initCommon({summary:()=>`РИТМ\nЦель: ${trainingGoals[goal].name}\nАбонемент: ${months} мес., ${money(membershipPrice(months).total)}`,confirmation:'тренировка выбрана. Это демо: запись в клуб не отправлялась. Сохраните свой вариант ниже.'});
updateGoal();schedule();timerPaint();
