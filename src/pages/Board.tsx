import React, { useState } from "react";
import Header from "../components/Header";
import styles from "./Board.module.css";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string>>;
  user?: { uid: string };
}

export default function Board({ user, setUser }: Props) {
  const [type, setType] = useState("Category");
  return (
    <>
      <div className={styles.wrapper}>
        <Header user={user} setUser={setUser} />
        <div className={styles.board}>
          <div className={styles.auth}>
            <span className={styles.topTitle}>오.운.완</span>
            <br /> 같이 인증해보아요 ✔
          </div>
          <div className={styles.title}>
            <Filter type={type} setType={setType}>
              {type}
            </Filter>
            <span className={styles.clickhere}>👈click</span>
          </div>
          <div className={styles.contentTitle}>
            <input placeholder="제목" className={styles.input} />
          </div>
        </div>
      </div>
    </>
  );
}

function Filter({ children, type, setType }) {
  const [showModal, setShowModal] = useState(false);

  const onClick = (item) => {
    setShowModal(false);
    setType(item);
  };

  const purpose = ["Category", "다이어트", "벌크업", "유지"];

  return (
    <>
      <div
        className={styles.click}
        onClick={() => setShowModal(true)}
        style={{ marginRight: "0" }}
      >
        {children}
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.x}>
            <button
              className={styles.button}
              onClick={() => setShowModal(false)}
            >
              X
            </button>
          </div>
          <div>
            {purpose.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={styles.item}
                  onClick={() => onClick(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
