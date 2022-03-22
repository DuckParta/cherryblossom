import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { RootState } from '../features/reducers';
import { fetchFestivalData } from '../features/async/fetchFestivalData';


export default function Container() {
  const dispatch = useDispatch();
  const { body } = useSelector((store: RootState) => store.festivalDataReducer);
  const getData = async () => {
    await dispatch(fetchFestivalData());
  }
  const items = body.items;
  const itemsRender = items.map((item, index) => {
    return (
    <div>
      <div>{index +1}</div>
      <div>{item.fstvlNm}</div>
      <div>{item.auspcInstt}</div>
      <div>{item.opar}</div>
      <div>{item.fstvlStartDate}</div>
    </div>
    )
  })
  
  useEffect(() => {
    getData();
  },[]);

  console.log(body);

  return (
    <>
    <div>
      {itemsRender}
    </div>
    </>
  ) 
}
