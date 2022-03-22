import { useDispatch, useSelector } from 'react-redux';
import { ReactElement, useEffect } from 'react';

import { RootState } from '../features/reducers';
import { fetchFestivalData } from '../features/async/fetchFestivalData';
import { Items } from './festivalDataInterface';
import FestivalsList from './FestivalsList';


export default function Container() {
  const dispatch = useDispatch();
  const { body, isLoading } = useSelector((store: RootState) => store.festivalDataReducer);
  const getData = async () => {
    await dispatch(fetchFestivalData());
  }
  console.log(body)
  const items = body.items;
  const itemsRender = items?.map((item: Items, index): JSX.Element => {
    return (
    <FestivalsList key={item.fstvlNm + JSON.stringify(index)} item={item}/>
    );
  });
  
  useEffect(() => {
    getData();
  },[]);

  // console.log(body);

  return (
    <>
    <div>{isLoading && "Loading..."}</div>
    <div>
      {itemsRender}
    </div>
    </>
  ) 
}
