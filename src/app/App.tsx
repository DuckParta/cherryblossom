import FestivalsWrapper from "../features/InfiniteScroll/FestivalsWrapper";
import MainLogo from "../features/UI/MainLogo";
import AppBar from "../features/Header/AppBar";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box width="100%">
      <AppBar />
      <MainLogo />
      <FestivalsWrapper />
    </Box>
  );
}

export default App;
