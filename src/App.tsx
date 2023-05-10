import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import FindPage from "./pages/FindPage";
import MyPage from "./pages/MyPage";
import SharePage from "./pages/SharePage";
import { useState } from "react";

function App(): React.ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage user={user} setUser={setUser} />} />
        <Route
          path="/login"
          element={<LoginPage user={user} setUser={setUser} />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/find"
          element={<FindPage user={user} setUser={setUser} />}
        />
        <Route path="/my" element={<MyPage />} />
        <Route path="/share" element={<SharePage />} />
      </Routes>
    </Router>
  );
}

export default App;
