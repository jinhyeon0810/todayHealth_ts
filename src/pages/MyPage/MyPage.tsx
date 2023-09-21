import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { GiMuscleUp } from "react-icons/gi";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./MyPage.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import db, { onUserStateChange } from "../../api/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState, changeUser } from "../../utils/Store";
import { useNavigate } from "react-router-dom";
import { pickedDataProps } from "../../utils/type";
import CannotAccess from "../../components/CannotAccess/CannotAccess";

export default function MyPage(): React.ReactElement {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  //캘린더 선택한 날짜 정보표시
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [pickedDatas, setPickedDatas] = useState<pickedDataProps[]>([]);
  const year = startDate?.getFullYear();
  const month = String((startDate as Date)?.getMonth() + 1).padStart(2, "0");
  const day = String(startDate?.getDate()).padStart(2, "0");

  const pickerDate = `${year}-${month}-${day}`;

  useEffect(() => {
    if (changeUser) {
      onUserStateChange((user: { uid: string; displayName: string }) => {
        dispatch(changeUser({ uid: user.uid, displayName: user.displayName }));
      });
    }
  }, [changeUser]);

  //서버에서 운동기록 데이터 가져오기
  useEffect(() => {
    if (!user) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const q = query(collection(db, "RecordFinish"), orderBy("timeStamp", "desc"));
    onSnapshot(q, (snapshot) => {
      const pickedArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as pickedDataProps[];
      setPickedDatas(pickedArr.filter((picked) => picked.creatorId === user?.uid && picked.createdAt === pickerDate));
      setLoading(false);
    });
  }, [pickerDate, user]);
  console.log(loading);
  const handleRecordPage = () => {
    navigate("/record");
  };
  const handleDeleteData = (data: pickedDataProps) => {
    const ok = window.confirm("정말 삭제하실꺼죠?");

    if (ok) {
      //서버에서 데이터 삭제하기
      deleteDoc(doc(db, "RecordFinish", data.id));
      setPickedDatas(pickedDatas.filter((picked) => picked.id !== data.id));
    }
  };
  return (
    <>
      {user.uid ? (
        <div className={styles.wrapper}>
          <Header />
          <article className={styles.layout}>
            <div className={styles.datePicker}>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} inline className={styles.datePicker} maxDate={new Date()} />
            </div>
            <div className={styles.body}>
              <h1 className={styles.title}>
                진행한 운동 <GiMuscleUp /> / <span className={styles.exerciseDay}>{pickerDate}</span>
              </h1>
              <ul className={styles.desc}>
                {loading && (
                  <button className={styles.noDesc} onClick={handleRecordPage}>
                    로딩중입니다 . . .
                  </button>
                )}
                {pickedDatas?.length > 0 &&
                  !loading &&
                  pickedDatas?.map((data, i) => {
                    return (
                      data.creatorId === user?.uid &&
                      pickerDate === data.createdAt && (
                        <section className={styles.dataContainer} key={i}>
                          <div>
                            {i + 1}. {data.name}
                          </div>
                          <section className={styles.dataContent}>
                            <div>총 {data.kg.length}세트</div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              {data.kg.map((d, i) => (
                                <div key={i}> {d + "kg"} </div>
                              ))}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              {data.reps.map((d, i) => (
                                <div key={i}> {d + "회"} </div>
                              ))}
                            </div>
                            <div className={styles.deleteContent} onClick={() => handleDeleteData(data)}>
                              X
                            </div>
                          </section>
                        </section>
                      )
                    );
                  })}
                {pickedDatas?.length === 0 && !loading && (
                  <button className={styles.noDesc} onClick={handleRecordPage}>
                    운동기록을 추가해주세요 😁
                  </button>
                )}
              </ul>
            </div>
            <Footer />
          </article>
        </div>
      ) : (
        <CannotAccess />
      )}
    </>
  );
}
