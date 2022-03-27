import Container from "../common/Container";
import { ChakraProvider } from "@chakra-ui/react";
import MainHeader from "../common/MainHeader";
import Appbar from "../common/Appbar";

function App() {
  return (
    <>
      <Appbar />
      <MainHeader />
      <Container />
    </>
  );
}

export default App;
