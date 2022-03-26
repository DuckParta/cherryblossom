import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Items } from './festivalDataInterface';
import FestivalItem from './FestivalItem';
import useIntersectionObserver from '../features/hooks/useIntersectionObserver';
import { RootState } from '../features/reducers';

import { Box, Flex, Text, Grid, GridItem, Center } from "@chakra-ui/react";

export default function FestivalsList() {
  const [page, setPage] = useState(1);
  const { loading, list } = useIntersectionObserver(page);
  const loader = useRef(null);

  const { items } = useSelector((store: RootState) => store.festivalDataReducer);

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

  const renderList = items.map((item: Items, index: number): JSX.Element => {
    const itemKey = item.fstvlNm + JSON.stringify(index);
    return (
      <Box key={itemKey} 
      margin="20px"
      padding="30px"
      w="280px"
      h="280px" 
      boxShadow="2xl"
      rounded="3xl"
      textAlign="center"
      >
        <FestivalItem items={item}/>
      </Box>
    )
  });
  
  return (
    <>
    <Box id="scrollArea" width="70%">
      <Flex flexFlow="row wrap" justifyContent="space-around" >
        {renderList}
      </Flex>
      <div ref={loader}></div>
      {loading && <span><b>io loading...</b></span>}
    </Box>
    </>
  );
}
