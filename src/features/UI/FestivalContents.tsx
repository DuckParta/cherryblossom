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
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { ArrowBackIcon, ExternalLinkIcon } from "@chakra-ui/icons";
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
import { AddWishListButton } from "./AddWishListButton";
import { Items } from "../../common/Interface/festivalDataInterface";
import SkeletonFestivalContents from "./SkeletonFestivalContents";
import { fetchFestivalData } from "../../common/async/fetchFestivalData";

function FestivalContents() {
  const param = useParams();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [isWish, setIsWish] = useState(false);
  const [currentFstvlKey, setCurrentFstvlKey] = useState(0);
  const { contents } = useSelector((state: RootState) => state.fetchContents);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.userId === "" || user.userId === undefined) {
      setLogin(false);
      setIsWish(false);
    } else {
      setLogin(true);
      getFestival();
    }
  }, [user, login]);

  useEffect(() => {
    dispatch(fetchFestivalData({ fstvlId: param.fstvlId! }));
  }, []);

  function handleWishButtonClick() {
    if (login) {
      setFirebaseDB();
      return;
    } 
  }

  function setFirebaseDB() {
    const userRef = ref(database, `${user.userId}`);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `${user.userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        // 축제 전체 데이터
        const data = snapshot.val();
        const fstvlList: Items[] = Object.values(data);
        // 축제 검색
        if (!checkFestival(fstvlList)) {
          // 축제가 없다면 저장
          const newPostRef = push(userRef);
          set(newPostRef, {
            ...contents
          });
          return;
        } 
        // 축제가 있다면 삭제
        const fstvlKeys = Object.keys(data);
        remove(ref(database, `${user.userId}/${fstvlKeys[currentFstvlKey]}`));
        setIsWish(false);
        return;
      } 
      // 사용자 정보가 등록되어 있지 않다면 축제 저장
      const newPostRef = push(userRef);
      set(newPostRef, {
        ...contents
      });
    });
  }

  function getFestival() {
    const userRef = ref(database, `${user.userId}`);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fstvlList: Items[] = Object.values(data);
        if (checkFestival(fstvlList)) {
          setIsWish(true);
          return;
        } 
        setIsWish(false);
        return;
      } 
      setIsWish(false);
    });
  }

  function checkFestival(fstvlList: Items[]) {
    const index = fstvlList.findIndex(
      (fstvl: Items) => param.fstvlId === fstvl.fstvlId
    );

    if (index !== -1) {
      setCurrentFstvlKey(index);
      return true;
    }
  }

  return (
    <Box>
      <AppBar />
      <Container maxW="container.2xl" pb="100px">
        {!contents.fstvlId
        ? <SkeletonFestivalContents />
        : <Flex mt="2em" justifyContent="center">
        <Flex w="80%" flexFlow="column nowrap" mx="2em">
          <Box w="30%">
            <Center>
            <Link href="/">
              <Button colorScheme={"whiteAlpha"}>
                <ArrowBackIcon color={"black"} boxSize={7} />
              </Button>
            </Link>
            </Center>
          </Box>
          <Center my="50px">
            <Heading size="2xl" textAlign="center">{contents.fstvlNm}</Heading>
          </Center>
          <Center mb="30px">
          <Flex
            flexDirection="row"
            bg="gray.100"
            borderRadius="xl"
            px="20px"
          >
            <Heading size="md" textAlign="center" py="20px">
              {contents.decimalDay}
            </Heading>
            <Center ml="10px">
              <AddWishListButton
                onAdd={handleWishButtonClick}
                isWish={isWish}
              />
            </Center>
          </Flex>
        </Center>
          <Divider />
          <Box my="30px">
            <Center>
              <TableContainer>
                <Table variant="striped" fontWeight="semibold">
                  <Tbody>
                    <Tr>
                      <Td>기간</Td>
                      <Td>{contents.fstvlStartDate} ~ {contents.fstvlEndDate}</Td>
                    </Tr>
                    <Tr>
                      <Td>장소</Td>
                      <Td>{contents.opar}</Td>
                    </Tr>
                    <Tr>
                      <Td>주소</Td>
                      <Td>{contents.rdnmadr || contents.lnmadr}</Td>
                    </Tr>
                    <Tr>
                      <Td>주최기관</Td>
                      <Td>{contents.auspcInstt}</Td>
                    </Tr>
                    <Tr>
                      <Td>문의 전화</Td>
                      <Td>{contents.phoneNumber}</Td>
                    </Tr>
                    <Tr>
                      <Td>공식 사이트</Td>
                      <Td>
                        <Box w="70%"isTruncated>
                        {contents.homepageUrl}
                        </Box>
                        <Link href={contents.homepageUrl} isExternal>
                          <ExternalLinkIcon mx="3px" />
                        </Link>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Center>
            <Heading my="100px" textAlign="center" size="md">
              {contents.fstvlCo}
            </Heading>
            <Center>
              <Map latitude={contents.latitude} longitude={contents.longitude} />
            </Center>
          </Box>
        </Flex>
      </Flex>
      }
    </Container>
    </Box>
  );
}

export default FestivalContents;
