import React from "react";
import styles from "./Footer.module.css";
import { AiFillCalendar } from "react-icons/ai";
import { GiMuscleUp } from "react-icons/gi";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

export default function Footer(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  function pathName(locate: string) {
    return location.pathname.includes(locate);
  }

  const handleSharePage = () => {
    navigate("/share");
  };

  const handleCalendarPage = () => {
    navigate("/my");
  };
  const handleMainPage = () => {
    navigate("/main");
  };

  const handleSortPage = () => {
    navigate("/sort");
  };
  return (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footerFuncs} onClick={handleCalendarPage}>
          <AiFillCalendar className={styles.calendarIcon} style={{ color: pathName("/my") ? "51c457" : "" }} />
          <p>캘린더</p>
        </div>
        <div className={styles.footerFuncs} onClick={handleMainPage}>
          <GiMuscleUp className={styles.routineIcon} style={{ color: pathName("/main") ? "51c457" : "" }} />
          <p>루틴</p>
        </div>
        <div className={styles.footerFuncs} onClick={handleSharePage}>
          <BiSearchAlt2 className={styles.searchIcon} style={{ color: pathName("/share") ? "51c457" : "" }} />
          <p>피드</p>
        </div>
        <div className={styles.footerFuncs} onClick={handleSortPage}>
          <AiFillSetting className={styles.setIcon} style={{ color: pathName("/sort") ? "51c457" : "" }} />
          <p>설정</p>
        </div>
      </div>
    </>
  );
}
