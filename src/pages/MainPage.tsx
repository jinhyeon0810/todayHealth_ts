import React, { useState, useEffect } from "react";
import styles from "./MainPage.module.css";
import Header from "../components/Header";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../api/firebase";
import Texts from "../components/Texts";
import Footer from "../components/Footer";
import Timer from "../components/Timer";
import Snow from "../components/Snow";

interface Props {
  setUser?: React.Dispatch<React.SetStateAction<{ uid: string }>>;
  user?: { uid: string };
}

export default function MainPage({ user, setUser }: Props): React.ReactElement {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "details"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const textArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTexts(textArr);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (text.length > 0) {
      await addDoc(collection(db, "details"), {
        text,
        createdAt: Date.now(),
        creatorId: user.uid,
      });
    }
    setText("");
  };

  const onChange = (e) => {
    setText(e.target.value);
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
            {user && (
              <input
                type="submit"
                value="기록"
                className={styles.input}
                disabled={false}
              />
            )}

            {!user && (
              <input
                type="submit"
                value="로그인 필수👌"
                className={styles.input}
                disabled={true}
              />
            )}
          </form>
        </div>
        <div className={styles.textList}>
          {texts.map((text) => {
            return (
              <Texts
                textObj={text}
                key={text.id}
                user={user}
                isOnwer={text.creatorId === user?.uid}
              />
            );
          })}
        </div>
        {!show && (
          <button
            onClick={() => setShow(!show)}
            className={styles.timerButton}
            disabled={!user}
          >
            타이머 시작!! ⏰ <br />
            <span style={{ fontSize: "9px" }}>운동 시간을 확인해보아요 ⏳</span>
          </button>
        )}
        {show && <Timer />}

        <Footer />
      </div>
    </>
  );
}
