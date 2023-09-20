import React, { useState } from "react";
import styles from "./Record.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/Store";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import db from "../../api/firebase";
import dateString from "../../utils/Date";
import { RecordingProps } from "../../utils/type";

interface Props {
  datas: RecordingProps;
  i: number;
  handleDeleteRecordingData: (arg0: RecordingProps) => void;
}

export default function RecordingContent(props: Props): React.ReactElement {
  const { datas, i, handleDeleteRecordingData } = props;

  const user = useSelector((state: RootState) => state.user);
  const timeStamp = Timestamp.now();

  const [kg, setKg] = useState<string[]>([]);
  const [reps, setReps] = useState<string[]>([]);
  const [isCompletedArray, setIsCompletedArray] = useState<boolean[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);

  const handleSets = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = e.currentTarget.id;
    switch (targetId) {
      case "add":
        setRowCount((prev) => prev + 1);
        setIsCompletedArray([...isCompletedArray, false]);
        break;

      case "delete":
        if (rowCount === 0) return;
        setRowCount((prev) => prev - 1);
        isCompletedArray.splice(isCompletedArray.length - 1);
        kg.splice(kg.length - 1);
        reps.splice(reps.length - 1);
        break;

      case "complete":
        addDoc(collection(db, "RecordFinish"), {
          name: datas.name,
          kg,
          reps,
          creatorId: user.uid,
          createdAt: dateString,
          timeStamp,
        });
        alert("저장 되었습니다");
        handleDeleteRecordingData(datas);
        break;

      default:
        break;
    }
  };

  const onChangeRecordInput = (e: React.ChangeEvent<HTMLInputElement>, index: number, fieldType: string) => {
    const newValue = e.target.value;

    if (fieldType === "kg") {
      const newKg = [...kg];
      newKg[index] = newValue;
      setKg(newKg);
    } else if (fieldType === "reps") {
      const newReps = [...reps];
      newReps[index] = newValue;
      setReps(newReps);
    }
  };

  const handleIsCompleted = (index: number) => {
    const newIsCompletedArray = [...isCompletedArray];
    newIsCompletedArray[index] = !newIsCompletedArray[index];
    setIsCompletedArray(newIsCompletedArray);
  };

  return (
    <section className={styles.recordContent}>
      <h3>
        {i + 1}. {datas.name}
      </h3>
      <span className={styles.contentDelete} onClick={() => handleDeleteRecordingData(datas)}>
        X
      </span>

      <section className={styles.gridContainer}>
        <div className={styles.grid}>
          <p>세트</p>
          <p>KG</p>
          <p>횟수</p>
          <p>완료</p>

          {Array.from({ length: rowCount }, (_, index) => (
            <React.Fragment key={index}>
              <p>{index + 1}</p>
              <input value={kg[index]} onChange={(e) => onChangeRecordInput(e, index, "kg")} />
              <input value={reps[index]} onChange={(e) => onChangeRecordInput(e, index, "reps")} />
              {isCompletedArray[index] ? <div>V</div> : <button onClick={() => handleIsCompleted(index)} />}
            </React.Fragment>
          ))}
          <p></p>
        </div>
      </section>
      <div className={styles.setsContainer}>
        <button className={styles.addSets} onClick={handleSets} id="add">
          세트추가
        </button>
        <button className={styles.deleteSets} id="delete" onClick={handleSets}>
          세트삭제
        </button>
        <button className={styles.completeSets} id="complete" onClick={handleSets}>
          운동완료
        </button>
      </div>
    </section>
  );
}
