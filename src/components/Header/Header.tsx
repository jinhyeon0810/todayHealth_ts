import React, { useEffect } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { onUserStateChange } from "../../api/firebase";
import { useDispatch } from "react-redux";
import { changeUser } from "../../utils/Store";
import { AiOutlineUnorderedList } from "react-icons/ai";

export default function Header(): React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMainPage = () => {
    navigate("/main");
  };
  useEffect(() => {
    if (changeUser) {
      onUserStateChange((user: { uid: string }) => {
        dispatch(changeUser(user?.uid));
      });
    }
  }, [changeUser]);

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

  return (
    <>
      <header className={styles.nav}>
        <div className={styles.navTopic} onClick={handleMainPage}>
          오늘의 Health
        </div>
        <div className={styles.navList}>
          <AiOutlineUnorderedList />
        </div>
      </header>
    </>
  );
}
