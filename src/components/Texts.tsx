import React, { useState } from "react";
import styles from "./Texts.module.css";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import db from "../api/firebase";

export default function Texts({ textObj, isOwner, user }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(textObj.text);

  const onDeleteClick = () => {
    const ok = window.confirm("정말 삭제하실꺼죠?");

    if (ok) {
      deleteDoc(doc(db, "details", `${textObj.id}`));
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(newText, textObj);
    const updateRef = doc(db, "details", `${textObj.id}`);
    updateDoc(updateRef, {
      text: newText,
    });
    setEditing(false);
  };

  const onChange = (e) => {
    setNewText(e.target.value);
  };

  return (
    <>
      {user && (
        <div className={styles.textList}>
          {editing ? (
            <>
              <form onSubmit={onSubmit} className={styles.form}>
                <input
                  type="text"
                  placeholder="수정하세요"
                  value={newText}
                  required
                  onChange={onChange}
                  className={styles.textContents}
                />

                <input type="submit" value="확인" className={styles.ok} />
                <button onClick={toggleEditing} className={styles.cancel}>
                  취소
                </button>
              </form>
            </>
          ) : (
            <>
              <button className={styles.textArea}>{textObj.text}</button>
              {!isOwner && (
                <>
                  <button onClick={toggleEditing} className={styles.fix}>
                    수정
                  </button>
                  <button onClick={onDeleteClick} className={styles.delete}>
                    삭제
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
