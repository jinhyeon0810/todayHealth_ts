import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import db from "../../api/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/Store";

interface FindUser {
  uid: string;
  displayName: string;
  photoURL: string;
}

export default function Search(): React.ReactElement {
  const [username, setUsername] = useState("");
  const [findUser, setFindUser] = useState<FindUser | null>(null);
  const [err, setErr] = useState(false);

  const user = useSelector((state: RootState) => state.user);

  const handleSearch = async () => {
    //유저 데이터에서 닉네임과 같은 데이터를 찾습니다.
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try {
      //찾는 유저의 정보를 findUser에 보관합니다.
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setFindUser(doc.data() as FindUser);
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleSelect = async () => {
    if (!user.uid) return;
    //채팅하는 서로 다른 두 유저의 혼합ID를 만듭니다 : 대화방의 고유 id로 쓰일 예정
    const combinedId = (user.uid as string) > (findUser?.uid as string) ? user.uid + findUser?.uid : findUser?.uid + user.uid;
    try {
      //클릭시 고유 id를 토대로 대화 데이터를 불러옵니다.
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //만약 대화 데이터가 없다면, 고유id를 토대로 만들어줍니다.
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //대화 데이터가 없을 시 서로의 uid 안에 상대방의 정보를 저장합니다.
        //이때 유저는 (현재 로그인 유저와 상대방 유저) 입니다.
        await updateDoc(doc(db, "userChats", findUser?.uid as string), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: findUser?.uid,
            displayName: findUser?.displayName,
            photoURL: findUser?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
    setFindUser(null);
    setUsername("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    e.code === "Enter" && handleSearch();
  };
  return (
    <div className={styles.search}>
      <div className={styles.searchForm}>
        <input type="text" placeholder="유저를 찾으세요" value={username} onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} />
      </div>
      {err && <span>존재하지 않는 유저입니다</span>}
      {findUser && (
        <div className={styles.userChat} onClick={handleSelect}>
          <img src={findUser.photoURL} className={styles.userChatImg} />
          <div className={styles.userChatInfo}>
            <span>{findUser.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
