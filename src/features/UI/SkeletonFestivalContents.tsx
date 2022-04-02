import {
  Box,
  Center,
  Divider,
  Flex,
  ListItem,
  UnorderedList,
  Skeleton
} from "@chakra-ui/react";

export default function SkeletonFestivalContents() {
  return (
    <Flex mt="2em" justifyContent="center">
        <Flex w="60%" flexDirection="column" mx="2em">
          <Box>
          </Box>
          <Center my="50px">
            <Skeleton w="50%" h="45px" />
          </Center>
          <Divider />
          <Box my="30px">
            <UnorderedList
              spacing={3}
              p="10px"
              listStyleType="none"
              fontSize="lg"
              fontWeight="semibold"
            >
              <ListItem>
                <Skeleton w="80%" h="25px"/>
              </ListItem>
              <ListItem>
                <Skeleton w="80%" h="25px"/>
              </ListItem>
              <ListItem>
                <Skeleton w="80%" h="25px"/>
              </ListItem>
              <ListItem>
                <Skeleton w="80%" h="25px"/>
              </ListItem>
              <ListItem>
                <Skeleton w="80%" h="25px"/>
              </ListItem>
              <ListItem>
                <Skeleton w="80%" h="25px"/>
              </ListItem>
              <ListItem>
                <Skeleton w="80%" h="25px"/>
              </ListItem>
              
            </UnorderedList>
            {/* <Map /> */}
          </Box>
          <Center mb="50px">
            <Skeleton w="50%" h="100px"/>
          </Center>
          <Center>
            <Skeleton w="90%" h="300px"/>
          </Center>
        </Flex>
        <Box mt="200px" position="fixed" right="5%">
          <Skeleton w="100px" h="100px" borderRadius="xl" />
        </Box>
      </Flex>
  )
}