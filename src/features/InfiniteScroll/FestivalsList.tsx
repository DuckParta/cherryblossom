import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Items } from "../../common/Interface/festivalDataInterface";
import FestivalItem from "./FestivalItem";
import useIntersectionObserver from "../../common/hooks/useIntersectionObserver";
import { RootState } from "../../common/reducers";
import { festivalDataReducer } from "../../common/reducers/festivalDataReducer";

import { Box, Flex } from "@chakra-ui/react";
import OutOfDateFestivalItem from "./OutOfDateFestivalItem";
import CreateSkeletonItems from "./CreateSkeletonItems";

export default function FestivalsList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { loading } = useIntersectionObserver(page);
  const loader = useRef(null);

  const { items, selectedCategories } = useSelector(
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

  useEffect(() => {
    dispatch(festivalDataReducer.actions.filterLocation());
  },[selectedCategories])

  const renderList = items.map((item: Items): JSX.Element => {
    const itemKey = item.id;
    if (item.isPassedDate) {
      return (
        <OutOfDateFestivalItem key={itemKey} items={item}/>
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
      {loading && <CreateSkeletonItems />}
    </Box>
  );
}
