import React, { useEffect } from "react";
import styles from "./Sidebar.module.css";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { onUserStateChange } from "../../api/firebase";
import { RootState, changeUser } from "../../utils/Store";

export default function Sidebar(props) {
  const { setIsChatOpen, members } = props;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (changeUser) {
      onUserStateChange((user: { uid: string; displayName: string; photoURL: string }) => {
        dispatch(changeUser({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }));
      });
    }
  }, [changeUser]);

  const auth = getAuth();
  // 인증된 사용자 목록 가져오기

  return (
    <article className={styles.wrapper}>
      <Navbar user={user} />
      <Search />
      <Chats setIsChatOpen={setIsChatOpen} user={user} members={members} />
    </article>
  );
}
