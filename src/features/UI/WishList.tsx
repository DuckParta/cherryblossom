import AppBar from "../Header/AppBar";
import { Box, Button, Center, Flex, Heading, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../common/reducers";
import { onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { Items } from "../../common/Interface/festivalDataInterface";
import { database } from "../../common/service/firebase";
import FestivalItem from "../InfiniteScroll/FestivalItem";
import OutOfDateFestivalItem from "../InfiniteScroll/OutOfDateFestivalItem";
import { Link } from "react-router-dom";

function WishList() {
  const user = useSelector((state: RootState) => state.userReducer);
  const [festivalList, setFestivalList] = useState<Items[]>([]);
  const [deleteKeys, setDeleteKeys] = useState<String[]>([]);

  useEffect(() => {
    if (user.userId !== "") {
      getFestival();
      return;
    }
  }, [user]);

  function onDelete(index: number) {
    remove(ref(database, `${user.userId}/${deleteKeys[index]}`));
  }

  function getFestival() {
    const userRef = ref(database, `${user.userId}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      let fstvlList: Items[];

      if (data !== null) {
        fstvlList = Object.values(data);
        setDeleteKeys(() => Object.keys(data));
      } else {
        setDeleteKeys([]);
      }
      setFestivalList(fstvlList!);
    });
  }

  const renderFestivalList = (list: any) => {
    if(!list) {
      return (
        <Box h="container.lg" textAlign="center" my="10%">
          <Heading mb="5%" textAlign="center" fontSize="5xl" fontFamily="Courgette" textColor="GrayText">
            Cherry Blossom
          </Heading>
          <Heading size="md" textColor="GrayText" fontWeight="semibold">아직 찜한 축제가 없습니다.</Heading>
        </Box>
      )
    }
    return (
      <>
        {list.map((item: Items, index: number): JSX.Element => {
          const itemKey = item.fstvlId;
          if (item.isPassedDate) {
            return (
              <Box key={itemKey}>
                <OutOfDateFestivalItem items={item} />
                <Center>
                  <Button onClick={() => onDelete(index)}>삭제</Button>
                </Center>
              </Box>
            );
          }
          return (
            <Box key={itemKey}>
              <Link to={`/${item.fstvlId}`} key={itemKey}>
                <FestivalItem items={item} />
              </Link>
              <Center>
                <Button onClick={() => onDelete(index)}>삭제</Button>
              </Center>
            </Box>
          );
        })}
      </>
    );
  } 

  return (
    <Box>
      <AppBar />
        <Box pb="20%" bgColor="gray.50">
        <Center py="10%">
          <Image 
          src={`${process.env.PUBLIC_URL}/images/wish_active_icon.png`} 
          w="25px"
          mx="10px"/>
          <Heading>내 축제 리스트</Heading>
        </Center>
        <Center>
          <Box width="70%">
            <Flex flexFlow="column wrap" justifyContent="space-around">
              <Flex flexFlow="row wrap" justifyContent="space-around">
                {renderFestivalList(festivalList)}
              </Flex>
            </Flex>
          </Box>
        </Center>
      </Box>
    </Box>
  );
}

export default WishList;
