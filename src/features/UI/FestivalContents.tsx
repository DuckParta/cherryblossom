import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../common/reducers";
import AppBar from "../Header/AppBar";
import Map from "../Map/Map";
import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  ListItem,
  UnorderedList,
  Button,
} from "@chakra-ui/react";
import { ArrowBackIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import getDecimalDay from "../Compute/getDecimalDay";
import {
  ref,
  set,
  push,
  onValue,
  get,
  remove,
  child,
  getDatabase,
} from "firebase/database";
import { database } from "../../common/service/firebase";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchFestivalData } from "../../common/async/fetchFestivalData";
import { AddWishListButton } from "./AddWishListButton";
import { Items } from "../../common/Interface/festivalDataInterface";
import SkeletonFestivalContents from "./SkeletonFestivalContents";

function FestivalContents() {
  const [login, setLogin] = useState(false);
  const [isWish, setIsWish] = useState(false);
  const [curFstKey, setCurFstKey] = useState(0);

  const param = useParams();
  const dispatch = useDispatch();
  const { content } = useSelector((state: RootState) => state.fetchReducer);
  const user = useSelector((state: RootState) => state.userReducer);

  const decimalDay = getDecimalDay(content.fstvlStartDate);

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
    if (login) {
      setFirebaseDB();
    } else {
      console.log("not login");
    }
  }

  function setFirebaseDB() {
    const userRef = ref(database, `${user.userId}`);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `${user.userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        // 축제 전체 데이터
        const data = snapshot.val();
        const fstList: any = Object.values(data);
        // 축제 검색
        if (!checkFestival(fstList)) {
          // 축제가 없다면 저장
          const newPostRef = push(userRef);
          set(newPostRef, {
            fstvlId: param.festivalName + content.fstvlStartDate,
            fstvlNm: param.festivalName,
            opar: content.opar,
            fstvlCo: content.fstvlCo,
            fstvlEndDate: content.fstvlEndDate,
            homepageUrl: content.homepageUrl,
            latitude: content.latitude,
            longitude: content.longitude,
            mnst: content.mnnst,
            phoneNumber: content.phoneNumber,
            rdnmadr: content.rdnmadr,
            referenceData: content.referenceDate,
            relateInfo: content.relateInfo,
            suprtInstt: content.suprtInstt
          });
        } else {
          // 축제가 있다면 삭제
          const fstKeys = Object.keys(data);
          remove(ref(database, `${user.userId}/${fstKeys[curFstKey]}`));
          setIsWish(false);
        }
      } else {
        // 사용자 정보가 등록되어 있지 않다면 축제 저장
        const newPostRef = push(userRef);
        set(newPostRef, {
          fstvlId: param.festivalName + content.fstvlStartDate,
          fstvlNm: param.festivalName,
          opar: content.opar,
          fstvlCo: content.fstvlCo,
          fstvlEndDate: content.fstvlEndDate,
          homepageUrl: content.homepageUrl,
          latitude: content.latitude,
          longitude: content.longitude,
          mnst: content.mnnst,
          phoneNumber: content.phoneNumber,
          rdnmadr: content.rdnmadr,
          referenceData: content.referenceDate,
          relateInfo: content.relateInfo,
          suprtInstt: content.suprtInstt
        });
      }
    });
    
  }

  function getFestival() {
    const userRef = ref(database, `${user.userId}`);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fstList: any = Object.values(data);
        if (checkFestival(fstList)) {
          setIsWish(true);
        } else {
          setIsWish(false);
        }
      } else {
        setIsWish(false);
      }
    });
  }

  function checkFestival(fstList: any) {
    const index = fstList.findIndex(
      (fst: Items) => param.festivalName === fst.fstvlId
    );

    if (index !== -1) {
      setCurFstKey(index);
      return true;
    }
  }

  return (
    <Box>
      <AppBar />
      <Container maxW="container.2xl" pb="100px">
      {content.fstvlNm === param.fstvlNm 
        ? <SkeletonFestivalContents />
        : <Flex mt="2em" justifyContent="center">
        <Flex w="60%" flexDirection="column" mx="2em">
          <Box>
            <Link href="/">
              <Button colorScheme={"whiteAlpha"}>
                <ArrowBackIcon color={"black"} boxSize={7} />
              </Button>
            </Link>
          </Box>
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
              <ListItem>내용 : {content.fstvlCo}</ListItem>
              <ListItem>장소 : {content.opar}</ListItem>
              <ListItem>주소 : {content.rdnmadr}</ListItem>
              <ListItem>주최기관 : {content.auspcInstt}</ListItem>
              <ListItem>문의 전화 : {content.phoneNumber}</ListItem>
              <ListItem>
                공식 사이트 :{content.homepageUrl}
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
        <Box mt="200px" position="fixed" right="5%">
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
      }
    </Container>
    </Box>
  );
}

export default FestivalContents;
