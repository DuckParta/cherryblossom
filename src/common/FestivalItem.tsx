import { Items } from "./festivalDataInterface";

import {
  Box,
  Flex,
  Text,
  Heading,
  Center,
  Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFestivalData } from "../features/async/fetchFestivalData";
import { RootState } from "../features/reducers";

export default function FestivalItem(props: { items: Items }) {
  const { currentFestival, status } = useSelector(
    (state: RootState) => state.festivalDataReducer
  );

  const dispatch = useDispatch();
  const { fstvlNm, opar, fstvlStartDate, fstvlEndDate, decimalDay } =
    props.items;

  function handleFestivalListClick() {
    // dispatch(setFestival(props.items));
    dispatch(fetchFestivalData({ param: props.items }));
  }

  function handleWishButtonClick() {
    console.log(fstvlNm + " add wish list");
  }

  return (
    <Flex flexFlow="column nowrap" h="100%">
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
        <AddWishListButton onAdd={handleWishButtonClick} />
      </Center>
      <Text my="5px">
        {fstvlStartDate} ~ {fstvlEndDate}
      </Text>
      <Text>{opar}</Text>
    </Flex>
  );
}

export const AddWishListButton = (props: {
  onAdd: React.MouseEventHandler<HTMLHeadingElement>;
}): JSX.Element => {
  return (
    <Image
      src={`${process.env.PUBLIC_URL}/images/wish_icon.png`}
      w="30px"
      alt="wish"
      onClick={props.onAdd}
      cursor="pointer"
    />
  );
};
