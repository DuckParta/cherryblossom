import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
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
  Image,
  CloseButton,
} from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/reducers";
import { setInfo, setLogout } from "../features/reducers/userReducer";
import { database } from "../util/firebase";
import { set, ref } from "firebase/database";

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

    if (user.userId !== "" && user.userId !== undefined) {
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
          <Heading
            mx="15px"
            fontFamily="Courgette"
            fontSize="3xl"
            letterSpacing="widest"
          >
            <Link to="/">CB</Link>
          </Heading>
        </Box>
        {login ? (
          <>
            <Center mx="15px">
              <Menu>
                <Text
                  w="10em"
                  fontSize="lg"
                  fontWeight="bold"
                  textAlign="right"
                >
                  {userInfo?.name}
                </Text>
                <Box
                  mx={3}
                  px={2}
                  py={2}
                  borderRadius="full"
                  boxShadow="0 0 8px rgb(0 0 0 / 9%)"
                >
                  <Image
                    src={`${process.env.PUBLIC_URL}/images/wish_active_icon.png`}
                    w="30px"
                  />
                </Box>
                <MenuButton>
                  <TriangleDownIcon w="3" color="gray.500" cursor="pointer" />
                </MenuButton>
                <MenuList minWidth="150px" px={3}>
                  <MenuItem borderRadius="lg">
                    <Link to="/wishlist">
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
            <Button
              onClick={onOpen}
              bgColor="transparent"
              _hover={{ bg: "pink.100" }}
              _active={{ bg: "pink.100" }}
              _focus={{ bg: "pink.200" }}
            >
              로그인
            </Button>
          </Center>
        )}
      </Flex>
      <Modal
        blockScrollOnMount={true}
        size="2xl"
        isCentered
        motionPreset="slideInBottom"
        isOpen={isOpen}
        trapFocus={false}
        onClose={onClose}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <Box float="right">
                <CloseButton onClick={onClose} color="gray.500" size="lg" />
              </Box>
            </ModalHeader>
            <ModalBody my="40px">
              <Center mb="50px">
                <Heading size="xl">Welcom to Cherry Blossom</Heading>
              </Center>
              <Center>
                <Flex
                  flexFlow="row wrap"
                  justifyContent="space-between"
                  w="50%"
                >
                  <Flex
                    h="170px"
                    flexDirection="column"
                    justifyContent="space-between"
                    my="20px"
                  >
                    <GoogleLoginBtn
                      onGoogleLogin={setLoginInfo}
                      clientId={clientId}
                    />
                    <Heading size="md" textAlign="center" textColor="GrayText">
                      Google 로그인
                    </Heading>
                  </Flex>
                  <Flex
                    h="170px"
                    flexDirection="column"
                    justifyContent="space-between"
                    my="20px"
                  >
                    <Button
                      onClick={onKakaoLogin}
                      w="130px"
                      h="130px"
                      bgColor="#FFE711"
                      borderRadius="xl"
                      boxShadow="0 5px 25px rgb(0 0 0 / 15%)"
                      _hover={{ bg: "#FFE711" }}
                      _active={{ bg: "#FFE711" }}
                      _focus={{ bg: "#FFE711" }}
                    >
                      <Image
                        src={`${process.env.PUBLIC_URL}/images/kakaotalk_logo.jpeg`}
                        w="60px"
                      />
                    </Button>
                    <Heading size="md" textAlign="center" textColor="GrayText">
                      Kakao 로그인
                    </Heading>
                  </Flex>
                </Flex>
              </Center>
            </ModalBody>
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
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          w="130px"
          h="130px"
          bgColor="white"
          borderRadius="xl"
          boxShadow="0 5px 25px rgb(0 0 0 / 15%)"
          _hover={{ bg: "white" }}
          _active={{ bg: "white" }}
          _focus={{ bg: "white" }}
        >
          <Image
            src={`${process.env.PUBLIC_URL}/images/google_logo.jpeg`}
            w="60px"
          />
        </Button>
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
}

export default Appbar;
