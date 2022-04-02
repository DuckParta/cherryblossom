import AppBar from "../Header/AppBar";
import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
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

  console.log(festivalList);
  useEffect(() => {
    if (user.userId !== "") {
      getFestival();
    }
  }, [user]);

  function onDelete(index: number) {
    remove(ref(database, `${user.userId}/${deleteKeys[index]}`));
  }

  function getFestival() {
    const userRef = ref(database, `${user.userId}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      let fstList: any;

      if (data !== null) {
        fstList = Object.values(data);
        setDeleteKeys(() => Object.keys(data));
      } else {
        setDeleteKeys([]);
      }
      setFestivalList(fstList);
    });
  }

  const DeleteWishItemButton = (props: {onDelete: any, index: number}) => {
    const {onDelete, index} = props;

    return (
      <Button onClick={onDelete(index)}>삭제</Button>
    )
  } 

  return (
    <Box>
      <AppBar />
        <Box bgColor="gray.50" pb="100px">
        <Center py="100px">
          <Heading>내 축제 리스트</Heading>
        </Center>
        <Center>
          <Box width="70%">
            <Flex flexFlow="column wrap" justifyContent="space-around">
              <Flex flexFlow="row wrap" justifyContent="space-around">
              {festivalList.map((item: Items, index: number): JSX.Element => {
                const itemKey = item.id;
                if (item.isPassedDate) {
                  return (
                    <Box key={itemKey}>
                      <OutOfDateFestivalItem items={item} />
                      <Center>
                        <DeleteWishItemButton onDelete={onDelete} index={index}/>
                      </Center>
                    </Box>
                  );
                }
                return (
                  <Box key={itemKey}>
                    <Link to={`festivalContent/${item.id}`} key={itemKey}>
                      <FestivalItem items={item} />
                    </Link>
                    <Center>
                      <DeleteWishItemButton onDelete={onDelete} index={index}/>
                    </Center>
                  </Box>
                );
              })}
              </Flex>
            </Flex>
          </Box>
        </Center>
      </Box>
    </Box>
  );
}

export default WishList;
