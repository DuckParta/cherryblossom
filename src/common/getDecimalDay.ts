export default function getDecimalDay(festivalDay: string) {
  const today = new Date();
  const formattedFestivalDate = new Date(festivalDay);
  const distance = today.getTime() - formattedFestivalDate.getTime();
  
  const day = Math.floor(distance/(1000*60*60*24));
  if (day === 0) return "D - Day";
  else if (day > 0) return `D + ${day}`;
  else if (day < 0) return `D - ${-day}`;
}