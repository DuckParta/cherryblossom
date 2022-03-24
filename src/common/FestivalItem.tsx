export default function FestivalItem(props: any) {
  const item = props.item;

  return (
    <>
    <div>
      <div>{item.fstvlNm}</div>
      <div>{item.auspcInstt}</div>
      <div>{item.opar}</div>
      <div>{item.fstvlStartDate}</div>
      <div>{item.decimalDay}</div>
    </div>
    </>
  );
}