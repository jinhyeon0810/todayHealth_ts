import React, { useState, useEffect } from "react";
import styles from "./Sort.module.css";
import SortPresenter from "./SortPresenter";
import { logout, onUserStateChange } from "../../api/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, changeUser } from "../../utils/Store";
import CannotAccess from "../../components/CannotAccess/CannotAccess";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

export default function SortContainer(): React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [nickNameModalOpen, setNickNameModalOpen] = useState(false);
  const [newNick, setNewNick] = useState("");

  const user = useSelector((state: RootState) => state);
  useEffect(() => {
    if (changeUser) {
      onUserStateChange((user: { uid: string; displayName: string; photoURL: string }) => {
        dispatch(changeUser({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }));
      });
    }
  }, [changeUser]);

  const handleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) return;
    else if ((e.target as HTMLElement).innerText === "취소") {
      setLogoutModalOpen(false);
      setNickNameModalOpen(false);
    } //
    else if ((e.target as HTMLElement).innerText === "로그아웃") {
      const userData = { uid: null, displayName: null, photoURL: null };
      logout().then(() => {
        onUserStateChange(() => {
          dispatch(changeUser(userData));
          navigate("/");
        });
      });
    } //
    else if ((e.target as HTMLElement).innerText === "확인") {
      if (newNick.trim().length === 0) return;
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          updateProfile(user, { displayName: newNick })
            .then(() => {
              setLoading(true);
              window.location.reload();
            })
            .catch((error) => console.error("프로필 업데이트 오류", error));
        }
      });
    }
    setNickNameModalOpen(false);
    setLoading(false);
  };

  const onChangeNickName = (e: { target: { value: React.SetStateAction<string> } }) => {
    setNewNick(e.target.value);
  };

  const handleLogOut = () => {
    setLogoutModalOpen(true);
  };

  const handleNickName = () => {
    setNickNameModalOpen(true);
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      {user.user.uid && !loading && (
        <>
          <SortPresenter handleLogOut={handleLogOut} user={user} handleNickName={handleNickName} />
          {logoutModalOpen && (
            <section className={styles.modal}>
              <div>로그아웃할까요?</div>
              <div className={styles.modalButtons}>
                <button className={styles.okModal} onClick={handleModal}>
                  로그아웃
                </button>
                <button className={styles.cancelModal} onClick={handleModal}>
                  취소
                </button>
              </div>
            </section>
          )}
          {nickNameModalOpen && (
            <section className={styles.modal}>
              <div>새로운 닉네임을 입력해주세요</div>
              <input type="text" value={newNick} onChange={onChangeNickName} placeholder="닉네임" className={styles.inputStyle} />
              <div className={styles.modalButtons}>
                <button className={styles.okModal} onClick={handleModal}>
                  확인
                </button>
                <button className={styles.cancelModal} onClick={handleModal}>
                  취소
                </button>
              </div>
            </section>
          )}
        </>
      )}
      {!user.user.uid && loading && <CannotAccess />}
    </div>
  );
}
