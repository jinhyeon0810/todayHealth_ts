import React, { useState, useEffect } from "react";
import ChatRoomPresenter from "./ChatRoomPresenter";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, changeUser } from "../../../utils/Store";
import db, { onUserStateChange } from "../../../api/firebase";
import { arrayUnion, doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid, v4 } from "uuid";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { dateString, timeString } from "../../../utils/Date";
import { Message } from "../../../utils/type";

interface Messages {
  messages?: Message[] | undefined;
}

export default function ChatRoomContainer(): React.ReactElement {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (changeUser) {
      onUserStateChange((user: { uid: string; displayName: string; photoURL: string }) => {
        dispatch(changeUser({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }));
      });
    }
  }, [changeUser]);

  const [messages, setMessages] = useState<Messages>({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/main");
  };

  const chatContent = useSelector((state: RootState) => state.chatContent);
  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(e.target.value);
  };

  useEffect(() => {
    if (!chatContent.chatId) return;
    const unSub = onSnapshot(doc(db, "chats", chatContent.chatId), (doc) => {
      doc.exists() && setMessages(doc.data() as Messages);
    });

    return () => {
      unSub();
    };
  }, [chatContent.chatId]);

  const sendMessage = async () => {
    if (currentMessage.trim() === "") return;
    else if (img) {
      const storage = getStorage();
      //@ts-ignore
      const storageRef = ref(storage, `chat/${img.name + v4()} `);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          if (chatContent.chatId) {
            await updateDoc(doc(db, "chats", chatContent.chatId as string), {
              messages: arrayUnion({
                id: uuid(),
                text: currentMessage,
                senderId: user.displayName,
                date: dateString,
                time: timeString,
                img: downloadURL,
              }),
            });
          }
        });
      });
    } else {
      if (chatContent.chatId) {
        await updateDoc(doc(db, "chats", chatContent.chatId as string), {
          messages: arrayUnion({
            id: uuid(),
            text: currentMessage,
            senderId: user.displayName,
            date: dateString,
            time: timeString,
          }),
        });
      }
    }
    if (user.uid && chatContent.user.uid) {
      await updateDoc(doc(db, "userChats", user.uid as string), {
        [chatContent.chatId + ".lastMessage"]: {
          text: currentMessage,
        },

        [chatContent.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", chatContent.user.uid as string), {
        [chatContent.chatId + ".lastMessage"]: {
          text: currentMessage,
        },

        [chatContent.chatId + ".date"]: serverTimestamp(),
      });
    }
    setCurrentMessage("");
    setImg(null);
  };

  return (
    <>
      <ChatRoomPresenter
        handleGoBack={handleGoBack}
        currentMessage={currentMessage}
        onChangeMessage={onChangeMessage}
        user={user}
        chatContent={chatContent}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        messages={messages}
        setImg={setImg}
        sendMessage={sendMessage}
      />
    </>
  );
}
