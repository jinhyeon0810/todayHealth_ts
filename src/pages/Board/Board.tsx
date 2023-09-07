import React, { useState } from "react";
import styles from "./Board.module.css";
import { useNavigate } from "react-router-dom";
import BoardComponent from "./BoardComponent";

interface Props {
  user?: { uid: string };
  imageList: string | undefined;
  setImageList: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function Board({ user, imageList, setImageList }: Props): React.ReactElement {
  const [type, setType] = useState("Category");
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.board}>
          <div className={styles.auth}>
            <span className={styles.topTitle}>오.운.완</span>
            <br /> 같이 인증해보아요 ✔
          </div>
          <BoardComponent
            type={type}
            setType={setType}
            user={user}
            imageList={imageList}
            setImageList={setImageList}
          />
          <div className={styles.backToShareArea}>
            <button onClick={() => navigate("/share")} className={styles.backToSharePage}>
              {" "}
              게시판으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

interface FilterProps {
  children: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}
export function Filter({ children, setType }: FilterProps) {
  const [showModal, setShowModal] = useState(false);
  const onClick = (item: string) => {
    setShowModal(false);
    setType(item);
  };

  const purpose = ["Category", "다이어트", "벌크업", "유지"];

  return (
    <>
      <button
        className={styles.click}
        onClick={() => setShowModal(true)}
        style={{ marginRight: "0" }}
      >
        {children}
      </button>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.x}>
            <button className={styles.button} onClick={() => setShowModal(false)}>
              X
            </button>
          </div>
          <div>
            {purpose.map((item, idx) => {
              return (
                <div key={idx} className={styles.item} onClick={() => onClick(item)}>
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
