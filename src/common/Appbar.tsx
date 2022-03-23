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
} from "@chakra-ui/react";
import styled from "styled-components";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useState } from "react";

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
    googleId: string;
    email: string;
    name: string;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [login, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser>({
    googleId: "",
    email: "",
    name: "",
  });

  const onGoogleLogin = (googleId: string, email: string, name: string) => {
    setUserInfo({ googleId, email, name });
    setLogin(true);
    onClose();
  };

  const clientId = process.env.REACT_APP_GOOGLE_LOGIN_API || "";

  function GoogleLoginBtn({ onGoogleLogin }: any) {
    const onSuccess = async (response: any) => {
      const {
        profileObj: { googleId, email, name },
      } = response;
      await onGoogleLogin(googleId, email, name);
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

  function GoogleLogoutBtn() {
    const logout = () => {
      setLogin(false);
      setUserInfo({ googleId: "", email: "", name: "" });
    };

    return (
      <GoogleLogout
        clientId={clientId}
        onLogoutSuccess={logout}
        render={(renderProps) => (
          <Center w="7em">
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              로그아웃
            </Button>
          </Center>
        )}
      />
    );
  }

  return (
    <>
      <Flex justifyContent="center">
        <Box w="55em">
          <Image htmlWidth="100px" src="../images/logo.png" />
        </Box>
        {login ? (
          <>
            안녕하세요 {userInfo?.name}님
            <GoogleLogoutBtn />
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
                <GoogleLoginBtn onGoogleLogin={onGoogleLogin} />
                <KakaoBtn>Kakao 로그인</KakaoBtn>
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

export default Appbar;