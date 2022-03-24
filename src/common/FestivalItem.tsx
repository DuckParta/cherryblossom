export default function FestivalItem(props: any) {
  const item = props.item;
  const { fstvlNm } = props.item;

  function handleFestivalListClick() {
    console.log(fstvlNm);
  }

  return (
    <>
    <div onClick={handleFestivalListClick}>
      <div>{item.fstvlNm}</div>
      <div>{item.auspcInstt}</div>
      <div>{item.opar}</div>
      <div>{item.fstvlStartDate}</div>
      <div>{item.decimalDay}</div>
    </div>
    </>
  );
}