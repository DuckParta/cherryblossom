import Appbar from "./Appbar";
import { Box, Center, Container, Divider, Flex, Text } from "@chakra-ui/react";
import Map from "./Map/Map";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/reducers";
import { useEffect } from "react";
import { setFestival } from "../features/reducers/contentReducer";

function FestivalContents({ userInfo }: any) {
  const dispatch = useDispatch();
  const contents = useSelector((state: RootState) => state.contentReducer);

  useEffect(() => {
    dispatch(setFestival(contents));
  }, []);

  return (
    <Container maxW="container.xl" mt="2em">
      <Appbar />
      <Flex mt="2em" justifyContent="center">
        <Flex w="50%" flexDirection="column" mx="2em">
          <Center>
            <Text fontSize="4xl" m="1em">
              {contents.fstvlNm}
            </Text>
          </Center>
          <Text textAlign="right">2020-03-22</Text>
          <Divider />
          <div>
            기간: {contents.fstvlStartDate} ~ {contents.fstvlEndDate}
          </div>
          <div>장소: {contents.opar}</div>
          <div>주최: {contents.rdnmadr}</div>
          <div>문의 전화: {contents.phoneNumber}</div>
          <div>공식 사이트: {contents.homepageUrl}</div>

          <div>축제 내용: {contents.fstvlCo}</div>
          <div>
            <Map latitude={contents.latitude} longitude={contents.longitude} />
          </div>
        </Flex>
        <Box bg="teal">d-day</Box>
      </Flex>
    </Container>
  );
}

export default FestivalContents;
