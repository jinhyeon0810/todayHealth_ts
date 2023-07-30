import { useState } from "react";
import styles from "./AddProfile.module.css";
import { useNavigate } from "react-router-dom";

export default function AddProfile() {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");

  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const onSubmitNickName = () => {
    navigate("/");
  };
  return (
    <article className={styles.article}>
      <section className={styles.wrapper}>
        <form className={styles.section}>
          <input className={styles.input} placeholder="닉네임 :" value={nickName} onChange={onChangeNickName} />
          <button className={styles.checkButton} onClick={onSubmitNickName}>
            확인
          </button>
        </form>
      </section>
    </article>
  );
}
