import React from "react";
import styles from "./Sidebar.module.css";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { getAuth } from "firebase/auth";

export default function Sidebar({ setIsChatOpen }) {
  const auth = getAuth();

  // 인증된 사용자 목록 가져오기

  return (
    <article className={styles.wrapper}>
      <Navbar />
      <Search />
      <Chats setIsChatOpen={setIsChatOpen} />
    </article>
  );
}
