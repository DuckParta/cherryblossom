import Container from "../common/Container";
import { ChakraProvider } from "@chakra-ui/react";
import MainHeader from "../common/MainHeader";
import Appbar from "../common/Appbar";
import WishList from "../common/WishList";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        {/*<Appbar />*/}
        {/*<MainHeader />*/}
        {/*<Container />*/}
        <WishList />
      </div>
    </ChakraProvider>
  );
}

export default App;
