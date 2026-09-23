export const money = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
export const homeModels = {
  36:{area:36,width:6,bedrooms:1,price:2950000,description:'Для двоих и долгих выходных',living:20,bedroom:10,bath:6},
  54:{area:54,width:9,bedrooms:2,price:3950000,description:'Своя комната для каждого',living:28,bedroom:20,bath:6},
  72:{area:72,width:12,bedrooms:3,price:4950000,description:'Место для семьи и гостей',living:36,bedroom:30,bath:6}
};
export const facades = {
  cedar:{name:'Натуральное дерево',color:0xaa7950,price:0},
  graphite:{name:'Графит',color:0x414946,price:180000},
  light:{name:'Светлый',color:0xcfc9b8,price:120000}
};
export function homeQuote({area=54,facade='cedar',terrace=true}){
  if(!homeModels[area] || !facades[facade])throw new RangeError('Unknown home option');
  const base=homeModels[area].price, finish=facades[facade].price, deck=terrace?area/3*30000:0;
  return {base,finish,deck,total:base+finish+deck,terraceArea:terrace?area/3:0};
}
export const services = {
  polish:{name:'Полировка',base:18000,hours:8},
  ceramic:{name:'Керамика',base:22000,hours:10},
  film:{name:'Защитная плёнка',base:65000,hours:16},
  interior:{name:'Уход за салоном',base:14000,hours:8}
};
export function careQuote({size='M',selected=['polish'],zone='front'}){
  const sizes={S:0.85,M:1,L:1.2,XL:1.4};
  if(!sizes[size] || !['front','full'].includes(zone))throw new RangeError('Unknown car option');
  const keys=[...new Set(selected)];
  if(keys.some(k=>!services[k]))throw new RangeError('Unknown service');
  let total=0,hours=0;
  const rows=keys.map(k=>{const s=services[k],price=Math.round(s.base*sizes[size]*(k==='film'&&zone==='full'?2.8:1)/100)*100;total+=price;hours+=s.hours*(k==='film'&&zone==='full'?2:1);return {key:k,name:s.name,price};});
  return {total,days:Math.ceil(hours/12),rows};
}
export const trainingGoals = {
  strength:{name:'Стать сильнее',title:'СИЛА',subtitle:'Уверенность в каждом движении.',description:'Свободные веса, понятная техника и нагрузка под ваш опыт. Небольшая группа, чтобы тренер успел уделить внимание каждому.',className:'Силовая база',duration:55,focus:'Техника и контроль'},
  endurance:{name:'Добавить энергии',title:'ТЕМП',subtitle:'Перезагрузка после рабочего дня.',description:'Чередуем кардио и функциональные упражнения. Темп регулируете вы, тренер помогает сохранить технику и вовремя восстановиться.',className:'Функциональный ритм',duration:45,focus:'Движение и выносливость'},
  mobility:{name:'Двигаться свободнее',title:'БАЛАНС',subtitle:'Чуть больше свободы в теле.',description:'Спокойная работа с подвижностью и координацией. Без гонки за повторениями: учимся чувствовать движение и находить комфортную амплитуду.',className:'Мобильность',duration:50,focus:'Подвижность и внимание'}
};
export function membershipPrice(months){const costs={1:7900,3:21300,6:39000};if(!costs[months])throw new RangeError('Unknown term');return {total:costs[months],monthly:costs[months]/months};}
export function daySchedule(day){
  const weekend=day>4;
  return [
    {time:weekend?'10:00':'07:30',goal:'strength',coach:'Алексей',level:'Любой уровень'},
    {time:weekend?'12:00':'12:30',goal:day%2?'endurance':'mobility',coach:'Мария',level:'В комфортном темпе'},
    {time:weekend?'16:00':'18:30',goal:'endurance',coach:'Илья',level:'Можно с нуля'},
    {time:weekend?'18:00':'20:00',goal:'mobility',coach:'Мария',level:'Мягкая нагрузка'}
  ];
}
