import Appbar from "./Appbar";
import { Box, Center, Container, Divider, Flex, Text } from "@chakra-ui/react";
import Map from "./Map";

function FestivalContents() {
    return (
    <Container maxW="container.xl" mt="2em">
      <Appbar />
      <Flex mt="2em" justifyContent="center">
        <Flex w="50%" flexDirection="column" mx="2em">
          <Center>
            <Text fontSize="4xl" m="1em">
              축제 이름
            </Text>
          </Center>
          <Text textAlign="right">2020-03-22</Text>
          <Divider />
          <div>기간</div>
          <div>장소</div>
          <div>주최</div>
          <div>문의 전화</div>
          <div>공식 사이트</div>

          <div>축제 내용</div>
          <div>
            <Map />
          </div>
        </Flex>
        <Box bg="teal">d-day</Box>
      </Flex>
    </Container>
  );
}

export default FestivalContents;
