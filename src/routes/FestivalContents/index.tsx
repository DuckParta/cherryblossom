import { ArrowBackIcon, LinkIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { fetchFestivalData } from "../../async/fetchFestivalData";
import { AddWishListButton } from "../../components/button/AddWishListButton";
import Header from "../../components/Header";
import { RootState } from "../../reducers";
import { database } from "../../service/firebase";
import { Items } from "../../types/type";
import FestivalContentsTable from "./FestivalContentsTable";
import Map from "./Map/Map";
import SkeletonFestivalContents from "./SkeletonFestivalContents";

const FestivalContents = () => {
  const param = useParams();
  const copyUrlRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [isWish, setIsWish] = useState(false);
  const [currentFstvlKey, setCurrentFstvlKey] = useState(0);
  const { contents } = useSelector((state: RootState) => state.fetchContents);
  const {
    fstvlId,
    fstvlNm,
    decimalDay,
    fstvlStartDate,
    fstvlEndDate,
    opar,
    rdnmadr,
    lnmadr,
    auspcInstt,
    phoneNumber,
    homepageUrl,
    fstvlCo,
    latitude,
    longitude,
  } = contents;
  const user = useSelector((state: RootState) => state.user);
  const MAP_OPPAR = contents.opar.split("(")[0];
  const MAP_URL = `https://map.kakao.com/link/to/${MAP_OPPAR},${contents.latitude},${contents.longitude}`;
  const toast = useToast({
    title: "Cherry Blossom",
    duration: 1000,
  });

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

  const handleWishButtonClick = () => {
    if (login) {
      setFirebaseDB();
      return;
    }
    return toast({
      status: "info",
      position: "top",
      description: "로그인 후 이용 가능합니다!",
    });
  };

  const setFirebaseDB = () => {
    const userRef = ref(database, `${user.userId}`);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `${user.userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const festivalList: Items[] = Object.values(data);
        if (!checkFestival(festivalList)) {
          const newPostRef = push(userRef);
          set(newPostRef, {
            ...contents,
          });
          return;
        }
        const fstvlKeys = Object.keys(data);
        remove(ref(database, `${user.userId}/${fstvlKeys[currentFstvlKey]}`));
        setIsWish(false);
        return;
      }
      const newPostRef = push(userRef);
      set(newPostRef, {
        ...contents,
      });
    });
  };

  const getFestival = () => {
    const userRef = ref(database, `${user.userId}`);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const festivalList: Items[] = Object.values(data);
        if (checkFestival(festivalList)) {
          setIsWish(true);
          return;
        }
        setIsWish(false);
        return;
      }
      setIsWish(false);
    });
  };

  const checkFestival = (festivalList: Items[]) => {
    const index = festivalList.findIndex(
      (fstvl: Items) => param.fstvlId === fstvl.fstvlId
    );

    if (index !== -1) {
      setCurrentFstvlKey(index);
      return true;
    }
  };

  const handleShareButtonClick = () => {
    return toast({
      status: "success",
      description: "클립보드에 복사되었습니다!",
      containerStyle: {},
    });
  };

  return (
    <FestivalContentsWrapper>
      <Header />
      <Container maxW="container.2xl" pb="100px">
        <Flex mt="2em" justifyContent="center">
          <Flex className="container" w="80%" flexFlow="column nowrap" mx="2em">
            <Box className="back-button" w="30%">
              <Center>
                <Link href="/">
                  <Button colorScheme={"whiteAlpha"}>
                    <ArrowBackIcon color={"black"} boxSize={7} />
                  </Button>
                </Link>
              </Center>
            </Box>
            {fstvlId !== param.fstvlId || !fstvlId ? (
              <SkeletonFestivalContents />
            ) : (
              <>
                <Center my="50px">
                  <Heading
                    className="festival-name"
                    size="2xl"
                    textAlign="center"
                  >
                    {fstvlNm}
                  </Heading>
                </Center>
                <Center mb="30px">
                  <Flex flexDirection="row">
                    <Box bg="gray.100" borderRadius="xl" px="20px">
                      <Heading size="md" textAlign="center" py="15px">
                        {decimalDay}
                      </Heading>
                    </Box>
                    <Center ml="15px">
                      <AddWishListButton
                        onAdd={handleWishButtonClick}
                        isWish={isWish}
                      />
                    </Center>
                  </Flex>
                </Center>
                <Divider />
                <Box my="30px">
                  <Center className="table-wrapper">
                    <FestivalContentsTable
                      fstvlStartDate={fstvlStartDate}
                      fstvlEndDate={fstvlEndDate}
                      opar={opar}
                      rdnmadr={rdnmadr}
                      lnmadr={lnmadr}
                      auspcInstt={auspcInstt}
                      phoneNumber={phoneNumber}
                      homepageUrl={homepageUrl}
                    />
                  </Center>
                  <Heading
                    className="description"
                    my="80px"
                    textAlign="center"
                    size="md"
                  >
                    {fstvlCo}
                  </Heading>
                  <Flex m="30px auto" w="200px" justifyContent="space-between">
                    <Box>
                      <Link
                        href={MAP_URL}
                        isExternal
                        _hover={{ textUnderlineOffset: "none" }}
                      >
                        <Button>
                          <SearchIcon mr="5px" />
                          길찾기
                        </Button>
                      </Link>
                    </Box>
                    <Box position="relative">
                      <CopyToClipboard
                        text={copyUrlRef.current}
                        onCopy={handleShareButtonClick}
                      >
                        <Button>
                          <LinkIcon mr="5px" />
                          공유
                          <Textarea
                            ref={copyUrlRef}
                            value={window.location.href}
                            position="absolute"
                            opacity="0"
                            zIndex="-1"
                            readOnly
                          />
                        </Button>
                      </CopyToClipboard>
                    </Box>
                  </Flex>
                  <Center className="descktop-map-wrapper">
                    <Map
                      className="desktop-map"
                      latitude={latitude}
                      longitude={longitude}
                    />
                  </Center>
                </Box>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </FestivalContentsWrapper>
  );
};

export default FestivalContents;

export const FestivalContentsWrapper = styled.div`
  @media only screen and (max-width: 480px) {
    .festival-name {
      margin-top: 20px;
      font-size: 1.5rem;
    }
    .table-container {
      width: 100%;
    }
    .table {
      font-size: 0.9rem;
    }
    .list-name {
      padding: 0px 0px 0px 10px;
    }
    .homepage-url-wrapper {
      width: 80%;
    }
    .homepage-url {
      width: 150px;
    }
    .description {
      font-size: 1rem;
    }
  }

  @media only screen and (max-width: 900px) {
    .container {
      position: relative;
      width: 100%;
    }
    .homepage-url {
      width: 100px;
    }
    .back-button {
      position: absolute;
      left: 0px;
      width: 10%;
    }
    .homepage-url {
      width: 250px;
    }
  }
  .list-name {
    text-align: right;
  }
`;
