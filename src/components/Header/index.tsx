import {
  Box,
  Center,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  Image,
  Button,
  CloseButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { setInfo, setLogout, IUser } from "../../reducers/userReducer";
import GoogleLoginBtn from "../button/GoogleLoginButton";
import { WishActiveIcon } from "../../assets/svgs";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [login, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser>({
    userId: user.userId,
    name: user.name,
  });

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  useEffect(() => {
    if (!userInfo.userId && userInfo.userId !== "") {
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
      success: () => {
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
      fail(err: any) {
        console.error(JSON.stringify(err));
      },
    });
  };

  const onLogout = () => {
    dispatch(setLogout());
  };

  return (
    <>
      <Flex justifyContent="center" marginY="20px" bgColor="white">
        <Box w="50em" maxWidth="50em">
          <Heading
            mx="15px"
            fontFamily="Courgette"
            fontSize="3xl"
            letterSpacing="widest"
          >
            <Box w="35px">
              <Link to="/">
                <WishActiveIcon width="35px" height="35px" />
              </Link>
            </Box>
          </Heading>
        </Box>
        {login ? (
          <Center mx="15px">
            <Menu>
              <Text w="10em" fontSize="lg" fontWeight="bold" textAlign="right">
                {userInfo?.name}
              </Text>
              <Box
                mx={3}
                px={2}
                py={2}
                borderRadius="full"
                boxShadow="0 0 8px rgb(0 0 0 / 9%)"
              >
                <WishActiveIcon width="35px" height="35px" />
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
                  <Text w="100%" onClick={onLogout}>
                    로그아웃
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </Center>
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
        blockScrollOnMount
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
};

export default Header;
