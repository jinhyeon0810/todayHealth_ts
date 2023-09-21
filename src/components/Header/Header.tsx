import React, { useState } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineUnorderedList } from "react-icons/ai";

export default function Header(): React.ReactElement {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const handleMainPage = () => {
    navigate("/main");
  };

  // const clickLogIn = () => {
  //   navigate("/");
  // };

  // const clickLogOut = () => {
  //   const conFirm = confirm("정말 로그아웃 하시겠습니까?");
  //   if (conFirm) {
  //     logout();
  //     navigate("/");
  //   }
  // };

  // const moveToSignUpPage = () => {
  //   navigate("/signup");
  // };
  const handleLocationPage = () => {
    navigate("/location");
  };
  return (
    <>
      <header className={styles.nav}>
        <div className={styles.navTopic} onClick={handleMainPage}>
          오늘의 Health
        </div>
        <div className={styles.navList} onClick={() => setModalOpen((prev) => !prev)}>
          <AiOutlineUnorderedList />
        </div>
      </header>

      <section className={styles.modal} style={{ top: modalOpen ? "50px" : "-70px" }}>
        <ul className={styles.modalLists}>
          <li onClick={handleLocationPage}>주변 헬스장 찾기</li>
        </ul>
      </section>
    </>
  );
}
