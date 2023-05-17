import React, { useState } from "react";
import styles from "../pages/Board.module.css";
import TextareaAutosize from "react-textarea-autosize";
import db, { imageUpload } from "../api/firebase.js";
import { addDoc, collection } from "firebase/firestore";
import { v4 } from "uuid";
import { Filter } from "../pages/board";
import { useNavigate } from "react-router-dom";

interface Props {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setUser?: React.Dispatch<React.SetStateAction<{ uid: string }>>;
  user?: { uid: string };
  imageList: string[];
  setImageList: React.Dispatch<React.SetStateAction<string>>;
}

export default function BoardComponent({
  type,
  setType,
  user,
  imageList,
  setImageList,
}: Props): React.ReactElement {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [addFile, setAddFile] = useState<boolean>(true);
  const [editing, setEditing] = useState<boolean>(true);
  const [file, setFile] = useState();
  const [imageUpdate, setImageUpdate] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "file") {
      setFile(e.target.files && e.target.files[0]);
      setAddFile(false);
      return;
    }
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "content") {
      setContent(e.target.value);
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (title === "") {
      alert("제목을 입력하셔야죠 😊");
      return;
    }
    if (content === "") {
      alert("내용을 입력해줘요 😊");
      return;
    }
    if (type === "Category") {
      alert("카테고리를 선택해주세요 😊");
      return;
    }
    if (!file) {
      alert("사진 인증은 필수입니다 😎");
      return;
    }
    if (!imageUpdate) {
      alert("이미지를 먼저 등록해주셔요 😗");
      return;
    }

    addDoc(collection(db, "product"), {
      title,
      content,
      category: type,
      creatorId: user?.uid,
      createdAt: Date.now(),
      url: imageList[0],
    });

    setEditing(false);
    alert("등록 되었습니다 😎");
    navigate("/share");
  };

  const imgOnClick = () => {
    imageUpload(file, v4, setImageList);
    setImageUpdate(true);
    alert("이미지 저장완료 😀");
  };

  const onClickCancel = () => {
    setFile();
    setAddFile(true);
  };

  return (
    <div className={styles.height}>
      <>
        <div className={styles.title}>
          <Filter type={type} setType={setType} editing={editing}>
            {type}
          </Filter>
          {editing && <span className={styles.clickhere}>👈click</span>}
        </div>
        <div className={styles.addImage}>
          {file && (
            <img
              className={styles.img}
              src={URL.createObjectURL(file)}
              alt="local file"
            />
          )}
          {file && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "column",
              }}
            >
              <button className={styles.imgUpdate} onClick={imgOnClick}>
                등록
              </button>
              <button className={styles.imgUpdate} onClick={onClickCancel}>
                취소
              </button>
            </div>
          )}
        </div>
        <div className={styles.contentTitle}>
          {editing && (
            <input
              placeholder="제목"
              className={styles.input}
              onChange={handleChange}
              name="title"
              value={title ?? ""}
            />
          )}
        </div>

        <div className={styles.textareaList}>
          {editing && (
            <TextareaAutosize
              className={styles.textarea}
              autoFocus
              rows={1}
              placeholder="내용을 입력하세요."
              id="content"
              name="content"
              value={content ?? ""}
              onChange={handleChange}
            >
              {" "}
            </TextareaAutosize>
          )}
        </div>
        {addFile && (
          <div className={styles.fileArea}>
            <input
              type="file"
              accept="image/*"
              name="file"
              required
              className={styles.file}
              onChange={handleChange}
            />
          </div>
        )}

        <div className={styles.confirm}>
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.submitButton}
          >
            등록
          </button>
        </div>
      </>
    </div>
  );
}
