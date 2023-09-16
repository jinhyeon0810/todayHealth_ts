import React, { useState } from "react";
import styles from "./Footer.module.css";
import { AiFillCalendar } from "react-icons/ai";
import { GiMuscleUp } from "react-icons/gi";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import Timer from "../Timer/Timer";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/Store";
import { useNavigate } from "react-router-dom";

export default function Footer(): React.ReactElement {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const handleSharePage = () => {
    navigate("/share");
  };

  // const [show, setShow] = useState(false);

  // const onClickTimer = () => {
  //   if (user) {
  //     setShow(!show);
  //   } else {
  //     alert("로그인 하셔야 이용가능합니다");
  //   }
  // };
  return (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footerFuncs}>
          <AiFillCalendar className={styles.calendarIcon} />
          <p>캘린더</p>
        </div>
        <div className={styles.footerFuncs}>
          <GiMuscleUp className={styles.routineIcon} />
          <p>루틴</p>
        </div>
        <div className={styles.footerFuncs} onClick={handleSharePage}>
          <BiSearchAlt2 className={styles.searchIcon} />
          <p>피드</p>
        </div>
        <div className={styles.footerFuncs}>
          <AiFillSetting className={styles.setIcon} />
          <p>설정</p>
        </div>
        {/* {!show && (
          <div>
            <button onClick={onClickTimer} className={styles.timerButton}>
              타이머 시작! ⏰ <br />
              <span>운동 시간을 확인해보아요 ⏳</span>
            </button>
          </div>
        )}
        {show && <Timer setShow={setShow} />} */}
      </div>
    </>
  );
}
