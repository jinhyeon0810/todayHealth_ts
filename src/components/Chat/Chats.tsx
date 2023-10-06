import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { RootState, changeChatUser } from "../../utils/Store";
import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import db from "../../api/firebase";

interface ChatsProps {
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Chats {
  date: string;
  lastMessage: { text: string };
  userInfo: { displayName: string; photoURL: string; uid: string };
}
[];

export default function Chats(props: ChatsProps): React.ReactElement {
  const { setIsChatOpen } = props;
  const [chats, setChats] = useState<Chats[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.uid) return;
    //본인과 userChats 방이 만들어진 모든 사용자를 불러옵니다.
    const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
      setChats(doc.data() as Chats[]);
    });

    return () => {
      unsub();
    };
  }, [user.uid]);

  const handleSelect = (userInfo: { uid: string; displayName: string; photoURL: string }) => {
    setIsChatOpen(true);
    const addInfo = { ...userInfo, currentUser: user };
    dispatch(changeChatUser(addInfo));
  };
  return (
    <div className={styles.chats}>
      {Object.entries(chats)
        ?.sort((a, b) => new Date(b[1].date).getTime() - new Date(a[1].date).getTime())
        .map((chat) => {
          return (
            <div className={styles.userChat} key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
              <img className={styles.userChatImg} src={chat[1].userInfo?.photoURL} />
              <div className={styles.userChatInfo}>
                <span>{chat[1].userInfo?.displayName}</span>
                <p className={styles.userLastMsg}>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
