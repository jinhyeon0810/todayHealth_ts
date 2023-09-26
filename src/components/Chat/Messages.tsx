import React from "react";
import styles from "./Sidebar.module.css";

export default function Messages({ own, msg }) {
  return (
    <>
      <div className={own ? styles.messagesOwn : styles.messages}>
        <div className={styles.msgContents}>
          <img src="" />
          <p className={own ? styles.messageOwn : styles.message}>{msg.text}</p>
        </div>
        <p className={styles.msgBottom}>1 hour ago</p>
      </div>
    </>
  );
}
