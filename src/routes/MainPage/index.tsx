import FestivalsWrapper from "./FestivalsWrapper";
import MainLogo from "./MainLogo";
import Header from "../../components/Header";
import { Box } from "@chakra-ui/react";

const MainPage = () => {
  return (
    <Box>
      <Header />
      <MainLogo />
      <FestivalsWrapper />
    </Box>
  );
};

export default MainPage;
