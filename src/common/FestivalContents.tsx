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
  const { currentFestival, status } = useSelector((state: RootState) => state.festivalDataReducer);
  console.log(status);
  const item = currentFestival.items;
  const { fstvlNm, 
    fstvlStartDate, 
    fstvlEndDate, 
    opar, 
    rdnmadr, 
    auspcInstt, 
    phoneNumber, 
    homepageUrl, 
    fstvlCo,
    latitude,
    longitude
  } = item;
  const decimalDay = getDecimalDay(currentFestival.fstvlStartDate);

  // useEffect(() => {
  //   dispatch(setFestival(contents));
  // }, [userInfo]);

  function handleWishButtonClick() {
    console.log(" add wish list");
  }

  const CONTENTS = 
  <Container maxW="container.xl" mt="2em">
    <Appbar />
    <Flex mt="2em" justifyContent="center">
      <Flex w="60%" flexDirection="column" mx="2em">
        <Text>뒤로가기</Text>
        <Center my="50px">
          <Heading size="2xl">{fstvlNm}</Heading>
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
            기간 : {fstvlStartDate} ~ {fstvlEndDate}
          </ListItem>
          <ListItem>
            장소 : {opar}
          </ListItem>
          <ListItem>
            주소 : {rdnmadr}
          </ListItem>
          <ListItem>
            주최기관 : {auspcInstt}
          </ListItem>
          <ListItem>
            문의 전화 : {phoneNumber}
          </ListItem>
          <ListItem>
            공식 사이트 : <Link href={homepageUrl}>{homepageUrl} 
            <ExternalLinkIcon mx="3px"/>
            </Link>
          </ListItem>
        </UnorderedList>
        <Heading 
          my="100px"
          textAlign="center"
          size="lg"
        >{fstvlCo}</Heading>
          <Map latitude={latitude} longitude={longitude} />
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
  </Container>;

  return (
    <Box>
      { fstvlNm !== undefined ? CONTENTS : "fail"}
      {/* { status === "success" && CONTENTS} */}
    </Box>
  );
}

export default FestivalContents;
