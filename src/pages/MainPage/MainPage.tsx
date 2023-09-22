import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { BsFillChatDotsFill } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import styles from "./MainPage.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import db, { onUserStateChange } from "../../api/firebase";
import dateString from "../../utils/Date";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState, changeUser } from "../../utils/Store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import Timer from "../../components/Timer/Timer";
import { pickedDataProps } from "../../utils/type";
import CannotAccess from "../../components/CannotAccess/CannotAccess";

export default function MainPage(): React.ReactElement {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [pickedDatas, setPickedDatas] = useState<pickedDataProps[]>([]);
  const navigate = useNavigate();
  const [useStopWatch, setUseStopWatch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (changeUser) {
      onUserStateChange((user: { uid: string; displayName: string; photoURL: string }) => {
        dispatch(changeUser({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }));
        setLoading(false);
      });
    }
  }, [changeUser]);
  console.log(user);
  const handleStopWatch = () => {
    setUseStopWatch((prev) => !prev);
  };

  const handleRecord = () => {
    navigate("/record");
  };
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
      setPickedDatas(pickedArr.filter((picked) => picked.creatorId === user?.uid && picked.createdAt === dateString));
    });
  }, [user]);

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
      {user.uid && !loading && (
        <div className={styles.wrapper}>
          <Header />
          <article className={styles.mainContainer}>
            <div className={styles.mainBody}>
              <section className={styles.userImgAndId}>
                <div className={styles.userImg}>{user.photoURL ? <img src={user.photoURL} className={styles.userPhotoImg} /> : <FaUserCircle />}</div>
                <div>
                  <h3 className={styles.userId}>{user.displayName} 님</h3>
                  <span className={styles.setExercise}>운동을 설정해주세요</span>
                </div>
              </section>

              <section className={styles.mainFunctions}>
                <div className={styles.recordFunc} onClick={handleRecord}>
                  <CgGym className={styles.gymImg} />
                  <p>운동기록</p>
                </div>
                <div className={styles.chatFunc}>
                  <BsFillChatDotsFill className={styles.chatImg} />
                  <p>채팅하기</p>
                </div>
                <div className={styles.popularFunc} onClick={handleStopWatch}>
                  <BsStarFill className={styles.popImg} />
                  <p>스톱워치</p>
                </div>
              </section>
            </div>
            {useStopWatch && (
              <div className={styles.timer}>
                <Timer />
              </div>
            )}
            <section className={styles.mainContent}>
              <p className={styles.contentTitle}>오늘의 운동기록</p>
              <section className={styles.dataWrapper}>
                {pickedDatas.map((data, i) => {
                  return (
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
                  );
                })}
              </section>
            </section>

            <section className={styles.mainFootArea}>
              <Footer />
            </section>
          </article>
        </div>
      )}
      {!user.uid && loading && (
        <>
          <CannotAccess />
        </>
      )}
    </>
  );
}
