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
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import styled from "styled-components";

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
  background-color: #F2DC11;
  border-radius: 5px;

  &:hover {
    color: white;
    background-color: #b09971;
  }
`;

function Appbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex justifyContent="center">
        <Box w="55em">
          <Image htmlWidth="100px" src="../images/logo.png" />
        </Box>
        <Center w="7em">
          <Button onClick={onOpen} colorScheme="teal">
            로그인
          </Button>
        </Center>
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
            <ModalHeader><Center>Cherry Blossom에 오신 걸 환영합니다!</Center></ModalHeader>
            <ModalBody>
              <Flex flexDirection="column">
                <GoogleBtn>
                  Google
                </GoogleBtn>
                <KakaoBtn>
                  Kakao
                </KakaoBtn>
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
