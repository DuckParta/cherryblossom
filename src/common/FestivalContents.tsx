import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../features/reducers";
import { setFestival } from "../features/reducers/contentReducer";
import Appbar from "./Appbar";
import Map from "./Map/Map";
import { Box, Center, Container, Divider, Flex, Heading, Text, Link,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Button,

} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import getDecimalDay from "./getDecimalDay";
import { AddWishListButton } from "./FestivalItem";

function FestivalContents({ userInfo }: any) {
  const dispatch = useDispatch();
  const { contents } = useSelector((state: RootState) => state.contentReducer);
  const decimalDay = getDecimalDay(contents.fstvlStartDate);
  // useEffect(() => {
  //   dispatch(setFestival(contents));
  // }, [userInfo]);

  console.log("contents : ",contents);
  function handleWishButtonClick() {
    console.log(" add wish list");
  }

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
          <UnorderedList spacing={3} 
          p="10px"
          listStyleType="none"
          fontSize="lg"
          fontWeight="semibold"
          >
            <ListItem>
              기간 : {contents.fstvlStartDate} ~ {contents.fstvlEndDate}
            </ListItem>
            <ListItem>
              장소 : {contents.opar}
            </ListItem>
            <ListItem>
              주소 : {contents.rdnmadr}
            </ListItem>
            <ListItem>
              주최기관 : {contents.auspcInstt}
            </ListItem>
            <ListItem>
              문의 전화 : {contents.phoneNumber}
            </ListItem>
            <ListItem>
              공식 사이트 : <Link href={contents.homepageUrl}>{contents.homepageUrl} 
              <ExternalLinkIcon mx="3px"/>
              </Link>
            </ListItem>
          </UnorderedList>
          <Heading 
            my="100px"
            textAlign="center"
            size="lg"
          >{contents.fstvlCo}</Heading>
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
            py="20px">
            <Heading size="md" textAlign="center">{decimalDay}</Heading>
            <Center m="10px">
              <AddWishListButton onAdd={handleWishButtonClick}/>
            </Center>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
}

export default FestivalContents;
