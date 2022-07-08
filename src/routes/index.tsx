import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import FestivalContents from "./FestivalContents";
import WishList from "./WishList";
import MainPage from "./MainPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/:fstvlId" element={<FestivalContents />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
