import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/reducers";
import Appbar from "./Appbar";
import Map from "./Map/Map";
import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
  Link,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import getDecimalDay from "./getDecimalDay";
import { AddWishListButton } from "./FestivalItem";
import { ref, set } from "firebase/database";
import { database } from "../util/firebase";

function FestivalContents() {
  const { content, status } = useSelector(
    (state: RootState) => state.fetchReducer
  );
  const decimalDay = getDecimalDay(content.fstvlStartDate);

  // console.log("content", content);
  // console.log(status);

  function handleWishButtonClick() {
    console.log(" add wish list");
    // set(ref(database, `users/${user.userId}/`), {
    //   name: userInfo.name,
    // });
  }

  return (
    <Container maxW="container.xl" mt="2em">
      <Appbar />
      <Flex mt="2em" justifyContent="center">
        <Flex w="60%" flexDirection="column" mx="2em">
          <Text>뒤로가기</Text>
          <Center my="50px">
            <Heading size="2xl">{content.fstvlNm}</Heading>
          </Center>
          <Divider />
          <Box my="30px">
            <UnorderedList
              spacing={3}
              p="10px"
              listStyleType="none"
              fontSize="lg"
              fontWeight="semibold"
            >
              <ListItem>
                기간 : {content.fstvlStartDate} ~ {content.fstvlEndDate}
              </ListItem>
              <ListItem>장소 : {content.opar}</ListItem>
              <ListItem>주소 : {content.rdnmadr}</ListItem>
              <ListItem>주최기관 : {content.auspcInstt}</ListItem>
              <ListItem>문의 전화 : {content.phoneNumber}</ListItem>
              <ListItem>
                공식 사이트 :{" "}
                <Link href={content.homepageUrl}>
                  {content.homepageUrl}
                  <ExternalLinkIcon mx="3px" />
                </Link>
              </ListItem>
            </UnorderedList>
            <Heading my="100px" textAlign="center" size="lg">
              {content.fstvlCo}
            </Heading>
            <Map latitude={content.latitude} longitude={content.longitude} />
          </Box>
        </Flex>
        <Box mt="200px" position="fixed" right="10%">
          <Flex
            flexDirection="column"
            w="100px"
            h="100px"
            bg="gray.100"
            borderRadius="xl"
            py="20px"
          >
            <Heading size="md" textAlign="center">
              {decimalDay}
            </Heading>
            <Center m="10px">
              <AddWishListButton onAdd={handleWishButtonClick} />
            </Center>
          </Flex>
        </Box>
      </Flex>
      <Box mt="200px" position="fixed" right="10%">
        <Flex
          flexDirection="column"
          w="100px"
          h="100px"
          bg="gray.100"
          borderRadius="xl"
          py="20px">
          <Heading size="md" textAlign="center">{decimalDay}</Heading>
          <Center m="10px">
            <AddWishListButton onAdd={handleWishButtonClick}/>
          </Center>
        </Flex>
      </Box>
  </Container>
  );
}

export default FestivalContents;
