import { Box, Center, Flex, Heading, Skeleton } from "@chakra-ui/react";

const SkeletonFestivalItem = () => {
  return (
    <Box
      margin="15px"
      padding="30px"
      w="300px"
      h="300px"
      boxShadow="0 5px 25px rgb(0 0 0 / 15%)"
      bg="white"
      rounded="3xl"
      textAlign="center"
    >
      <Flex flexFlow="column nowrap" h="100%">
        <Box h="70%">
          <Skeleton h="30px" mt="50px" />
        </Box>
        <Center h="20%">
          <Skeleton h="30px">
            <Heading
              padding="5px 10px"
              margin="10px"
              borderRadius="lg"
              bgColor="gray.100"
              fontSize="lg"
            />
          </Skeleton>
        </Center>
        <Skeleton h="30px" my="5px" />
        <Skeleton h="30px" />
      </Flex>
    </Box>
  );
};

export default SkeletonFestivalItem;
