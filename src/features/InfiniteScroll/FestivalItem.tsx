import { Items } from "../../common/Interface/festivalDataInterface";
import { Box, Flex, Text, Heading, Center } from "@chakra-ui/react";
import { festivalDataReducer } from "../../common/reducers/festivalDataReducer";
import { useDispatch } from "react-redux";

export default function FestivalItem(props: { items: Items }) {
  const dispatch = useDispatch();
  const { fstvlNm, opar, fstvlStartDate, fstvlEndDate, decimalDay, location, id } =
    props.items;

  function handleFestivalListClick() {
    dispatch(festivalDataReducer.actions.getClickedFestival(id!));
  }

  return (
    <Box
      onClick={handleFestivalListClick}
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
          <Heading
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
    </Box>
  );
}
