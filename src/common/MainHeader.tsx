import { Center, Flex, Image, Text } from "@chakra-ui/react";

function MainHeader() {
  return (
    <Flex mt='2em' justifyContent="center">
      <Center w="25em">
        <Image htmlWidth="250px" src="../images/mainImage.png" />
      </Center>
      <Center mb="2em" w="20em">
        <Text fontSize="2xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
      </Center>
    </Flex>
  );
}

export default MainHeader;
