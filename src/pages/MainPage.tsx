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

interface Props {
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
  user: boolean;
}

export default function MainPage({ user, setUser }: Props): React.ReactElement {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "details"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const textArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(textArr);
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

  console.log(user);
  console.log(texts);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <div className={styles.wrapper}>
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
                // isOnwer={text.creatorId === user.uid}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
