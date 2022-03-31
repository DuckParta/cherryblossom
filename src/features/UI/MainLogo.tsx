import { Center, Box, Text, Heading } from "@chakra-ui/react";

function MainLogo() {
  return (
    <Box marginY="100px" justifyContent="center">
      <Center>
        <Heading fontSize="7xl" fontFamily="Courgette" mb="50px">
          Cherry Blossom
        </Heading>
      </Center>
      <Center>
        <Text fontSize="2xl"></Text>
      </Center>
    </Box>
  );
}

export default MainLogo;
