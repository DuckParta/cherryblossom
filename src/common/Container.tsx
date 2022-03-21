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
  
  useEffect(() => {
    getData();
  },[]);

  console.log(body);

  return (
    <>
    <div>
    </div>
    </>
  ) 
}
