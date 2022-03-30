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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../features/reducers";
import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Items } from "./festivalDataInterface";

function WishList() {
  const user = useSelector((state: RootState) => state.userReducer);
  const [fstList, setFstList] = useState<Items[]>([]);

  useEffect(() => {
    if (user.userId !== "") {
      setFirebaseDB();
    }
  }, [user]);

  // console.log(user);
  // console.log(fstList);

  function setFirebaseDB() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `${user.userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fstList: any = Object.values(data);
        setFstList(Object.values(fstList));
      }
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
            {fstList.length !== 0
              ? fstList.map((fItem, i) => {
                  return (
                    <Tr key={i}>
                      <Td>
                        {fItem.fstvlId.slice(0, fItem.fstvlId.indexOf("-"))}
                      </Td>
                      <Td>{fItem.opar}</Td>
                      <Td>{fItem.fstvlCo}</Td>
                      <Td>{`${fItem.fstvlStartDate} ~ ${fItem.fstvlEndDate}`}</Td>
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
