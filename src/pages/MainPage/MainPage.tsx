import React, { useState, useEffect } from "react";
import styles from "./MainPage.module.css";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

import Texts from "../../components/Texts/Texts";
import Footer from "../../components/Footer/Footer";
import Timer from "../../components/Timer/Timer";
import Header from "../../components/Header";
import db from "../../api/firebase";
import { useRecoilState } from "recoil";
import { textState } from "../../utils/Atom";
import dateString from "../../utils/Date";

interface Props {
  setUser?: React.Dispatch<React.SetStateAction<{ uid: string }>>;
  user?: { uid: string };
}

export default function MainPage({ user, setUser }: Props): React.ReactElement {
  const [text, setText] = useState("");
  const [texts, setTexts] = useRecoilState(textState);
  const [show, setShow] = useState(false);
  console.log(texts);
  //서버에서 데이터 받아와서 texts 에 배열로 저장
  useEffect(() => {
    const q = query(collection(db, "details"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const textArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTexts(
        textArr.filter((t) => {
          return t.creatorId === user.uid;
        })
      );
    });
  }, [setTexts, user.uid]);

  // 메인페이지 기록 버튼 (서버에 데이터 저장)
  const onSubmit = async (e) => {
    e.preventDefault();
    if (text.length > 0) {
      await addDoc(collection(db, "details"), {
        text,
        createdAt: dateString,
        creatorId: user?.uid,
      });
    }
    setText("");
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onClickTimer = () => {
    if (user) {
      setShow(!show);
    } else {
      alert("로그인 하셔야 이용가능합니다");
    }
  };
  return (
    <>
      <Header user={user} setUser={setUser} />

      <div className={styles.wrapper}>
        {/* <Snow /> */}
        <div className={styles.title}>
          <h1>오늘의 Health</h1>
          <form onSubmit={onSubmit} className={styles.form}>
            <input
              className={styles.width}
              type="text"
              placeholder="나의 운동을 기록해보아요 💪 : (예시) 벤치프레스 30kg  4sets  10reps "
              maxLength={120}
              value={text}
              onChange={onChange}
            />
            {user && <input type="submit" value="기록" className={styles.input} disabled={false} />}

            {!user && <input type="submit" value="로그인 필수👌" className={styles.input} disabled={true} />}
          </form>
        </div>
        <div className={styles.textList}>
          {texts.map((text) => {
            return text.creatorId === user?.uid && <Texts textObj={text} key={text.id} user={user} isOnwer={text.creatorId === user?.uid} />;
          })}
        </div>
        {!show && (
          <button onClick={onClickTimer} className={styles.timerButton}>
            타이머 시작! ⏰ <br />
            <span style={{ fontSize: "9px" }}>운동 시간을 확인해보아요 ⏳</span>
          </button>
        )}
        {show && <Timer />}

        <Footer />
      </div>
    </>
  );
}
