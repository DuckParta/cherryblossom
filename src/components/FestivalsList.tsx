import { Box, Divider, Flex } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useIntersectionObserver from "../hooks/useFetchFestivalData";
import { Items } from "../types/type.d";
import { RootState } from "../reducers";
import { getSelectedList } from "../reducers/festivalDataReducer";
import ToTheTopButton from "./ToTheTopButton";
import CreateSkeletonItems from "./CreateSkeletonItems";
import FestivalItem from "./FestivalItem";
import OutOfDateFestivalItem from "./OutOfDateFestivalItem";

const FestivalsList = () => {
  const [page, setPage] = useState(0);
  const { loading, list } = useIntersectionObserver(page);
  const loader = useRef(null);

  const { selectedCategories } = useSelector(
    (state: RootState) => state.festivalData
  );

  const selectedItems = useSelector((state: RootState) =>
    getSelectedList(state.festivalData)
  );

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 29);
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
      setPage(page + 29);
      return observer && observer.disconnect();
    };
  }, [handleObserver, loader]);

  const renderList = (list2: Items[]) => {
    return list2.map((item: Items, index: number): JSX.Element => {
      const itemKey = item.id + JSON.stringify(index);
      if (item.isPassedDate) {
        return <OutOfDateFestivalItem key={itemKey} items={item} />;
      }
      return (
        <Link to={`/${item.id}`} key={itemKey}>
          <FestivalItem items={item} />
        </Link>
      );
    });
  };

  return (
    <FestivalsListWrapper>
      <Box id="scroll-area" width="70%">
        <ToTheTopButton />
        <Flex flexFlow="row wrap" justifyContent="space-around" pb="100px">
          {selectedCategories!.length === 0
            ? renderList(list)
            : renderList(selectedItems)}
          <div ref={loader} />
        </Flex>
        {loading && <CreateSkeletonItems />}
        <Divider />
      </Box>
    </FestivalsListWrapper>
  );
};

export const FestivalsListWrapper = styled.div`
  #scroll-area {
    margin: 0px auto;
  }
  @media only screen and (max-width: 900px) {
    #scroll-area {
      margin: 0px auto;
      width: 90%;
    }
  }
`;

export default FestivalsList;
