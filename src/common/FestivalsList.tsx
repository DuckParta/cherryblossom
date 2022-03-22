import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';

import { RootState } from '../features/reducers';
import { fetchFestivalData } from '../features/async/fetchFestivalData';
import { Items } from './festivalDataInterface';
import FestivalItem from './FestivalItem';
import useIntersectionObserver from '../features/hooks/useIntersectionObserver';

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
  
  // useEffect(() => {
  //   getData();
  // },[dispatch]);

  console.log(body);

  // useIntersectionObserver
  const [page, setPage] = useState(1);
  const { loading, error, list } = useIntersectionObserver(page);
  const loader = useRef(null);
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    // getData();
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  },[handleObserver]);

  const renderList = list.map((item: Items, index: number): JSX.Element => {
    const isLastElement = list.length === index + 1;
    return (
      <div>{index}
      <FestivalItem key={item.fstvlNm + JSON.stringify(index)} item={item}/>
      {isLastElement && <FestivalItem key={item.fstvlNm + JSON.stringify(index)} item={item}/>}
      {loading && <h1>io loading...</h1>}
      <div ref={loader}></div>
      </div>
    )
  })

  return (
    <>
    <div>
      <div>=== IntersectionObserver ===</div>
      {loading && <div><b>io loading...</b></div>}
      <div>
        {/* {itemsRender} */}
        {renderList}
      </div>
    </div>
    </>
  );
}
