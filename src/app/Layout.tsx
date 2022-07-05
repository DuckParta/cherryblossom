import FestivalsWrapper from "../components/FestivalsWrapper";
import MainLogo from "../components/MainLogo";
import AppBar from "../components/Header/AppBar";
import { Box } from "@chakra-ui/react";

const Layout = () => {
  return (
    <Box>
      <AppBar />
      <MainLogo />
      <FestivalsWrapper />
    </Box>
  );
};

export default Layout;
