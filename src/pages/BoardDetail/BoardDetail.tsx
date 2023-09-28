import React, { useState, useEffect } from "react";
import styles from "./BoardDetail.module.css";
import TextareaAutosize from "react-textarea-autosize";
import db, { onUserStateChange } from "../../api/firebase.js";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../../components/Comment/Comment.js";
// import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { dateString } from "../../utils/Date.js";
import { useDispatch, useSelector } from "react-redux";
import { RootState, changeChatUser, changeUser } from "../../utils/Store.js";
import { FaUserCircle } from "react-icons/fa";
import CannotAccess from "../../components/CannotAccess/CannotAccess.js";

interface ProductProps {
  title: string;
  content: string;
  category: string;
  id: string;
  url: string;
  creatorId: string;
  createdAt: string;
  photoURL: string | undefined;
  uid: string | null;
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

export default function BoardDetail(): React.ReactElement {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [text, setText] = useState<string>("");
  const [texts, setTexts] = useState<TextArrProps[]>([]);
  const [nickName, setNickName] = useState<string | null>(null);
  const [findUser, setFindUser] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [type, setType] = useState<string>("Category");
  const [num, setNum] = useState(0);

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
    createdAt: "",
    photoURL: undefined,
    uid: null,
  });

  const [file, setFile] = useState<File | null>(null);

  const [editing, setEditing] = useState<boolean>(false);
  const timeStamp = Timestamp.now();
  const navigate = useNavigate();

  useEffect(() => {
    if (changeUser) {
      onUserStateChange((user: { uid: string; displayName: string; photoURL: string }) => {
        dispatch(changeUser({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }));
      });
    }
  }, [changeUser]);

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
      setNickName(product.creatorId);
      setFindUser(product.uid);
      setTime(product.createdAt);
      setTitle(product.title);
      setContent(product.content);
      setType(product.category);
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
        creatorId: user?.displayName,
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
        creatorId: user?.displayName,
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

  const handleOnClick = () => {
    setNum((prev) => prev + 1);
    if (num >= 1) return;
    else alert("악플은 누군가를 죽일 수 있습니다");
  };
  console.log(product);

  const handleChatRoom = async () => {
    if (!user.uid) return;
    //채팅하는 서로 다른 두 유저의 혼합ID를 만듭니다 : 대화방의 고유 id로 쓰일 예정
    const combinedId = (user.uid as string) > (findUser as string) ? user.uid + findUser : findUser + user.uid;
    try {
      //클릭시 고유 id를 토대로 대화 데이터를 불러옵니다.
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(user.uid, findUser);
      console.log(combinedId);

      if (!res.exists()) {
        //만약 대화 데이터가 없다면, 고유id를 토대로 만들어줍니다.
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //대화 데이터가 없을 시 서로의 uid 안에 상대방의 정보를 저장합니다.
        //이때 유저는 (현재 로그인 유저와 상대방 유저) 입니다.
        await updateDoc(doc(db, "userChats", findUser as string), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid as string), {
          [combinedId + ".userInfo"]: {
            uid: findUser,
            displayName: nickName,
            photoURL: product?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
    const userInfo = { displayName: nickName, photoURL: product?.photoURL, uid: findUser };
    const addInfo = { ...userInfo, currentUser: user };
    dispatch(changeChatUser(addInfo));
    setFindUser(null);
    navigate("/chatroom");
  };

  return (
    <>
      {user.uid ? (
        <>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <div className={styles.board}>
                <div className={styles.title}>
                  <section className={styles.userImgAndId}>
                    <div className={styles.userImg}>
                      <FaUserCircle />
                    </div>
                    <div>
                      <h3 className={styles.userId}>{nickName} 님</h3>
                    </div>
                  </section>

                  {editing && <span className={styles.clickhere}>👈click</span>}
                </div>
                <div className={styles.addImage}>
                  <img className={styles.image} src={product?.url} />
                </div>

                <section className={styles.detailBody}>
                  <div className={styles.typeAndTime}>
                    <Filter editing={editing} setType={setType}>
                      {type}
                    </Filter>
                    <div>{time}</div>
                  </div>
                  <div className={styles.contentTitle}>
                    {editing && (
                      <>
                        <input placeholder="제목" onChange={handleChange} name="title" value={title ?? ""} />
                        {/* <label htmlFor="title"></label> */}
                      </>
                    )}

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
                    {user?.uid === product?.uid && editing && (
                      <input type="file" accept="image/*" name="file" required className={styles.file} onChange={handleChange} />
                    )}
                  </div>
                  <div className={styles.confirm}>
                    {user?.uid === product?.uid && !editing && (
                      <>
                        <button onClick={() => setEditing(true)} className={styles.submitButton}>
                          게시글 수정
                        </button>
                        <button onClick={onClickDelete} className={styles.submitButton}>
                          게시글 삭제
                        </button>
                      </>
                    )}
                    {user?.uid === product?.uid && editing && (
                      <button onClick={onClickUpdate} className={styles.submitButton}>
                        수정완료
                      </button>
                    )}
                  </div>
                </section>

                {texts.map((text) => {
                  return (
                    <div key={text.id}>
                      <Comment textObj={text} />
                    </div>
                  );
                })}

                <section className={styles.textareaArea}>
                  <TextareaAutosize
                    className={styles.textarea}
                    placeholder=" 좋은 댓글 부탁드려요 :)"
                    value={text}
                    name="comment"
                    onChange={handleChange}
                    onClick={handleOnClick}
                  />
                  <div className={styles.okCancelButtons}>
                    <button className={styles.ok} onClick={onClickOk} disabled={!user}>
                      댓글 쓰기
                    </button>
                    <button className={styles.cancel} onClick={() => setText("")} disabled={!user}>
                      댓글 취소
                    </button>
                  </div>
                </section>

                <div className={styles.backToShareArea}>
                  <button className={styles.chat} onClick={handleChatRoom}>
                    채팅보내기
                  </button>
                  <button onClick={() => navigate("/share")} className={styles.backToSharePage}>
                    게시판으로 돌아가기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CannotAccess />
      )}
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
