import ReactDOM from "react-dom";
import App from "./app/App";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WishList from "./features/UI/WishList";
import { store } from "./app/store";
import { ChakraProvider } from "@chakra-ui/react";
import FestivalContents from "./features/UI/FestivalContents";

ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route
            path="/festivalContent/:festivalName"
            element={<FestivalContents />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
    ,
  </ChakraProvider>,
  document.getElementById("root")
);
