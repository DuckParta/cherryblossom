import { useCallback, useEffect, useRef, useState } from 'react';

import { Items } from './festivalDataInterface';
import FestivalItem from './FestivalItem';
import useIntersectionObserver from '../features/hooks/useIntersectionObserver';

export default function FestivalsList() {
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
    const itemKey = item.fstvlNm + JSON.stringify(index)
    return (
      <div key={itemKey}>
        <FestivalItem item={item}/>
      </div>
    )
  });
  
  return (
    <>
    <div id="scrollArea">
      <div>{renderList}</div>
      <div ref={loader}></div>
      {loading && <span><b>io loading...</b></span>}
    </div>
    </>
  );
}
