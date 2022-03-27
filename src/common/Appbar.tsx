import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  Image
} from "@chakra-ui/react";
import styled from "styled-components";
import GoogleLogin from "react-google-login";
import { useEffect, useState } from "react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/reducers";
import { setInfo, setLogout } from "../features/reducers/userReducer";
import { app, database } from "../util/firebase";
import { set, ref } from "firebase/database";

const GoogleBtn = styled.button`
  width: 100%;
  height: 2.5em;
  color: #000000;
  background-color: #c7c7c7;
  border-radius: 5px;
  margin-bottom: 0.8em;

  &:hover {
    color: white;
    background-color: #9d9d9d;
  }
`;

const KakaoBtn = styled.button`
  width: 100%;
  height: 2.5em;
  color: black;
  background-color: #f2dc11;
  border-radius: 5px;

  &:hover {
    color: white;
    background-color: #b09971;
  }
`;

function Appbar() {
  interface IUser {
    userId: string;
    name: string;
  }

  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store.userReducer);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [login, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser>({
    userId: user.userId,
    name: user.name,
  });

  useEffect(() => {
    setUserInfo(user);

    // Firebase에 빈 배열을 저장하지 않고, 유저정보를 유지하기 위해
    if (user.userId !== "" && user.userId !== undefined ) {
      set(ref(database, `users/${user.userId}`), {
        name: userInfo.name,
      });
    }
  }, [user]);

  useEffect(() => {
    if (userInfo.userId !== "" && userInfo.userId !== undefined) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    dispatch(setInfo(userInfo));
  }, [userInfo]);

  const clientId = process.env.REACT_APP_GOOGLE_LOGIN_API || "";

  const setLoginInfo = (userId: string, name: string) => {
    onClose();
    setUserInfo({ userId, name });
  };

  const { Kakao }: any = window;

  const onKakaoLogin = () => {
    Kakao.Auth.login({
      success: (authObj: any) => {
        Kakao.API.request({
          url: "/v2/user/me",
          success: (res: any) => {
            const {
              id,
              properties: { nickname },
            } = res;
            setLoginInfo(id, nickname);
          },
          fail: (error: any) => console.error(error),
        });
      },
      fail: function (err: any) {
        console.log(JSON.stringify(err));
      },
    });
  };

  function LogoutBtn() {
    const onLogout = () => {
      dispatch(setLogout());
    };

    return (
      <Text w="100%" onClick={onLogout}>
        로그아웃
      </Text>
    );
  }

  return (
    <>
      <Flex justifyContent="center" marginY="20px">
        <Box w="50em" maxWidth="50em">
          <Heading mx="15px"
          fontFamily="Courgette" 
          fontSize="3xl"
          letterSpacing="widest"
          >CB</Heading>
        </Box>
        {login ? (
          <>
            <Center mx="15px">
              <Menu>
                <Text w="10em" 
                fontSize="lg" 
                fontWeight="bold"
                textAlign="right">
                  {userInfo?.name}
                </Text>
                <Box 
                  mx={3}
                  px={2}
                  py={2}
                  borderRadius="full" 
                  boxShadow="0 0 8px rgb(0 0 0 / 9%)"
                  >
                    <Image src={`${process.env.PUBLIC_URL}/images/wish_active_icon.png`}  w="30px"/>
                  </Box>
                <MenuButton
                  // mx={3}
                  // px={2}
                  // py={2}
                  // as={Button}
                  // bgColor="#F7C8D9"
                  // transition="all 0.2s"
                  // borderRadius="3xl"
                  // borderWidth="1px"
                  // _hover={{ bg: "#ED9EA7" }}
                  // _expanded={{ bg: "#F7C8D9" }}
                  // _focus={{ boxShadow: "outline" }}
                >
                  <TriangleDownIcon w="3" color="gray.500" cursor="pointer"/>
                </MenuButton>
                {/* <TriangleDownIcon w="3" color="gray.500" cursor="pointer"/> */}
                <MenuList minWidth="150px" px={3}>
                  <MenuItem borderRadius="lg">
                    <Link to="wishlist">
                      <Text w="100px">내 축제</Text>
                    </Link>
                  </MenuItem>
                  <MenuItem borderRadius="lg">
                    <LogoutBtn />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Center>
          </>
        ) : (
          <Center w="7em">
            <Button onClick={onOpen} colorScheme="teal">
              로그인
            </Button>
          </Center>
        )}
      </Flex>
      <Modal
        blockScrollOnMount={true}
        size="md"
        isCentered
        motionPreset="slideInBottom"
        isOpen={isOpen}
        trapFocus={false}
        onClose={onClose}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <Center>Cherry Blossom에 오신 걸 환영합니다!</Center>
            </ModalHeader>
            <ModalBody>
              <Flex flexDirection="column">
                <GoogleLoginBtn
                  onGoogleLogin={setLoginInfo}
                  clientId={clientId}
                />
                <KakaoBtn onClick={onKakaoLogin}>Kakao 로그인</KakaoBtn>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}

function GoogleLoginBtn({ onGoogleLogin, clientId }: any) {
  const onSuccess = async (response: any) => {
    const {
      profileObj: { googleId: userId, name },
    } = response;
    await onGoogleLogin(userId, name);
  };

  const onFailure = (error: any) => {
    console.log(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      responseType={"id_token"}
      render={(renderProps) => (
        <GoogleBtn
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          Google 로그인
        </GoogleBtn>
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
}

export default Appbar;
