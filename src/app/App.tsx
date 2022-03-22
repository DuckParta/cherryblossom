import Container from "../common/Container";
import { ChakraProvider } from "@chakra-ui/react";
import Appbar from "../common/Appbar";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Appbar />
        <Container />
      </div>
    </ChakraProvider>
  );
}

export default App;
