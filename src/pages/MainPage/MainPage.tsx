import React, { useState, useEffect, useRef } from "react";
import styles from "./MainPage.module.css";
import { collection, addDoc, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import DatePicker from "react-datepicker";
import Texts from "../../components/Texts/Texts";
import Footer from "../../components/Footer/Footer";
import Timer from "../../components/Timer/Timer";
import Header from "../../components/Header/Header";
import db from "../../api/firebase";
import dateString from "../../utils/Date";

interface Props {
  setUser?: React.Dispatch<React.SetStateAction<{ uid: string }>>;
  user?: { uid: string };
}

export default function MainPage({ user, setUser }: Props): React.ReactElement {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);
  const [show, setShow] = useState(false);
  const textarea = useRef();
  const [oldRecord, setOldRecord] = useState([]);
  const timeStamp = Timestamp.now();
  console.log(texts);
  console.log(dateString);

  const dateObject = new Date(dateString);
  dateObject.setDate(dateObject.getDate() - 1);
  const oldDateString = dateObject.toISOString().split("T")[0];
  console.log(oldDateString);

  //Date Picker
  // 하루 전날 계산하는 공식 ( 기본값이 하루 전날로 세팅)
  const currentDate = new Date();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const oneDayBefore = new Date(currentDate.getTime() - oneDayInMilliseconds);

  const [startDate, setStartDate] = useState(oneDayBefore);

  //startDate 값 형식 바꾸기
  const year = startDate.getFullYear();
  const month = String(startDate.getMonth() + 1).padStart(2, "0");
  const day = String(startDate.getDate()).padStart(2, "0");

  const pickerDate = `${year}-${month}-${day}`;
  console.log(pickerDate);
  console.log(oldRecord);

  //서버에서 데이터 받아와서 texts 에 배열로 저장
  useEffect(() => {
    const q = query(collection(db, "details"), orderBy("timeStamp", "desc"));
    onSnapshot(q, (snapshot) => {
      const textArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(textArr);
      setTexts(
        textArr.filter((t) => {
          return t.creatorId === user.uid && t.createdAt === dateString;
        })
      );
      setOldRecord(
        textArr.filter((t) => {
          return t.creatorId === user.uid && t.createdAt === pickerDate;
        })
      );
    });
  }, [setTexts, user.uid, setOldRecord, pickerDate]);
  console.log(oldRecord);

  // 메인페이지 기록 버튼 (서버에 데이터 저장)
  const onSubmit = async (e) => {
    e.preventDefault();
    if (text.length > 0) {
      await addDoc(collection(db, "details"), {
        text,
        createdAt: dateString,
        creatorId: user?.uid,
        timeStamp,
      });
    }
    setText("");
  };

  const onChange = (e) => {
    setText(e.target.value);
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
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
      <div className={styles.wrapper}>
        <Header user={user} setUser={setUser} />
        <article className={styles.mainArticle}>
          {/* <Snow /> */}

          <div className={styles.title}>
            <h1>오늘의 Health</h1>
            <form onSubmit={onSubmit} className={styles.form}>
              <textarea
                ref={textarea}
                type="text"
                className={styles.width}
                rows={1}
                cols={30}
                name="text"
                placeholder="나의 운동을 기록해보아요 💪 : (예시) 벤치프레스 30kg  4sets  10reps "
                maxLength={1200}
                value={text}
                onChange={onChange}
                wrap="on"
              />
              {user && (
                <button className={styles.input} disabled={false}>
                  기록
                </button>
              )}

              {!user && (
                <button className={styles.input} disabled={false}>
                  로그인 필수 👌
                </button>
              )}
            </form>
          </div>
          <section className={styles.textArticle}>
            {oldRecord.length > 0 ? (
              <div className={styles.textList}>
                <section className={styles.datePickerSection}>
                  <div className={styles.textTitle}>지난 기록</div>
                  <div className={styles.datePicker}>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} maxDate={oneDayBefore} />
                  </div>
                </section>
                {oldRecord.map((record) => {
                  return (
                    record.creatorId === user?.uid &&
                    record.createdAt === pickerDate && (
                      <div className={styles.textArea}>
                        <Texts textObj={record} key={record.id} user={user} isOnwer={record.creatorId === user?.uid} />
                      </div>
                    )
                  );
                })}
              </div>
            ) : (
              <>
                <div className={styles.textList}>
                  <section className={styles.datePickerSection}>
                    <div className={styles.textTitle}>지난 기록</div>
                    <div className={styles.datePicker}>
                      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} maxDate={oneDayBefore} />
                    </div>
                  </section>
                  <div className={styles.textArea}>
                    <Texts textObj={{ text: "휴식 하신 날입니다! 😎" }} user={user} isOnwer={true} />
                  </div>
                </div>
              </>
            )}

            {texts.length > 0 && (
              <div className={styles.textList}>
                <div className={styles.textTitle}>오늘의 기록</div>
                {texts.map((text) => {
                  return (
                    text.creatorId === user?.uid && (
                      <>
                        <Texts textObj={text} key={text.id} user={user} isOnwer={text.creatorId === user?.uid} />
                      </>
                    )
                  );
                })}
              </div>
            )}
          </section>

          {!show && (
            <button onClick={onClickTimer} className={styles.timerButton}>
              타이머 시작! ⏰ <br />
              <span style={{ fontSize: "9px" }}>운동 시간을 확인해보아요 ⏳</span>
            </button>
          )}
          {show && <Timer />}
        </article>
        <Footer />
      </div>
    </>
  );
}
