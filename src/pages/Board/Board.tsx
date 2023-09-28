import React, { useState, useEffect } from "react";
import styles from "./Board.module.css";
import { useNavigate } from "react-router-dom";
import BoardComponent from "./BoardComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState, changeUser } from "../../utils/Store";
import { onUserStateChange } from "../../api/firebase";
import CannotAccess from "../../components/CannotAccess/CannotAccess";

export default function Board(): React.ReactElement {
  const [imageList, setImageList] = useState<string | undefined>();
  const [type, setType] = useState("Category");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (changeUser) {
      onUserStateChange((user: { uid: string; displayName: string; photoURL: string }) => {
        dispatch(changeUser({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }));
      });
    }
  }, [changeUser]);

  return (
    <>
      {user.uid ? (
        <>
          <div className={styles.wrapper}>
            <div className={styles.board}>
              <div className={styles.auth}>
                <span className={styles.topTitle}>오.운.완</span>
                <br /> 같이 인증해보아요 ✔
                <br />
                <br /> 사진 인증은 필수 ✔
              </div>
              <BoardComponent type={type} setType={setType} imageList={imageList} setImageList={setImageList} />
              <div className={styles.backToShareArea}>
                <button onClick={() => navigate("/share")} className={styles.backToSharePage}>
                  ✔ 게시판으로 돌아가기
                </button>
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
}
export function Filter({ children, setType }: FilterProps) {
  const [showModal, setShowModal] = useState(false);
  const onClick = (item: string) => {
    setShowModal(false);
    setType(item);
  };

  const purpose = ["Category", "다이어트", "벌크업", "유지"];

  return (
    <>
      <button className={styles.click} onClick={() => setShowModal(true)} style={{ marginRight: "0" }}>
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
