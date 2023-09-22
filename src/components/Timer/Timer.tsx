import React, { useState, useRef, useEffect } from "react";
import styles from "./Timer.module.css";

export default function Timer(): React.ReactElement {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);

  const timer = useRef<NodeJS.Timeout | undefined>();
  useEffect(() => {
    timer.current = setInterval(() => {
      if (seconds < 60) {
        setSeconds((seconds) => seconds + 1);
      }
      if (seconds === 59) {
        setMinutes((minutes) => minutes + 1);
        setSeconds(0);
      }
      if (minutes === 59 && seconds === 59) {
        setHours((hours) => hours + 1);
        setMinutes(0);
      }
    }, 1000);

    return () => clearInterval(timer.current);
  }, [minutes, seconds, start]);

  const onClickReset = () => {
    clearInterval(timer.current);
    setMinutes(0);
    setHours(0);
    setSeconds(0);
    setStop(false);
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
      <div className={styles.seconds}>
        {hours < 10 ? `0${hours}` : hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <button className={styles.buttons} onClick={onClickReset}>
        리셋
      </button>
    </div>
  );
}
