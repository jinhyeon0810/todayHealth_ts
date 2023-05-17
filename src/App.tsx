import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import FindPage from "./pages/FindPage";
import MyPage from "./pages/MyPage";
import SharePage from "./pages/SharePage";
import { useState } from "react";
import Board from "./pages/board";
import BoardDetail from "./pages/BoardDetail";

type User = { uid: string };

function App(): React.ReactElement {
  const [user, setUser] = useState<User[]>([]);
  const [imageList, setImageList] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage user={user} setUser={setUser} />} />
        <Route
          path="/login"
          element={<LoginPage user={user} setUser={setUser} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage user={user} setUser={setUser} />}
        />
        <Route
          path="/find"
          element={<FindPage user={user} setUser={setUser} />}
        />
        <Route path="/my" element={<MyPage user={user} setUser={setUser} />} />
        <Route
          path="/share"
          element={
            <SharePage
              user={user}
              setUser={setUser}
              imageList={imageList}
              setImageList={setImageList}
            />
          }
        />
        <Route
          path="/board"
          element={
            <Board
              user={user}
              setUser={setUser}
              imageList={imageList}
              setImageList={setImageList}
            />
          }
        />
        <Route
          path="/:id"
          element={
            <BoardDetail
              user={user}
              setUser={setUser}
              imageList={imageList}
              setImageList={setImageList}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
