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
import { ref, set, push, onValue } from "firebase/database";
import { database } from "../util/firebase";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchFestivalData } from "../features/async/fetchFestivalData";
import {AddWishListButton} from "./AddWishListButton";

function FestivalContents() {
  const [login, setLogin] = useState(false);
  const [isWish, setIsWish] = useState(false);
  const param = useParams();
  const dispatch = useDispatch();

  const { content, status } = useSelector(
    (state: RootState) => state.fetchReducer
  );
  const decimalDay = getDecimalDay(content.fstvlStartDate);
  const user = useSelector((state: RootState) => state.userReducer);
  // console.log(status);

  useEffect(() => {
    dispatch(fetchFestivalData({ param }));
  }, []);

  useEffect(() => {
    if (user.userId === "" || user.userId === undefined) {
      setLogin(false);
      setIsWish(false);
    } else {
      setLogin(true);
      getFestival();
    }
  }, [user, login]);

  function handleWishButtonClick() {
    console.log("add wish list");
    isLoginForFirebase(login);
  }

  function isLoginForFirebase(login: boolean) {
    if (login) {
      const userRef = ref(database, `${user.userId}`);
      onValue(userRef, (snapshot) => {
        // 사용자가 있다면
        if (snapshot.exists()) {
          // 중복체크
          onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const fstList: any = Object.values(data);
            if (!checkFestival(fstList)) {
              // 축제가 없다면 축제 저장
              const newPostRef = push(userRef);
              set(newPostRef, {
                festival: param.festivalName,
              });
            } else {
              console.log("already");
            }
          });
        } else {
          // 사용자 정보가 등록되어 있지 않다면 중복체크 할 필요없이 축제 저장
          const newPostRef = push(userRef);
          set(newPostRef, {
            festival: param.festivalName,
          });
        }
      });
    } else {
      console.log("not login");
    }
  }

  function getFestival() {
    if (login) {
      const userRef = ref(database, `${user.userId}`);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          // 중복체크
          onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const fstList: any = Object.values(data);
            if (checkFestival(fstList)) {
              setIsWish(true);
            } else {
              setIsWish(false);
            }
          });
        }
      });
    }
  }

  function checkFestival(fstList: any) {
    for (let i = 0; i < fstList.length; i++) {
      if (param.festivalName === fstList[i].festival) {
        return true;
      }
    }
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
                공식 사이트 : <Link href={content.homepageUrl}>{content.homepageUrl}
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
              <AddWishListButton
                onAdd={handleWishButtonClick}
                isWish={isWish}
              />
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
    </Container>
  );
}

export default FestivalContents;
