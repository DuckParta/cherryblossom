import { Items } from "./festivalDataInterface";

import { Box, Flex, Text, Heading, Center, Image } from "@chakra-ui/react";

export default function FestivalItem(props: { items: Items }) {
  const { fstvlNm, opar, fstvlStartDate, fstvlEndDate, decimalDay } = props.items;

  function handleFestivalListClick() {
    console.log(fstvlNm);
  }

  function handleWishButtonClick() {
    console.log(fstvlNm + " add wish list");
  }

  return (
    <Flex
    flexFlow="column nowrap"
    h="100%"
    >
      <Box onClick={handleFestivalListClick}
      h="70%"
      cursor="pointer">
        <Heading fontSize="lg"
          mt="50px"
          overflow="hidden"
          >{fstvlNm}</Heading>
      </Box>
      <Center
      h="20%"
      >
        <Heading 
          padding="5px 10px"
          margin="10px"
          borderRadius="lg"
          bgColor="gray.100"
          fontSize="lg">
            {decimalDay}
          </Heading>
          <Image src={`${process.env.PUBLIC_URL}/images/wish_icon.png`}
          w="30px"
          alt="wish"
          onClick={handleWishButtonClick} 
          cursor="pointer"/>
      </Center>
      
      <Text my="5px">{fstvlStartDate} ~ {fstvlEndDate}</Text>
      <Text>{opar}</Text>
    </Flex>
  );
}