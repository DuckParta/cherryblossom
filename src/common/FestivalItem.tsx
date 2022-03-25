import { Items } from "./festivalDataInterface";

export default function FestivalItem(props: { items: Items }) {
  const { fstvlNm, auspcInstt, opar, fstvlStartDate, decimalDay } = props.items;

  function handleFestivalListClick() {
    console.log(fstvlNm);
  }

  return (
    <>
    <div onClick={handleFestivalListClick}>
      <div>{fstvlNm}</div>
      <div>{auspcInstt}</div>
      <div>{opar}</div>
      <div>{fstvlStartDate}</div>
      <div>{decimalDay}</div>
    </div>
    </>
  );
}