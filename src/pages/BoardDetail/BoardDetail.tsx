import React, { useState, useEffect } from "react";
import styles from "./BoardDetail.module.css";
import TextareaAutosize from "react-textarea-autosize";
import db from "../../api/firebase.js";
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../../components/Comment/Comment.js";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import dateString from "../../utils/Date.js";

interface Props {
  user?: { uid: string };
  setImageList: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface ProductProps {
  title: string;
  content: string;
  category: string;
  id: string;
  url: string;
  creatorId: string;
}

interface TextArrProps {
  id: string;
  text: string;
  createdAt: string;
  creatorId: string;
  postId: string;
  timeStamp: string;
}
[];

export default function BoardDetail({ user, setImageList }: Props): React.ReactElement {
  const storage = getStorage();
  const imageListRef = ref(storage, "images/");
  useEffect(() => {
    listAll(imageListRef).then((response) =>
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList(url);
        });
      })
    );
  }, [imageListRef, setImageList]);

  const [text, setText] = useState<string>("");
  const [texts, setTexts] = useState<TextArrProps[]>([]);

  const [type, setType] = useState<string>("Category");

  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const { id } = useParams();

  const [product, setProduct] = useState<ProductProps | undefined>({
    title: "",
    content: "",
    category: "",
    id: "",
    url: "",
    creatorId: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const [editing, setEditing] = useState<boolean>(false);
  const timeStamp = Timestamp.now();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.name === "file" && e.target instanceof HTMLInputElement) {
      setFile(e.target.files && e.target.files[0]);
      return;
    }

    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "content") {
      setContent(e.target.value);
    } else if (e.target.name === "comment") {
      setText(e.target.value);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "product"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const contentArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductProps[];
      setProduct(contentArr.find((product: ProductProps) => product.id === id));
    });
  }, [id]);
  useEffect(() => {
    if (product) {
      setTitle(product?.title);
      setContent(product?.content);
      setType(product?.category);
    }
  }, [product]);

  const onClickUpdate = () => {
    if (title.length === 0) {
      alert("제목을 입력해주세요 😉");
    } else if (content.length === 0) {
      alert("내용을 입력해주세요 😉");
    } else if (type === "Category") {
      alert("카테고리를 선택해주세요 😉");
    } else if (title.length !== 0 && content.length !== 0 && type !== "Category") {
      const updateRef = doc(db, "product", `${product?.id}`);
      updateDoc(updateRef, {
        title,
        content,
        category: type,
        creatorId: user?.uid,
        createdAt: dateString,
        timeStamp,
      });
      setEditing(false);
      alert("수정 완료되었습니다 😎");
      navigate("/share");
    }
  };

  const onClickOk = async () => {
    if (text.trim() === "") {
      alert("내용을 입력하세요");
    } else if (text.length > 0) {
      await addDoc(collection(db, "comment"), {
        text,
        createdAt: dateString,
        creatorId: user?.uid,
        postId: String(id),
        timeStamp,
      });
    }
    setText("");
  };

  useEffect(() => {
    const q = query(collection(db, "comment"), where("postId", "==", String(id)));
    onSnapshot(q, (snapshot) => {
      const textArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TextArrProps[];

      setTexts(textArr);
    });
  }, [id]);

  const onClickDelete = () => {
    const ok = window.confirm("정말 삭제하실꺼죠?");

    if (ok) {
      deleteDoc(doc(db, "product", `${product?.id}`));
    }
    navigate("/share");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.board}>
            <div className={styles.auth}>
              <span className={styles.topTitle}>오.운.완</span>
              <br /> 같이 인증해보아요 ✔
            </div>
            <div className={styles.title}>
              <Filter editing={editing} setType={setType}>
                {type}
              </Filter>

              {editing && <span className={styles.clickhere}>👈click</span>}
            </div>
            <div className={styles.addImage}>
              <img className={styles.image} src={product?.url} />
            </div>

            <div className={styles.contentTitle}>
              {editing && <input placeholder="제목" className={styles.input} onChange={handleChange} name="title" value={title ?? ""} />}

              {!editing && <div className={styles.input}>{product?.title}</div>}
            </div>

            <div className={styles.textareaList}>
              {!editing && <div className={styles.contentButton}>{product?.content}</div>}
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
                />
              )}
              {file && <img className={styles.img} src={URL.createObjectURL(file)} alt="local file" />}
            </div>
            <div className={styles.fileArea}>
              {user?.uid === product?.creatorId && editing && (
                <input type="file" accept="image/*" name="file" required className={styles.file} onChange={handleChange} />
              )}
            </div>
            <div className={styles.confirm}>
              {user?.uid === product?.creatorId && !editing && (
                <>
                  <button onClick={() => setEditing(true)} className={styles.submitButton}>
                    게시글 수정
                  </button>
                  <button onClick={onClickDelete} className={styles.submitButton}>
                    게시글 삭제
                  </button>
                </>
              )}
              {user?.uid === product?.creatorId && editing && (
                <button onClick={onClickUpdate} className={styles.submitButton}>
                  수정완료
                </button>
              )}
            </div>

            {texts.map((text) => {
              return (
                <div key={text.id}>
                  <Comment textObj={text} user={user} />
                </div>
              );
            })}

            <div className={styles.textareaArea}>
              {" "}
              <TextareaAutosize
                className={styles.textarea}
                placeholder=" 좋은 댓글 부탁드려요 :)"
                // disabled={}
                value={text}
                name="comment"
                onChange={handleChange}
              ></TextareaAutosize>
              <div className={styles.okCancelButtons}>
                <button className={styles.ok} onClick={onClickOk} disabled={!user}>
                  댓글 쓰기
                </button>
                <button className={styles.cancel} onClick={() => setText("")} disabled={!user}>
                  댓글 취소
                </button>
              </div>
            </div>

            <div className={styles.backToShareArea}>
              <button onClick={() => navigate("/share")} className={styles.backToSharePage}>
                {" "}
                게시판으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface FilterProps {
  children: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  editing: boolean;
}

export function Filter({ children, setType, editing }: FilterProps) {
  const [showModal, setShowModal] = useState(false);

  const onClick = (item: string) => {
    setShowModal(false);
    setType(item);
  };

  const purpose = ["Category", "다이어트", "벌크업", "유지"];

  return (
    <>
      <button className={styles.click} onClick={() => setShowModal(true)} style={{ marginRight: "0" }} disabled={!editing}>
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
