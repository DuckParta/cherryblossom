import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Items } from "./festivalDataInterface";
import FestivalItem from "./FestivalItem";
import useIntersectionObserver from "../features/hooks/useIntersectionObserver";
import { RootState } from "../features/reducers";

import { Box, Flex } from "@chakra-ui/react";
import SkeletonFestivalItem from "./SkeletonFestivalItem";
import OutOfDateFestivalItem from "./OutOfDateFestivalItem";

export default function FestivalsList() {
  const [page, setPage] = useState(1);
  const { loading, list } = useIntersectionObserver(page);
  const loader = useRef(null);

  const { items } = useSelector((state: RootState) => state.festivalDataReducer);

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
      threshold: 0,
    };
    let observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer = new IntersectionObserver(handleObserver, {
        ...option,
      });
      observer.observe(loader.current);
    }
    return () => {
      setPage(0);
      return observer && observer.disconnect()};
  }, [handleObserver, loader]);

  const renderList = items.map((item: Items, index: number): JSX.Element => {
    const itemKey = item.fstvlNm + JSON.stringify(index);
    if (item.isPassedDate) {
      return (
        <Box
        key={itemKey}
        margin="15px"
        padding="30px"
        w="300px"
        h="300px"
        boxShadow="0 5px 25px rgb(0 0 0 / 15%)"
        bg="gray.100"
        rounded="3xl"
        textAlign="center"
      >
        <OutOfDateFestivalItem items={item} />
      </Box>
      )
    }
    return (
      <Box
        key={itemKey}
        margin="15px"
        padding="30px"
        w="300px"
        h="300px"
        boxShadow="0 5px 25px rgb(0 0 0 / 15%)"
        bg="white"
        rounded="3xl"
        textAlign="center"
      >
        <Link to={`festivalContent/${item.id}`}><FestivalItem items={item} /></Link>
      </Box>
    );
  });

  return (
    <Box id="scrollArea" width="70%">
      <Flex flexFlow="row wrap" justifyContent="space-around">
        {renderList}
        <div ref={loader}></div>
      </Flex>
      {loading && <SkeletonFestivalItem />}
    </Box>
  );
}
