import React from "react";
import styles from "./Sort.module.css";
import Footer from "../../components/Footer/Footer";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

interface Props {
  handleLogOut: () => void;
  user: {
    user: { uid: string | null; displayName: string | null; photoURL: string | undefined };
  };
  handleNickName: () => void;
}

export default function SortPresenter(props: Props): React.ReactElement {
  const { handleLogOut, user, handleNickName } = props;
  return (
    <article className={styles.wrapper}>
      <section>
        <header className={styles.header}>설정</header>
        <div className={styles.body}>
          <section className={styles.userProfile}>
            <div>나</div>
            <div className={styles.buttons} onClick={handleNickName}>
              <button className={styles.content}>
                <span className={styles.icons}>
                  <FaUserCircle />
                </span>
                {user.user.displayName}
              </button>
              <button className={styles.arrow}>{`>`}</button>
            </div>
          </section>

          <section className={styles.etc}>
            <div>기타</div>
            <div className={styles.buttons}>
              <button className={styles.content}>
                <span className={styles.icons}>
                  <MdEmail />
                </span>
                건의사항 메일 보내기
              </button>
              <button className={styles.arrow}>{`>`}</button>
            </div>
            <div className={styles.buttons} onClick={handleLogOut}>
              <button className={styles.content}>
                <span className={styles.icons}>
                  <FiLogOut />
                </span>
                로그아웃
              </button>
              <button className={styles.arrow}>{`>`}</button>
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </article>
  );
}
