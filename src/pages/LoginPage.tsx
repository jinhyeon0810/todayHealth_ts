import React, { useEffect } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { login, signInEmailPassword } from "../api/firebase";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
  user: boolean;
}

export default function LoginPage({
  user,
  setUser,
}: Props): React.ReactElement {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  const handleGoogleLogIn = () => {
    console.log("구글로그인");
    login().then(setUser);
    navigate("/");
  };

  const handleLogIn = async () => {
    console.log("로그인");
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, email, pw);
    console.log(result);
    navigate("/");
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const moveToSignUp = () => {
    navigate("/signup");
  };
  const moveToMain = () => {
    navigate("/");
  };

  const moveToFind = () => {
    navigate("/find");
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.todayHealth} onClick={moveToMain}>
        오늘의 Health
      </h1>
      <div className={styles.loginMain}>
        <div className={styles.login}>LOG IN</div>
        <div className={styles.loginPage}>
          <input
            className={styles.input}
            type="email"
            placeholder="ID (이메일 주소)"
            value={email}
            onChange={handleEmail}
          />
          <div className={styles.errorMessage}>
            {!emailValid && email.length > 0 && (
              <div>올바른 이메일을 입력해주세요</div>
            )}
          </div>
          <input
            className={styles.input}
            type="password"
            placeholder="PW (영문, 숫자, 특수문자 포함 8자 이상)"
            style={{ marginTop: "15px" }}
            value={pw}
            onChange={handlePassword}
          />
          <div className={styles.errorMessage}>
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
            )}
          </div>
          <button
            className={styles.loginButton}
            disabled={notAllow}
            onClick={handleLogIn}
          >
            로그인
          </button>

          <button
            className={styles.googleLoginButton}
            onClick={handleGoogleLogIn}
          >
            Google 로그인
          </button>
        </div>
      </div>
      <div className={styles.loginBottom}>
        <button className={styles.signUp} onClick={moveToSignUp}>
          회원가입
        </button>
        <button className={styles.findInfo} onClick={moveToFind}>
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
}
