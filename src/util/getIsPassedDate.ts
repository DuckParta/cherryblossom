export default function getIsPassedDate(festivalEndDate: string) {
  const today = new Date();
  const formattedFestivalEndDate = new Date(festivalEndDate);
  return today > formattedFestivalEndDate;
}
