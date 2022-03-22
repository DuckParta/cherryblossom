import Container from "../common/Container";
import { ChakraProvider } from "@chakra-ui/react";
import MainHeader from "../common/MainHeader";
import Appbar from "../common/Appbar";
import FestivalContents from "../common/FestivalContents";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <FestivalContents />
      </div>
    </ChakraProvider>
  );
}

export default App;
