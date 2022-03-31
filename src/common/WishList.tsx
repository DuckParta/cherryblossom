import Appbar from "./Appbar";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  Container,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../features/reducers";
import { onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { Items } from "./festivalDataInterface";
import { database } from "../util/firebase";

function WishList() {
  const user = useSelector((state: RootState) => state.userReducer);
  const [fstList, setFstList] = useState<Items[]>([]);
  const [deleteKeys, setDeleteKeys] = useState<String[]>([]);

  useEffect(() => {
    if (user.userId !== "") {
      getFestival();
    }
  }, [user]);

  // console.log(user);
  // console.log("fstList", fstList);
  // console.log("deleteKeys", deleteKeys);

  function onDelete(index: number) {
    console.log("onDelete", index);
    remove(ref(database, `${user.userId}/${deleteKeys[index]}`)).then((r) => {
      console.log("removed successfully");
    });
  }

  function getFestival() {
    const userRef = ref(database, `${user.userId}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      let fstList: any;
      if (data !== null) {
        fstList = Object.values(data);
        setDeleteKeys((cur) => Object.keys(data));
      } else {
        setDeleteKeys([]);
      }
      setFstList(fstList);
    });
  }

  return (
    <Container>
      <Appbar />
      <Text>내 축제</Text>
      <Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>축제명</Th>
              <Th>축제 장소</Th>
              <Th>축제 내용</Th>
              <Th>축제 기간</Th>
            </Tr>
          </Thead>
          <Tbody>
            {fstList !== undefined
              ? fstList.map((fItem, i) => {
                  return (
                    <Tr key={i}>
                      <Td>
                        {fItem.fstvlId.slice(0, fItem.fstvlId.indexOf("-"))}
                      </Td>
                      <Td>{fItem.opar}</Td>
                      <Td>{fItem.fstvlCo}</Td>
                      <Td>
                        {`${fItem.fstvlStartDate} ~ ${fItem.fstvlEndDate}`}
                      </Td>
                      <Td>
                        <Button onClick={() => onDelete(i)}>삭제</Button>
                      </Td>
                    </Tr>
                  );
                })
              : null}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
}

export default WishList;
