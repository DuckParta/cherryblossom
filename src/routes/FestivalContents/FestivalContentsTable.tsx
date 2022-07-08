import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const FestivalContentsTable = ({
  fstvlStartDate,
  fstvlEndDate,
  opar,
  rdnmadr,
  lnmadr,
  auspcInstt,
  phoneNumber,
  homepageUrl,
}: {
  fstvlStartDate: string;
  fstvlEndDate: string;
  opar: string;
  rdnmadr: string;
  lnmadr: string;
  auspcInstt: string;
  phoneNumber: string;
  homepageUrl: string;
}) => {
  return (
    <TableContainer className="table-container" w="70%">
      <Table className="table" variant="striped" fontWeight="semibold">
        <Tbody>
          <Tr>
            <Td className="list-name">기간</Td>
            <Td className="list-contents">
              {fstvlStartDate} ~ {fstvlEndDate}
            </Td>
          </Tr>
          <Tr>
            <Td className="list-name">장소</Td>
            <Td className="list-contents">{opar}</Td>
          </Tr>
          <Tr>
            <Td className="list-name">주소</Td>
            <Td className="list-contents">{rdnmadr || lnmadr}</Td>
          </Tr>
          <Tr>
            <Td className="list-name">주최기관</Td>
            <Td className="list-contents">{auspcInstt}</Td>
          </Tr>
          <Tr>
            <Td className="list-name">문의 전화</Td>
            <Td className="list-contents">{phoneNumber}</Td>
          </Tr>
          <Tr>
            <Td className="list-name">공식 사이트</Td>
            <Td className="list-contents">
              <Link to={homepageUrl}>
                <Flex className="homepage-url-wrapper" flexFlow="row nowrap">
                  <Box className="homepage-url" w="500px" isTruncated>
                    {homepageUrl}
                  </Box>
                  <ExternalLinkIcon m="3px" />
                </Flex>
              </Link>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default FestivalContentsTable;
