import React, { useState } from "react";
import styles from "./Comment.module.css";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from "../../api/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/Store";

interface CommentProps {
  textObj: {
    createdAt: string;
    creatorId: string;
    id: string;
    postId: string;
    text: string;
    timeStamp: string;
  };
}

export default function Comment({ textObj }: CommentProps): React.ReactElement {
  const user = useSelector((state: RootState) => state.user);

  const [editing, setEditing] = useState(false);
  const [editNumber, setEditNumber] = useState(0);
  const [commentText, setCommentText] = useState(textObj.text);
  const onClickEdit = () => {
    setEditing(true);
  };

  const onClickDelete = () => {
    const ok = window.confirm("정말 삭제하실꺼죠?");

    if (ok) {
      deleteDoc(doc(db, "comment", `${textObj.id}`));
    }
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };
  const onClickEdited = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //수정값을 서버로 보냄
    const updateRef = doc(db, "comment", `${textObj.id}`);
    updateDoc(updateRef, {
      text: commentText,
    });
    setEditing(false);
    setEditNumber(1);
  };
  const onClickCanceled = () => {
    setEditing(false);
  };
  return (
    <>
      <div className={styles.textLine}>
        {!editing && (
          <>
            <span>{textObj.creatorId.substr(0, 4)}</span>
            {editNumber > 0 ? textObj.text + "(수정됨)" : textObj.text}
            <div className={styles.buttonList}>
              {textObj.creatorId == user?.displayName && (
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
          </>
        )}
        {editing && (
          <>
            <input value={commentText} onChange={onChangeComment} className={styles.editValue} />

            <div className={styles.buttonList}>
              {textObj.creatorId == user?.displayName && (
                <>
                  <button className={styles.button} onClick={onClickEdited}>
                    확인
                  </button>
                  <button className={styles.button} onClick={onClickCanceled}>
                    취소
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
