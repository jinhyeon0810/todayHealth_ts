import React, { useState } from "react";
import styles from "./Footer.module.css";
import Timer from "../Timer/Timer";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/Store";

export default function Footer(): React.ReactElement {
  const user = useSelector((state: RootState) => state.user);

  const [show, setShow] = useState(false);

  const onClickTimer = () => {
    if (user) {
      setShow(!show);
    } else {
      alert("로그인 하셔야 이용가능합니다");
    }
  };
  return (
    <>
      {!show && (
        <button onClick={onClickTimer} className={styles.timerButton}>
          타이머 시작! ⏰ <br />
          <span style={{ fontSize: "9px" }}>운동 시간을 확인해보아요 ⏳</span>
        </button>
      )}
      {show && <Timer setShow={setShow} />}

      <div className={styles.wrapper}>
        <span className={styles.footerTitle}>기록이 몸을 만든다</span>
        <div className={styles.footerDesc}>운동, 매번 하고 있지만 진짜 성장하고 있는지 궁금하지 않으세요? (●'◡'●)</div>
        <div className={styles.footerDesc}>오늘의 Helath로 기록하세요. 현실적으로, 간편하게 관리할 수 있습니다 😎</div>
        <div>
          <span className={styles.completed}>오.운.완 게시판</span>을 통해 다른 사람들과 소통하며 득근하세요 💪
        </div>
      </div>
    </>
  );
}
