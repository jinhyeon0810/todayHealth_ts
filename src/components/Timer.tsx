import React, { useState, useRef, useEffect } from "react";
import styles from "./Timer.module.css";

export default function Timer(): React.ReactElement {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);

  const timer = useRef();

  useEffect(() => {
    timer.current = setInterval(() => {
      // setTime((time) => time + 1);
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(timer.current);
  }, [start]);

  const onClickReset = () => {
    clearInterval(timer.current);
    setSeconds(0);
    setStop(true);
  };

  const onClickStop = () => {
    clearInterval(timer.current);
    setStop(true);
  };

  const onClickStart = () => {
    setStart((prev) => !prev);
    setStop(false);
  };
  return (
    <div className={styles.stopWatch}>
      {stop && (
        <button className={styles.buttons} onClick={onClickStart}>
          시작
        </button>
      )}
      {!stop && (
        <button className={styles.buttons} onClick={onClickStop}>
          중지
        </button>
      )}
      <div className={styles.seconds}>{seconds}초</div>
      <button className={styles.buttons} onClick={onClickReset}>
        리셋
      </button>
    </div>
  );
}
