import { Items } from "./festivalDataInterface";

export default function FestivalItem(props: { items: Items }) {
  const { fstvlNm, auspcInstt, opar, fstvlStartDate, decimalDay } = props.items;

  function handleFestivalListClick() {
    console.log(fstvlNm);
  }

  function handleWishButtonClick() {
    console.log(fstvlNm);
  }

  return (
    <>
    <div>
      <div onClick={handleFestivalListClick}>
        <div>{fstvlNm}</div>
        <div>{auspcInstt}</div>
        <div>{opar}</div>
        <div>{fstvlStartDate}</div>
        <div>{decimalDay}</div>
      </div>
      <button onClick={handleWishButtonClick}>찜하기</button>
    </div>
    </>
  );
}