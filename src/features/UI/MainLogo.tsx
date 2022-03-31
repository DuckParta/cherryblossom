import { Center, Box, Text, Heading } from "@chakra-ui/react";

function MainLogo() {
  return (
    <Box marginY="10%" justifyContent="center">
      <Center>
        <Heading mb="5%" textAlign="center" fontSize="7xl" fontFamily="Courgette">
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
