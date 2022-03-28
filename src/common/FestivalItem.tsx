import { Items } from "./festivalDataInterface";

import { Box, Flex, Text, Heading, Center, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFestival } from "../features/reducers/contentReducer";

export default function FestivalItem(props: { items: Items }) {
  const dispatch = useDispatch();
  const {
    fstvlNm,
    opar,
    fstvlStartDate,
    fstvlEndDate,
    decimalDay,
  } = props.items;

  function handleFestivalListClick() {
    dispatch(setFestival(props.items));
  }

  function handleWishButtonClick() {
    console.log(fstvlNm + " add wish list");
  }

  return (
    // <Link to={`/festivalContent`}>
      <Flex flexFlow="column nowrap" h="100%">
        <Box h="70%">
          <Heading 
          onClick={handleFestivalListClick}
          mt="50px" 
          fontSize="lg" 
          overflow="hidden"
          cursor="pointer">
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
          <AddWishListButton onAdd={handleWishButtonClick}/>
        </Center>
        <Text my="5px">
          {fstvlStartDate} ~ {fstvlEndDate}
        </Text>
        <Text>{opar}</Text>
      </Flex>
    // </Link>
  );
}

export const AddWishListButton = (props: {onAdd: React.MouseEventHandler<HTMLHeadingElement>}): JSX.Element => {
  return (
    <Image
      src={`${process.env.PUBLIC_URL}/images/wish_icon.png`}
      w="30px"
      alt="wish"
      onClick={props.onAdd}
      cursor="pointer" />
  )
};
