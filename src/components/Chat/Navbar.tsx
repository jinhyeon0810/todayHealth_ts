import React from "react";
import styles from "./Sidebar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>채팅</span>
      <div className={styles.user}>
        <img />
        <span>나야나</span>
        <button>logout</button>
      </div>
    </div>
  );
}
