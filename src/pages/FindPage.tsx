import React, { useEffect, useState } from "react";
import styles from "./FindPage.module.css";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
interface Props {
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
  user: boolean;
}

export default function FindPage({ user, setUser }: Props): React.ReactElement {
  const [email, setEmail] = useState("");

  const [emailValid, setEmailValid] = useState(false);

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

  const getPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("이메일을 확인해 주세요");
        setEmail("");
      })
      .catch(() => {
        alert("등록되지 않은 이메일입니다");
        setEmail("");
      });
  };

  const moveToLogIn = () => {
    navigate("/login");
  };

  const moveToMain = () => {
    navigate("/");
  };

  useEffect(() => {
    if (emailValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.loginMain}>
          <div className={styles.todayHealth} onClick={moveToMain}>
            오늘의 Health
          </div>
          <div className={styles.find}>
            <div className={styles.login}>비밀번호 찾기</div>
          </div>
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

            <button
              className={styles.loginButton}
              disabled={notAllow}
              onClick={getPassword}
            >
              email 로 비밀번호 받기
            </button>
            <button className={styles.loginButton} onClick={moveToLogIn}>
              로그인 페이지💪
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
