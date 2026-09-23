export const formatPoints=(value:string|number)=>new Intl.NumberFormat('ru-RU').format(Number(value));
export const isPositiveDecimal=(value:string|number)=>Number(value)>0;
export const russianCountForm=(n:number,one:string,few:string,many:string)=>n%10===1&&n%100!==11?one:n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?few:many;
