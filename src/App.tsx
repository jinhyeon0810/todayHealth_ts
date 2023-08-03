import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import FindPage from "./pages/FindPage/FindPage";
import MyPage from "./pages/MyPage/MyPage";
import SharePage from "./pages/SharePage/SharePage";
import Location from "./pages/Location/Location";
import Board from "./pages/Board/Board";
import BoardDetail from "./pages/BoardDetail/BoardDetail";
import AddProfile from "./pages/Profile/AddProfile";

type User = { uid: string };

function App(): React.ReactElement {
  const [user, setUser] = useState<User>();
  const [imageList, setImageList] = useState<string | undefined>();

  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage user={user} setUser={setUser} />} />
        <Route path="/location" element={<Location />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/addProfile" element={<AddProfile />} />
        <Route path="/find" element={<FindPage />} />
        <Route path="/my" element={<MyPage user={user} setUser={setUser} />} />
        <Route path="/share" element={<SharePage user={user} setUser={setUser} />} />
        <Route path="/board" element={<Board user={user} imageList={imageList} setImageList={setImageList} />} />
        <Route path="/:id" element={<BoardDetail user={user} setImageList={setImageList} />} />
      </Routes>
    </Router>
  );
}

export default App;
