import React from "react";
import styles from "./Sidebar.module.css";
import { setReceiverId } from "../../utils/Store";
import { useDispatch } from "react-redux";

export default function Chats(props) {
  const { setIsChatOpen } = props;
  const dispatch = useDispatch();
  const handleChatRoom = () => {
    dispatch(setReceiverId("테스트1"));
    setIsChatOpen(true);
  };
  return (
    <div className={styles.chats}>
      <div className={styles.userChat}>
        <img />
        <div className={styles.userChatInfo}>
          <span>테스트</span>
          <p>하이</p>
        </div>
      </div>
      <div className={styles.userChat} onClick={handleChatRoom}>
        <img />
        <div className={styles.userChatInfo}>
          <span>테스트1</span>
        </div>
      </div>
    </div>
  );
}
