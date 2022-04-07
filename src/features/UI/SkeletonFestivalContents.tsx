import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Divider,
  Flex,
  ListItem,
  UnorderedList,
  Skeleton,
  Button,
  Link,
} from "@chakra-ui/react";

export default function SkeletonFestivalContents() {
  return (
    <Flex mt="2em" justifyContent="center">
        <Flex w="80%" flexDirection="column" mx="2em">
          <Box w="30%">
            <Center>
              <Link href="/">
                <Button colorScheme={"whiteAlpha"}>
                  <ArrowBackIcon color={"black"} boxSize={7} />
                </Button>
              </Link>
            </Center>
          </Box>
          <Center my="50px">
            <Skeleton w="50%" h="45px" />
          </Center>
          <Center mb="30px">
            <Box>
              <Skeleton w="160px" h="60px" borderRadius="xl" />
            </Box>
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
                  <Skeleton w="60%" h="25px"/>
                </Center>
              </ListItem>
              <ListItem>
                <Center>
                  <Skeleton w="60%" h="25px"/>
                </Center>
              </ListItem>
              <ListItem>
                <Center>
                  <Skeleton w="60%" h="25px"/>
                </Center>
              </ListItem>
              <ListItem>
                <Center>
                  <Skeleton w="60%" h="25px"/>
                </Center>
              </ListItem>
              <ListItem>
                <Center>
                  <Skeleton w="60%" h="25px"/>
                </Center>
              </ListItem>
              <ListItem>
                <Center>
                  <Skeleton w="60%" h="25px"/>
                </Center>
              </ListItem>
              <ListItem>
                <Center>
                  <Skeleton w="60%" h="25px"/>
                </Center>
              </ListItem>
            </UnorderedList>
          </Box>
          <Center mb="50px">
            <Skeleton w="50%" h="100px"/>
          </Center>
          <Center>
            <Skeleton w="90%" h="300px"/>
          </Center>
        </Flex>
      </Flex>
  )
}