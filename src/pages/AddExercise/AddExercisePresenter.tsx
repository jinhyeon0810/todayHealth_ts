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
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
export default function AddExercisePresenter(props: Props): React.ReactElement {
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
    search,
    setSearch,
  } = props;

  return (
    <article className={styles.container}>
      <header className={styles.navFixed}>
        <section className={styles.header}>
          <IoChevronBackSharp className={styles.backIcon} onClick={handleGoback} />
          <input className={styles.headerInput} value={search} onChange={(e) => setSearch(e.target.value)} />
          <p className={styles.headerCancel} onClick={() => setSearch("")}>
            취소
          </p>
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
