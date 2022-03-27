import ReactDOM from "react-dom";
import App from "./app/App";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WishList from "./common/WishList";
import { store } from "./app/store";
import { ChakraProvider } from "@chakra-ui/react";
import FestivalContents from "./common/FestivalContents";

ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route
            path="/festivalContent"
            element={<FestivalContents />}
          />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
    ,
  </ChakraProvider>,
  document.getElementById("root")
);
