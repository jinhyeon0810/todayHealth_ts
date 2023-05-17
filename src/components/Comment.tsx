import React, { useState } from "react";
import styles from "./Comment.module.css";
import { deleteDoc, doc } from "firebase/firestore";
import db from "../api/firebase";

export default function Comment({ textObj, user }): React.ReactElement {
  const [editing, setEditing] = useState(false);

  const onClickEdit = () => {};

  const onClickDelete = () => {
    const ok = window.confirm("정말 삭제하실꺼죠?");

    if (ok) {
      deleteDoc(doc(db, "comment", `${textObj.id}`));
    }
  };
  return (
    <>
      <div className={styles.textLine}>
        <span>{textObj.creatorId.substr(0, 4)}</span>
        {textObj.text}
        <div className={styles.buttonList}>
          {textObj.creatorId == user?.uid && (
            <>
              <button className={styles.button} onClick={onClickEdit}>
                수정
              </button>
              <button className={styles.button} onClick={onClickDelete}>
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
