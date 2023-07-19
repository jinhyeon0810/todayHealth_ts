import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./MyPage.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import { useRecoilState } from "recoil";
import { textState } from "../../utils/Atom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../../api/firebase";
import Texts from "../../components/Texts/Texts";
import TextComponent from "../../components/MyPage/TextComponent";
import dateString from "../../utils/Date";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<{ uid: string }>>;
  user?: { uid: string };
}

export default function MyPage({ user, setUser }: Props): React.ReactElement {
  const [startDate, setStartDate] = useState(new Date());
  const [texts, setTexts] = useRecoilState(textState);
  console.log(texts);

  const pickerDate = startDate.toISOString().split("T")[0];
  console.log(pickerDate);

  //서버에서 운동기록 데이터 가져오기
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
  return (
    <div className={styles.wrapper}>
      <Header user={user} setUser={setUser} />
      <div className={styles.datePicker}>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} inline className={styles.datePicker} />
      </div>
      <div className={styles.body}>
        <h1 className={styles.title}> 진행한 운동</h1>

        {texts.length > 0 ? (
          texts.map((text) => {
            return (
              text.creatorId === user?.uid &&
              pickerDate === text.createdAt && (
                <div className={styles.desc}>
                  <TextComponent text={text} />
                </div>
              )
            );
          })
        ) : (
          <div className={styles.desc}>완료한 운동이 없어요...😥</div>
        )}
      </div>
      <div className={styles.footerArea}>
        <Footer />
      </div>
    </div>
  );
}
