import React from "react";
import styles from "./Sidebar.module.css";
import { useDispatch } from "react-redux";
import { changeUser } from "../../utils/Store";
import { logout, onUserStateChange } from "../../api/firebase";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  user: { uid: string | null; displayName: string | null; photoURL: string | undefined };
}

export default function Navbar(props: NavbarProps): React.ReactElement {
  const { user } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      const userData = { uid: null, displayName: null, photoURL: undefined };
      logout().then(() => {
        onUserStateChange(() => {
          dispatch(changeUser(userData));
          navigate("/");
        });
      });
    }
  };
  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>채팅</span>
      <div className={styles.user}>
        <img src={user.photoURL} />
        <span>{user.displayName}</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
}
