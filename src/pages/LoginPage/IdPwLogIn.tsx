import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { IoChevronBackSharp } from "react-icons/io5";

export default function IdPwLogIn() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) setEmailValid(true);
    else setEmailValid(false);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) setPwValid(true);
    else setPwValid(false);
  };

  const handleLogIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email.length === 0 || pw.length === 0) alert("ID/PW를 입력해주세요");
    else {
      try {
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, email, pw);
        console.log(result);
        if (result) navigate("/main");
      } catch (error) {
        alert("ID/PW가 잘못되었습니다");
        console.log("로그인 오류");
      }
    }
  };

  const handleGoback = () => {
    navigate(-1);
  };

  return (
    <div className={styles.section}>
      <div className={styles.loginMain}>
        <section className={styles.loginMainHeader}>
          <div className={styles.goBack}>
            <IoChevronBackSharp onClick={handleGoback} />
          </div>
          <div className={styles.login}>ID/PW를 입력해주세요</div>
        </section>
        <form className={styles.loginPage}>
          <input className={styles.input} name="email" type="email" placeholder="ID (이메일 주소)" value={email} onChange={handleEmail} />
          <div className={styles.errorMessage}>{!emailValid && email.length > 0 && <div>올바른 이메일을 입력해주세요</div>}</div>
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="PW (영문, 숫자, 특수문자 포함 8자 이상)"
            value={pw}
            onChange={handlePassword}
          />
          <div className={styles.errorMessage}>{!pwValid && pw.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>}</div>
          <button className={styles.loginButton} onClick={handleLogIn}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
