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

function WishList() {
  const user = useSelector((state: RootState) => state.userReducer);
  console.log(user);
  const [fstList, setFstList] = useState({});

  useEffect(() => {
    setFirebaseDB();
  }, []);
  console.log(fstList);

  function setFirebaseDB() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `${user.userId}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fstList: any = Object.values(data);
        setFstList(fstList);
      }
    });
  }

  const data = [
    {
      fName: "축제명1",
      fPlace: "축제장소1",
      fContent: "축제내용1",
      fDate: "축제날짜1",
    },
    {
      fName: "축제명2",
      fPlace: "축제장소2",
      fContent: "축제내용2",
      fDate: "축제날짜2",
    },
  ];

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
            {data.map((fItem, i) => {
              return (
                <Tr key={i}>
                  <Td>{fItem.fName}</Td>
                  <Td>{fItem.fPlace}</Td>
                  <Td>{fItem.fContent}</Td>
                  <Td>{fItem.fDate}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      <Box>
        <Text>지난 축제</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>축제명</Th>
              <Th>축제 장소</Th>
              <Th>축제 내용</Th>
              <Th>축제 날짜</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((fItem, i) => {
              return (
                <Tr key={i}>
                  <Td>{fItem.fName}</Td>
                  <Td>{fItem.fPlace}</Td>
                  <Td>{fItem.fContent}</Td>
                  <Td>{fItem.fDate}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
}

export default WishList;
