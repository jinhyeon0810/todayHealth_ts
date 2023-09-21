import React, { useEffect, useState } from "react";
import styles from "./SignUpPage.module.css";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, AuthError, updateProfile } from "firebase/auth";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { profileImageUpload } from "../../api/firebase";
import { v4 } from "uuid";

export default function SignUpPage(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [nickName, setNickName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [addFile, setAddFile] = useState(true);
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [rePw, setRePw] = useState("");
  const [rePwValid, setRePwValid] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const handleRePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePw(e.target.value);
    const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
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
  }, [pw, rePw]);
  const handleSignUp = async () => {
    if (nickName.trim().length === 0) {
      alert("닉네임을 입력해주세요");
      return;
    }
    const auth = getAuth();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, pw);
      const photoURL = photo;
      console.log(photoURL);
      await updateProfile(user, {
        displayName: nickName,
        photoURL,
      });
      navigate("/main");
      return user;
    } catch (error) {
      console.log((error as AuthError).message);
      // eslint-disable-next-line no-constant-condition
      if (1) {
        alert(error);
      }
      if ((error as AuthError).code === "auth/email-already-in-use") {
        alert("이미 사용 중인 이메일입니다.");
      } else {
        alert("회원 가입 중 오류가 발생했습니다.");
      }
    }
  };

  const navigate = useNavigate();

  const moveToBackPage = () => {
    navigate(-1);
  };
  const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files && e.target.files[0]);
    setAddFile(false);
  };
  useEffect(() => {
    if (file) {
      profileImageUpload(file, v4, setPhoto);
    }
  }, [file]);
  console.log(file);
  console.log(photo);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.loginMain}>
          <div className={styles.header}>
            <div className={styles.goBack} onClick={moveToBackPage}>
              <IoChevronBackSharp />
            </div>
            <div className={styles.login}>회원가입 드루와~</div>
          </div>

          <p className={styles.title} onClick={() => navigate("/addProfile")}>
            성장하는 나를 기록하세요 💪
          </p>
          <div className={styles.loginPage}>
            <div className={styles.profileImg}>
              {addFile && (
                <>
                  <div className={styles.imgContainer}>
                    <FaUserCircle className={styles.imgIcon} />
                    <input className={styles.file} type="file" accept="image/*" onChange={handleImgChange} />
                  </div>
                </>
              )}
              {file && <img className={styles.showingImg} src={URL.createObjectURL(file)} alt="local file" />}
            </div>
            <input className={styles.input} type="email" placeholder="ID (이메일 주소)" value={email} onChange={handleEmail} />
            <div className={styles.errorMessage}>{!emailValid && email.length > 0 && <div>올바른 이메일을 입력해주세요</div>}</div>
            <input
              className={styles.input}
              type="password"
              placeholder="PW (영문, 숫자, 특수문자 포함 8자 이상)"
              value={pw}
              onChange={handlePassword}
            />
            <div className={styles.errorMessage}>{!pwValid && pw.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>}</div>
            <input className={styles.input} type="password" placeholder="비밀번호 확인" value={rePw} onChange={handleRePassword} />
            <div className={styles.errorMessage}>
              {!rePwValid && rePw.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>}
              {pw === rePw && pw.length > 7 && <div>비밀번호가 일치합니다</div>}
              {pw !== rePw && rePw.length > 0 && <div>비밀번호가 다릅니다</div>}
            </div>
            <input className={styles.input} type="nickname" placeholder="닉네임" value={nickName} onChange={handleNickName} />

            <button className={styles.loginButton} onClick={handleSignUp} disabled={notAllow}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
