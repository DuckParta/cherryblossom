import { Box, Flex, Text, Heading, Center } from "@chakra-ui/react";
import { Items } from "../../common/Interface/festivalDataInterface";

export default function OutOfDateFestivalItem(props: { items: Items }) {
  const { fstvlNm, opar, fstvlStartDate, fstvlEndDate, decimalDay, location } =
    props.items;

  return (
    <Box
      margin="15px"
      padding="30px"
      w="300px"
      h="300px"
      boxShadow="0 5px 25px rgb(0 0 0 / 15%)"
      bg="gray.100"
      rounded="3xl"
      textAlign="center"
    >
      <Flex flexFlow="column nowrap" h="100%" cursor="default">
        <Heading>{location}</Heading>
        <Box h="70%">
          <Heading mt="50px" overflow="hidden" fontSize="lg" textColor="gray.500">
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
            textColor="gray.500"
          >
            {decimalDay}
          </Heading>
        </Center>
        <Text my="5px" textColor="gray.500">
          {fstvlStartDate} ~ {fstvlEndDate}
        </Text>
        <Text textColor="gray.500">{opar}</Text>
      </Flex>
    </Box>
  );
}
