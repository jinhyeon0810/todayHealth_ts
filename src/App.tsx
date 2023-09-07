import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App(): React.ReactElement {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/location" element={<Location />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/addProfile" element={<AddProfile />} />
        <Route path="/find" element={<FindPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/board" element={<Board />} />
        <Route path="/:id" element={<BoardDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
