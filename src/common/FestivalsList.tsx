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

  const items = body.items;
  const itemsRender = items?.map((item: Items, index): JSX.Element => {
    return (
    <FestivalItem key={item.fstvlNm + JSON.stringify(index)} item={item}/>
    );
  });
  
  // useEffect(() => {
  //   getData();
  // },[dispatch]);

  // useIntersectionObserver
  const [page, setPage] = useState(1);
  const { loading, list } = useIntersectionObserver(page);
  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    // let 
    let observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer = new IntersectionObserver(handleObserver, {
        ...option
      });
      observer.observe(loader.current);
    }
    return () => observer && observer.disconnect();
  },[handleObserver, loader]);

  const renderList = list.map((item: Items, index: number): JSX.Element => {
    console.log(index);
    return (
      <div>{index}
      <FestivalItem 
      key={item.fstvlNm + JSON.stringify(index)} 
      item={item}/>
      </div>
    )
  })

  return (
    <>
    <div>{isLoading && "loading..."}=== IntersectionObserver ===</div>
    <div id="scrollArea">
      <div>{renderList}</div>
      <div ref={loader}></div>
      {loading && <span><b>io loading...</b></span>}
    </div>
    </>
  );
}
