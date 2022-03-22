import { Box, Button, Center, Image } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

function Appbar() {
  return (
    <Flex justifyContent="center">
      <Box w="55em">
        <Image htmlWidth="100px" src="../images/logo.png" />
      </Box>
      <Center w="7em">
        <Button colorScheme="teal">로그인</Button>
      </Center>
    </Flex>
  );
}

export default Appbar;
