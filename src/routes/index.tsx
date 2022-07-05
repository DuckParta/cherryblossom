import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../app/Layout";
import FestivalContents from "../components/FestivalContents";
import WishList from "../components/WishList";

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path=":fstvlId" element={<FestivalContents />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
