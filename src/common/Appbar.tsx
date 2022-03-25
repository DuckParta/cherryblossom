import {
  Box,
  Button,
  Center,
  Image,
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
} from "@chakra-ui/react";
import styled from "styled-components";
import GoogleLogin from "react-google-login";
import { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [login, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser>({
    userId: "",
    name: "",
  });

  const clientId = process.env.REACT_APP_GOOGLE_LOGIN_API || "";

  const setLoginInfo = (userId: string, name: string) => {
    onClose();
    setUserInfo({ userId: userId, name });
    setLogin(true);
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
      setUserInfo({ userId: "", name: "" });
      setLogin(false);
    };

    return (
      <Text w="100%" onClick={onLogout}>
        로그아웃
      </Text>
    );
  }

  return (
    <>
      <Flex justifyContent="center">
        <Box w="50em" maxWidth="50em">
          <Image htmlWidth="100px" src="../images/logo.png" />
        </Box>
        {login ? (
          <>
            <Center>
              <Menu>
                <Text w={"3em"} mx={-3}>{userInfo?.name} 님</Text>
                <MenuButton
                  mx={3}
                  px={2}
                  py={2}
                  as={Button}
                  bgColor="#F7C8D9"
                  transition="all 0.2s"
                  borderRadius="3xl"
                  borderWidth="1px"
                  _hover={{ bg: "#ED9EA7" }}
                  _expanded={{ bg: "#F7C8D9" }}
                  _focus={{ boxShadow: "outline" }}
                >
                  <ChevronDownIcon />
                </MenuButton>
                <MenuList px={3}>
                  <MenuItem>내 정보</MenuItem>
                  <MenuItem>
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
