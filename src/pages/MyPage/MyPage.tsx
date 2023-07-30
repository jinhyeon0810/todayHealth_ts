import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { GiMuscleUp } from "react-icons/gi";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./MyPage.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../../api/firebase";
import TextComponent from "../../components/MyPage/TextComponent";

type User = { uid: string };

interface Props {
  setUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
  user?: { uid: string };
}

interface textArrProps {
  id: string;
  text: string;
  createdAt: string;
  creatorId: string;
}
[];

export default function MyPage({ user, setUser }: Props): React.ReactElement {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [texts, setTexts] = useState<textArrProps[]>([]);
  console.log(texts);

  const year = startDate?.getFullYear();
  const month = String((startDate as Date)?.getMonth() + 1).padStart(2, "0");
  const day = String(startDate?.getDate()).padStart(2, "0");

  const pickerDate = `${year}-${month}-${day}`;
  // console.log(pickerDate);
  // console.log(startDate);
  // console.log(texts);
  //서버에서 운동기록 데이터 가져오기
  useEffect(() => {
    const q = query(collection(db, "details"), orderBy("timeStamp", "desc"));
    onSnapshot(q, (snapshot) => {
      const textArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as textArrProps[];
      console.log(textArr);
      setTexts(
        textArr.filter((t: textArrProps) => {
          return t.creatorId === user?.uid && pickerDate === t.createdAt;
        })
      );
    });
  }, [setTexts, user?.uid, startDate, pickerDate]);
  return (
    <>
      <div className={styles.wrapper}>
        <Header user={user} setUser={setUser} />
        <article className={styles.layout}>
          <div className={styles.datePicker}>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} inline className={styles.datePicker} maxDate={new Date()} />
          </div>
          <div className={styles.body}>
            <h1 className={styles.title}>
              {" "}
              진행한 운동 <GiMuscleUp /> / <span className={styles.exerciseDay}>{pickerDate}</span>
            </h1>
            <ul className={styles.desc}>
              {texts?.length > 0 ? (
                texts?.map((text) => {
                  return (
                    text.creatorId === user?.uid &&
                    pickerDate === text.createdAt && (
                      <div className={styles.recordComponent}>
                        <TextComponent text={text} />
                      </div>
                    )
                  );
                })
              ) : (
                <div className={styles.noDesc}> 완료한 운동이 없습니다.😓 </div>
              )}
            </ul>
          </div>
        </article>
        <div className={styles.footerArea}>
          <Footer user={user} />
        </div>
      </div>
    </>
  );
}
