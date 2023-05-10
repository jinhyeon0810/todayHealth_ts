import { React, useEffect, useState } from "react";
import styles from "./SignUpPage.module.css";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpPage(): React.ReactElement {
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [rePw, setRePw] = useState("");
  const [rePwValid, setRePwValid] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

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

  const handleRePassword = (e) => {
    setRePw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setRePwValid(true);
    } else {
      setRePwValid(false);
    }
  };

  useEffect(() => {
    if (pw === rePw && pw.length > 7 && rePw.length > 7) {
      setNotAllow(false);
    } else if (pw !== rePw) {
      setNotAllow(true);
    }
    console.log(pw);
    console.log(rePw);
  }, [pw, rePw]);

  const handleSignUp = async () => {
    const auth = getAuth();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pw);
      console.log(result);
      navigate("/");
    } catch (error) {
      setError(error.message);
      if (1) {
        alert(error);
      }
    }
  };

  const navigate = useNavigate();
  const moveToMain = () => {
    navigate("/");
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.loginMain}>
          <div className={styles.todayHealth} onClick={moveToMain}>
            오늘의 Health
          </div>
          <div className={styles.login}>회원가입 드루와~</div>
          <p className={styles.title}>성장하는 나를 기록하세요 💪</p>
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
            <input
              className={styles.input}
              type="password"
              placeholder="비밀번호 확인"
              style={{ marginTop: "15px" }}
              value={rePw}
              onChange={handleRePassword}
            />
            <div className={styles.errorMessage}>
              {!rePwValid && rePw.length > 0 && (
                <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
              )}
              {pw === rePw && pw.length > 7 && <div>비밀번호가 일치합니다</div>}
              {pw !== rePw && rePw.length > 0 && <div>비밀번호가 다릅니다</div>}
            </div>

            <button
              className={styles.googleLoginButton}
              style={{ marginTop: "10px" }}
              onClick={handleSignUp}
              disabled={notAllow}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
