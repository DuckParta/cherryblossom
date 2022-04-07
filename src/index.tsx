import ReactDOM from "react-dom";
import App from "./app/App";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WishList from "./features/UI/WishList";
import { store } from "./app/store";
import { ChakraProvider } from "@chakra-ui/react";
import FestivalContents from "./features/UI/FestivalContents";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';


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
  </ChakraProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
