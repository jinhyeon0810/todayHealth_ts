import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styles from "./ExerciseType.module.css";
import { onUserStateChange } from "../../api/firebase";
import { useDispatch } from "react-redux";
import { addPickedDatas, changeUser, removePickedDatas } from "../../utils/Store";
import { TypeDatas } from "../../utils/type";

export default function ExerciseType({ data }: { data: TypeDatas }): React.ReactElement {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (changeUser) {
      onUserStateChange((user: { uid: string; displayName: string; photoURL: string }) => {
        dispatch(changeUser({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }));
      });
    }
  }, [changeUser]);

  const handleHeart = async (e: { stopPropagation: () => void; preventDefault: () => void }) => {
    e.stopPropagation();
    e.preventDefault();
    setIsSelected((prev) => !prev);
    if (!isSelected) {
      dispatch(addPickedDatas(data));
    } else if (isSelected) {
      dispatch(removePickedDatas(data));
    }
  };

  return (
    <>
      <section className={styles.dataCard}>
        <img src={data.url} className={styles.imgSize} />
        <div className={styles.dataText}>
          <p className={styles.dataName}>{data.name}</p>
          <p className={styles.dataSub}>{data.sub}</p>
        </div>
        <div onClick={handleHeart}>
          {!isSelected ? <AiOutlineHeart className={styles.heartIcon} /> : <AiFillHeart className={styles.fillheartIcon} />}
        </div>
      </section>
    </>
  );
}
