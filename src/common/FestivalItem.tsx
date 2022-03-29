import { Items } from "./festivalDataInterface";

import { Box, Flex, Text, Heading, Center, Image } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFestivalData } from "../features/async/fetchFestivalData";
import { RootState } from "../features/reducers";
import { festivalDataReducer } from "../features/reducers/festivalDataReducer";
import {useEffect, useState} from "react";

export default function FestivalItem(props: { items: Items }) {
  const { items } = useSelector(
    (state: RootState) => state.festivalDataReducer
  );
  const dispatch = useDispatch();
  const { fstvlNm, opar, fstvlStartDate, fstvlEndDate, decimalDay, location } =
    props.items;

  function handleFestivalListClick() {
    // dispatch(setFestival(props.items));
    // dispatch(fetchFestivalData({ param: props.items }));
  }

  function handleWishButtonClick() {
    console.log(fstvlNm + " add wish list");
  }

  return (
    <Flex flexFlow="column nowrap" h="100%">
      <Heading>{location}</Heading>
      <Box h="70%">
        <Heading
          onClick={handleFestivalListClick}
          mt="50px"
          fontSize="lg"
          overflow="hidden"
          cursor="pointer"
        >
          {fstvlNm}
        </Heading>
      </Box>
      <Center h="20%">
        <Heading
          padding="5px 10px"
          margin="10px"
          borderRadius="lg"
          bgColor="gray.100"
          fontSize="lg"
        >
          {decimalDay}
        </Heading>
      </Center>
      <Text my="5px">
        {fstvlStartDate} ~ {fstvlEndDate}
      </Text>
      <Text>{opar}</Text>
    </Flex>
  );
}
