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
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  fetchFestivalData,
  setContents,
} from "../features/async/fetchFestivalData";
import { setFestival } from "../features/reducers/contentReducer";

function FestivalContents() {
  const { contents } = useSelector((state: RootState) => state.contentReducer);
  const decimalDay = getDecimalDay(contents.fstvlStartDate);

  function handleWishButtonClick() {
    console.log(" add wish list");
  }

  const param = useParams();
  console.log("params", param);

  const dispatch = useDispatch();
  const { content, status } = useSelector(
    (state: RootState) => state.fetchReducer
  );

  console.log("content", content.fstvlNm);
  const [loading, setLoading] = useState("");
  const [fetcContent, setFetChContent] = useState({});

  useEffect(() => {
    dispatch(fetchFestivalData(param));
  }, []);

  useEffect(() => {
    if (status === "success") {
      setLoading(status);
      dispatch(setContents({ param, content }));
      dispatch(setFestival(content));
      // setFetChContent(content);
    }
  }, [status, content]);

  return (
    <Container maxW="container.xl" mt="2em">
      <Appbar />
      <Flex mt="2em" justifyContent="center">
        <Flex w="60%" flexDirection="column" mx="2em">
          <Text>뒤로가기</Text>
          <Center my="50px">
            <Heading size="2xl">{contents.fstvlNm}</Heading>
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
                기간 : {contents.fstvlStartDate} ~ {contents.fstvlEndDate}
              </ListItem>
              <ListItem>장소 : {contents.opar}</ListItem>
              <ListItem>주소 : {contents.rdnmadr}</ListItem>
              <ListItem>주최기관 : {contents.auspcInstt}</ListItem>
              <ListItem>문의 전화 : {contents.phoneNumber}</ListItem>
              <ListItem>
                공식 사이트 :{" "}
                <Link href={contents.homepageUrl}>
                  {contents.homepageUrl}
                  <ExternalLinkIcon mx="3px" />
                </Link>
              </ListItem>
            </UnorderedList>
            <Heading my="100px" textAlign="center" size="lg">
              {contents.fstvlCo}
            </Heading>
            <Map latitude={contents.latitude} longitude={contents.longitude} />
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
