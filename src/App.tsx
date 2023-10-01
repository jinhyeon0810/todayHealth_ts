import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import { lazy, Suspense } from "react";
import IsLoading from "./components/IsLoading/IsLoading";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const Location = lazy(() => import("./pages/Location/Location"));
const IdPwLogIn = lazy(() => import("./pages/LoginPage/IdPwLogIn"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const RecordContainer = lazy(() => import("./pages/Record/RecordContainer"));
const AddExerciseContainer = lazy(() => import("./pages/AddExercise/AddExerciseContainer"));
const FindPage = lazy(() => import("./pages/FindPage/FindPage"));
const MyPage = lazy(() => import("./pages/MyPage/MyPage"));
const SharePage = lazy(() => import("./pages/SharePage/SharePage"));
const Board = lazy(() => import("./pages/Board/Board"));
const BoardDetail = lazy(() => import("./pages/BoardDetail/BoardDetail"));
const SortContainer = lazy(() => import("./pages/Sort/SortContainer"));
const ChatRoomContainer = lazy(() => import("./pages/Chat/ChatRoom/ChatRoomContainer"));

function App(): React.ReactElement {
  return (
    <Router>
      <Suspense fallback={<IsLoading />}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/location" element={<Location />} />
          <Route path="/login" element={<IdPwLogIn />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/record" element={<RecordContainer />} />
          <Route path="/addExercise" element={<AddExerciseContainer />} />
          <Route path="/find" element={<FindPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/share" element={<SharePage />} />
          <Route path="/board" element={<Board />} />
          <Route path="/:id" element={<BoardDetail />} />
          <Route path="/sort" element={<SortContainer />} />
          <Route path="/chatroom" element={<ChatRoomContainer />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
