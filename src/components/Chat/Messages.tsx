import { Message } from "../../utils/type";
import styles from "./Sidebar.module.css";
import { useEffect, useRef } from "react";

interface MessageProps {
  own: boolean;
  msg: Message;
  user: { uid: string | null; displayName: string | null; photoURL: string | undefined };
  chatContent: { chatId: null | string; user: { uid: string | null; displayName: string | null; photoURL: string | undefined } };
}

export default function Messages(props: MessageProps): React.ReactElement {
  const { own, msg, user, chatContent } = props;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  return (
    <>
      <div className={own ? styles.messagesOwn : styles.messages} ref={ref}>
        <div className={styles.msgContents}>
          <img src={msg.senderId === user.displayName ? user.photoURL : chatContent.user.photoURL} />
          <div className={own ? styles.messageOwn : styles.message}>
            <p>{msg.text}</p>
            {msg.img && <img src={msg.img} />}
          </div>
        </div>
        <p className={styles.msgBottom}>{msg.time}</p>
      </div>
    </>
  );
}
