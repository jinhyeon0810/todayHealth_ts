import React, { useEffect } from "react";
import styles from "./Sidebar.module.css";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { useDispatch, useSelector } from "react-redux";
import { onUserStateChange } from "../../api/firebase";
import { RootState, changeUser } from "../../utils/Store";

interface SidebarProps {
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar(props: SidebarProps): React.ReactElement {
  const { setIsChatOpen } = props;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (changeUser) {
      onUserStateChange((user: { uid: string | null; displayName: string | null; photoURL: string | undefined }) => {
        dispatch(changeUser({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }));
      });
    }
  }, [changeUser]);

  return (
    <article className={styles.wrapper}>
      <Navbar user={user} />
      <Search />
      <Chats setIsChatOpen={setIsChatOpen} />
    </article>
  );
}
