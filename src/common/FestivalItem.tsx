import { Items } from "./festivalDataInterface";

import { Box, Flex, Text, Heading, Center, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFestival } from "../features/reducers/contentReducer";

export default function FestivalItem(props: { items: Items }) {
  const {
    fstvlNm,
    fstvlCo,
    opar,
    fstvlStartDate,
    fstvlEndDate,
    decimalDay,
    phoneNumber,
    rdnmadr,
    latitude,
    longitude,
    homepageUrl,
  } = props.items;

  const dispatch = useDispatch();

  function handleFestivalListClick() {
    dispatch(
      setFestival({
        fstvlNm,
        fstvlCo,
        fstvlStartDate,
        fstvlEndDate,
        opar,
        phoneNumber,
        rdnmadr,
        latitude,
        longitude,
        homepageUrl,
      })
    );
    console.log(fstvlNm);
  }

  function handleWishButtonClick() {
    console.log(fstvlNm + " add wish list");
  }

  return (
    <Link to="festivalContent">
      <Flex flexFlow="column nowrap" h="100%">
        <Box onClick={handleFestivalListClick} h="70%" cursor="pointer">
          <Heading fontSize="lg" mt="50px" overflow="hidden">
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
          <Image
            src={`${process.env.PUBLIC_URL}/images/wish_icon.png`}
            w="30px"
            alt="wish"
            onClick={handleWishButtonClick}
            cursor="pointer"
          />
        </Center>
        <Text my="5px">
          {fstvlStartDate} ~ {fstvlEndDate}
        </Text>
        <Text>{opar}</Text>
      </Flex>
    </Link>
  );
}
