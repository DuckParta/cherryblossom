import { Box, Button, Center, Image } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";

function Appbar() {
  return (
    <Flex>
      <Box w='7em'>
        <Image src="../images/logo.png" />
      </Box>
      <Spacer />
      <Center w='7em'>
        <Button colorScheme="teal">로그인</Button>
      </Center>
    </Flex>
  );
}

export default Appbar;
