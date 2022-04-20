import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { Items } from "../../common/Interface/festivalDataInterface";

export default function FestivalItem(props: { items: Items }) {
  const { fstvlNm, opar, fstvlStartDate, fstvlEndDate, decimalDay, location } =
    props.items;

  return (
    <Box
      className="item-container"
      margin="15px"
      padding="30px"
      w="300px"
      h="300px"
      boxShadow="0 5px 25px rgb(0 0 0 / 15%)"
      bg="white"
      rounded="3xl"
      textAlign="center"
    >
      <Flex flexFlow="column nowrap" h="100%">
        <Heading size="lg">{location}</Heading>
        <Box h="70%">
          <Heading mt="50px" fontSize="lg" overflow="hidden" cursor="pointer">
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
    </Box>
  );
}
