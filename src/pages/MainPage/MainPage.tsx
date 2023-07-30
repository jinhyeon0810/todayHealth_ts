import React, { useState, useEffect, useRef } from "react";
import styles from "./MainPage.module.css";
import { collection, addDoc, onSnapshot, orderBy, query, Timestamp, deleteDoc, doc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import Texts from "../../components/Texts/Texts";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import db from "../../api/firebase";
import dateString from "../../utils/Date";
import { BsFillTrashFill } from "react-icons/bs";
import { textIdState } from "../../utils/Atom";
import { useRecoilValue } from "recoil";

type User = { uid: string };

interface Props {
  setUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
  user?: { uid: string };
}

interface TextArrProps {
  id: string;
  text: string;
  createdAt: string;
  creatorId: string;
  postId: string;
  timeStamp: string;
}
[];

export default function MainPage({ user, setUser }: Props): React.ReactElement {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState<TextArrProps[]>([]);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [oldRecord, setOldRecord] = useState<TextArrProps[]>([]);
  const textId = useRecoilValue(textIdState);
  const [addModal, setAddModal] = useState(false);
  const timeStamp = Timestamp.now();

  //Date Picker
  // 하루 전날 계산하는 공식 ( 기본값이 하루 전날로 세팅)
  const currentDate = new Date();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const oneDayBefore = new Date(currentDate.getTime() - oneDayInMilliseconds);

  const [startDate, setStartDate] = useState<Date | null>(oneDayBefore);

  //startDate 값 형식 바꾸기
  const year = startDate?.getFullYear();
  const month = String((startDate as Date).getMonth() + 1).padStart(2, "0");
  const day = String(startDate?.getDate()).padStart(2, "0");

  const pickerDate = `${year}-${month}-${day}`;

  //서버에서 데이터 받아와서 texts 에 배열로 저장
  useEffect(() => {
    const q = query(collection(db, "details"), orderBy("timeStamp", "desc"));
    onSnapshot(q, (snapshot) => {
      const textArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TextArrProps[];
      setTexts(
        textArr.filter((t: TextArrProps) => {
          return t.creatorId === user?.uid && t.createdAt === dateString;
        })
      );
      setOldRecord(
        textArr.filter((t: TextArrProps) => {
          return t.creatorId === user?.uid && t.createdAt === pickerDate;
        })
      );
    });
  }, [setTexts, user?.uid, setOldRecord, pickerDate]);

  // 메인페이지 기록 버튼 (서버에 데이터 저장)
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textarea.current) {
      textarea.current.style.height = "auto";
      textarea.current.style.height = textarea.current.scrollHeight + "px";
    }
  };

  const deleteText = () => {
    const ok = window.confirm("정말 삭제하실꺼죠?");

    if (ok) {
      //서버에서 데이터 삭제하기
      deleteDoc(doc(db, "details", textId));
      setTexts(texts.filter((text) => text.id !== textId));
    }
  };
  const dragOver = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Header user={user} setUser={setUser} />
        <article className={styles.mainArticle}>
          <div className={styles.title}>
            <h1>오늘의 Health</h1>
            <form onSubmit={onSubmit} className={styles.form}>
              <textarea
                ref={textarea}
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
            <div
              className={styles.trash}
              onDrop={deleteText}
              onDragOver={dragOver}
              onMouseOver={() => setAddModal(true)}
              onMouseLeave={() => setAddModal(false)}
            >
              <BsFillTrashFill />
            </div>
            {
              <span className={styles.trashExplain} style={{ opacity: addModal ? "1" : "0" }}>
                {" "}
                운동기록을 드래그 해서 삭제하실 수 있어요!
              </span>
            }
          </div>

          <section className={styles.textArticle}>
            {oldRecord.length > 0 ? (
              <div className={styles.textList}>
                {user && (
                  <section className={styles.datePickerSection}>
                    <div className={styles.textTitle}>지난 기록</div>
                    <div className={styles.datePicker}>
                      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} maxDate={oneDayBefore} />
                    </div>
                  </section>
                )}
                {oldRecord.map((record) => {
                  return (
                    record.creatorId === user?.uid &&
                    record.createdAt === pickerDate && (
                      <div className={styles.textArea}>
                        <Texts textObj={record} key={record.id} user={user} isOwner={record.creatorId === user?.uid} />
                      </div>
                    )
                  );
                })}
              </div>
            ) : (
              <>
                <div className={styles.textList}>
                  {user && (
                    <section className={styles.datePickerSection}>
                      <div className={styles.textTitle}>지난 기록</div>
                      <div className={styles.datePicker}>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} maxDate={oneDayBefore} />
                      </div>
                    </section>
                  )}
                  <div className={styles.textArea}>
                    <Texts textObj={{ text: "휴식 하신 날입니다! 😎", id: " " }} user={user} isOwner={true} />
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
                        <Texts textObj={text} key={text.id} user={user} isOwner={text.creatorId === user?.uid} />
                      </>
                    )
                  );
                })}
              </div>
            )}
          </section>
        </article>
        <Footer user={user} />
      </div>
    </>
  );
}
