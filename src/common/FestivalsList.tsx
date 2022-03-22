import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import { RootState } from '../features/reducers';
import { fetchFestivalData } from '../features/async/fetchFestivalData';
import { Items } from './festivalDataInterface';
import FestivalItem from './FestivalItem';

export default function FestivalsList(props: any) {
  const targetRef = useRef(null);
  const dispatch = useDispatch();
  const { body, isLoading } = useSelector((store: RootState) => store.festivalDataReducer);
  const getData = async () => {
    await dispatch(fetchFestivalData());
  }
  // console.log(body);

  const items = body.items;
  const itemsRender = items?.map((item: Items, index): JSX.Element => {
    return (
    <FestivalItem key={item.fstvlNm + JSON.stringify(index)} item={item}/>
    );
  });
  
  useEffect(() => {
    getData();
  },[dispatch]);

  console.log(body);

  return (
    <>
    <div>
    <div>{isLoading && "Loading..."}</div>
    <div>
      {itemsRender}
    </div>
    <div ref={targetRef}></div>
    </div>
    </>
  );
}
