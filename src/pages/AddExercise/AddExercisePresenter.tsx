import styles from "./AddExercise.module.css";
import { IoChevronBackSharp } from "react-icons/io5";
import ExerciseType from "../../components/ExerciseType/ExerciseType";
import { RecordingProps, TypeDatas } from "../../utils/type";

interface Props {
  datas: TypeDatas[];
  upperDatas: TypeDatas[];
  lowerDatas: TypeDatas[];
  types: string[];
  handleGoback: () => void;
  allDatas: boolean;
  importUpperDatas: boolean;
  importLowerDatas: boolean;
  handleType: (e: React.MouseEvent<HTMLButtonElement>) => void;
  pickedDatas: RecordingProps[];
  handleRecordPage: () => void;
}
export default function AddExercisePresenter(props: Props) {
  const {
    datas,
    upperDatas,
    lowerDatas,
    types,
    handleGoback,
    allDatas,
    importUpperDatas,
    importLowerDatas,
    handleType,
    pickedDatas,
    handleRecordPage,
  } = props;

  return (
    <article className={styles.container}>
      <header className={styles.navFixed}>
        <section className={styles.header}>
          <IoChevronBackSharp className={styles.backIcon} onClick={handleGoback} />
          <input className={styles.headerInput} />
          <p className={styles.headerCancel}>취소</p>
        </section>

        <section className={styles.exerciseType} onClick={handleType}>
          {types.map((type, i) => {
            return <div key={i}>{type}</div>;
          })}
        </section>
      </header>

      <article>
        <section className={styles.datas}>
          {allDatas &&
            datas.map((data) => {
              return <ExerciseType data={data} key={data.name} />;
            })}

          {importUpperDatas &&
            upperDatas.map((data) => {
              return <ExerciseType data={data} key={data.name} />;
            })}

          {importLowerDatas &&
            lowerDatas.map((data) => {
              return <ExerciseType data={data} key={data.name} />;
            })}
        </section>
      </article>
      {pickedDatas.length > 0 && (
        <button className={styles.bottomAddBtn} onClick={handleRecordPage}>
          + {pickedDatas.length} 운동추가
        </button>
      )}
    </article>
  );
}
