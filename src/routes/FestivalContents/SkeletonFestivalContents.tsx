import {
  Box,
  Center,
  Divider,
  Flex,
  ListItem,
  Skeleton,
  UnorderedList,
} from "@chakra-ui/react";
import styled from "styled-components";

const SkeletonFestivalContents = () => {
  return (
    <SkeletonContentsWrapper>
      <Center my="50px">
        <Skeleton className="festival-name" w="60%" h="45px" />
      </Center>
      <Center mb="30px">
        <Flex flexDirection="row">
          <Box px="20px">
            <Skeleton
              className="decimal-div"
              w="90px"
              h="60px"
              borderRadius="xl"
            />
          </Box>
          <Box>
            <Skeleton w="60px" h="60px" borderRadius="xl" />
          </Box>
        </Flex>
      </Center>
      <Divider />
      <Box my="30px">
        <UnorderedList
          alignSelf="center"
          spacing={3}
          p="10px"
          listStyleType="none"
          fontSize="lg"
          fontWeight="semibold"
        >
          <ListItem>
            <Center>
              <Skeleton className="table-contents" w="70%" h="40px" />
            </Center>
          </ListItem>
          <ListItem>
            <Center>
              <Skeleton className="table-contents" w="70%" h="40px" />
            </Center>
          </ListItem>
          <ListItem>
            <Center>
              <Skeleton className="table-contents" w="70%" h="40px" />
            </Center>
          </ListItem>
          <ListItem>
            <Center>
              <Skeleton className="table-contents" w="70%" h="40px" />
            </Center>
          </ListItem>
          <ListItem>
            <Center>
              <Skeleton className="table-contents" w="70%" h="40px" />
            </Center>
          </ListItem>
          <ListItem>
            <Center>
              <Skeleton className="table-contents" w="70%" h="40px" />
            </Center>
          </ListItem>
          <ListItem>
            <Center>
              <Skeleton className="table-contents" w="70%" h="40px" />
            </Center>
          </ListItem>
        </UnorderedList>
      </Box>
      <Center mb="50px">
        <Skeleton className="festival-contents" w="60%" h="100px" />
      </Center>
      <Center m="30px auto" w="200px">
        <Flex flexDirection="row" justifyContent="space-between">
          <Box px="20px">
            <Skeleton w="90px" h="45px" borderRadius="md" />
          </Box>
          <Box>
            <Skeleton w="90px" h="45px" borderRadius="md" />
          </Box>
        </Flex>
      </Center>
      <Center>
        <Skeleton className="table-contents" w="80%" h="500px" />
      </Center>
    </SkeletonContentsWrapper>
  );
};

export default SkeletonFestivalContents;

const SkeletonContentsWrapper = styled.div`
  @media only screen and (max-width: 480px) {
    .container {
      position: relative;
      width: 100%;
    }
    .festival-name {
      margin-top: 20px;
      width: 80%;
      font-size: 1.5rem;
    }
    .table-contents {
      width: 100%;
    }
    .festival-contents {
      width: 80%;
      height: 30px;
    }
  }
`;
