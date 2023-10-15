import React from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";

export default function LoginPage(): React.ReactElement {
  const navigate = useNavigate();
  const moveToSignUp = () => {
    navigate("/signup");
  };

  const moveToFind = () => {
    navigate("/find");
  };

  const handleGoogleLogIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("구글로그인");
    const { login } = await import("../../api/firebase");
    login().then((result) => {
      console.log(result);
      if (result) {
        navigate("/main");
      }
    });
  };

  const handleIdPwLogIn = async () => {
    const { logout } = await import("../../api/firebase");
    logout();
    navigate("/login");
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <h1 className={styles.loginMethod}>로그인 방법을 선택해주세요! 😎</h1>
          <button className={styles.googleLoginButton} onClick={handleGoogleLogIn}>
            <div className={styles.googleLoginBtnText}>
              <AiOutlineGoogle />
              Google 로그인
            </div>
          </button>
          <button className={styles.idPwLoginBtn} onClick={handleIdPwLogIn}>
            ID/PW 로그인
          </button>
          <button className={styles.signUp} onClick={moveToSignUp}>
            회원가입
          </button>
          <button className={styles.findInfo} onClick={moveToFind}>
            비밀번호 찾기
          </button>
        </div>
      </section>
    </>
  );
}
