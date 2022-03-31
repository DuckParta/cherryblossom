import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Items } from "../../common/Interface/festivalDataInterface";
import FestivalItem from "./FestivalItem";
import useIntersectionObserver from "../../common/hooks/useIntersectionObserver";
import { RootState } from "../../common/reducers";

import { Box, Flex } from "@chakra-ui/react";
import SkeletonFestivalItem from "../UI/SkeletonFestivalItem";
import OutOfDateFestivalItem from "./OutOfDateFestivalItem";

export default function FestivalsList() {
  const [page, setPage] = useState(1);
  const { loading } = useIntersectionObserver(page);
  const loader = useRef(null);

  const { items } = useSelector(
    (state: RootState) => state.festivalDataReducer
  );

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
    let observer = new global.IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer = new global.IntersectionObserver(handleObserver, {
        ...option,
      });
      observer.observe(loader.current);
    }
    return () => {
      setPage(0);
      return observer && observer.disconnect();
    };
  }, [handleObserver, loader]);

  const renderList = items.map((item: Items): JSX.Element => {
    const itemKey = item.id;
    if (item.isPassedDate) {
      return (
        <OutOfDateFestivalItem key={itemKey} items={item} />
      );
    }
    return (
      <Link to={`festivalContent/${item.id}`} key={itemKey}>
        <FestivalItem items={item} />
      </Link>
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
