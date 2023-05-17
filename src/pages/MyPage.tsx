import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./MyPage.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<{ uid: string }>>;
  user?: { uid: string };
}

export default function MyPage({ user, setUser }: Props): React.ReactElement {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={styles.wrapper}>
      <Header user={user} setUser={setUser} />
      <div className={styles.datePicker}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          inline
          className={styles.datePicker}
        />
      </div>
      <div className={styles.body}>
        <h1 className={styles.title}> 진행한 운동</h1>
        <div className={styles.desc}>완료한 운동이 없어요...😥</div>
      </div>
      <div className={styles.footerArea}>
        <Footer />
      </div>
    </div>
  );
}
