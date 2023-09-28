import React from "react";
import styles from "./ChatRoom.module.css";
import Sidebar from "../../../components/Chat/Sidebar";
import Messages from "../../../components/Chat/Messages";
import { BsImage } from "react-icons/bs";
import { Message } from "../../../utils/type";

interface ChatRoomProps {
  handleGoBack: () => void;
  sendMessage: () => void;
  currentMessage: string;
  onChangeMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  user: { uid: string | null; displayName: string | null; photoURL: string | undefined };
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatContent: { chatId: string | null; user: { uid: string | null; displayName: string | null; photoURL: string | undefined } };
  messages: { messages?: Message[] | undefined };
  setImg: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function ChatRoomPresenter(props: ChatRoomProps): React.ReactElement {
  const { handleGoBack, sendMessage, currentMessage, onChangeMessage, user, isChatOpen, setIsChatOpen, chatContent, messages, setImg } = props;
  console.log(messages?.messages);
  console.log(chatContent.chatId);
  console.log(isChatOpen);

  return (
    <article className={styles.wrapper}>
      <div className={styles.container}>
        <Sidebar setIsChatOpen={setIsChatOpen} />
        <section className={styles.message}>
          <section className={styles.chatWrapper}>
            <header className={styles.header}>
              <div onClick={handleGoBack}>뒤로가기</div>
              <div>{chatContent.user.displayName}</div>
            </header>
            <section className={styles.chatBody}>
              {isChatOpen &&
                chatContent.chatId &&
                messages?.messages?.map((msg, i) => {
                  return (
                    <div key={i}>
                      <Messages own={user.displayName === msg.senderId ? true : false} msg={msg} user={user} chatContent={chatContent} />
                    </div>
                  );
                })}
              {!isChatOpen &&
                chatContent.chatId &&
                messages.messages?.map((msg, i) => {
                  return (
                    <div key={i}>
                      <Messages own={user.displayName === msg.senderId ? true : false} msg={msg} user={user} chatContent={chatContent} />
                    </div>
                  );
                })}

              {!isChatOpen && !chatContent.chatId && <div className={styles.notChatOpen}>Open a conversation to start a chat!</div>}
            </section>
            <section className={styles.footer}>
              <textarea placeholder="메시지 입력..." value={currentMessage} onChange={onChangeMessage} className={styles.chatMsgInput} />
              <div className={styles.sendMsg}>
                <input type="file" style={{ display: "none" }} id="file" onChange={(e) => setImg(e.target.files && e.target.files[0])} />
                <label htmlFor="file">
                  <BsImage className={styles.sendIcon} />
                </label>
                <button onClick={sendMessage} className={styles.chatSubmitBtn}>
                  보내기
                </button>
              </div>
            </section>
          </section>
        </section>
      </div>
    </article>
  );
}
