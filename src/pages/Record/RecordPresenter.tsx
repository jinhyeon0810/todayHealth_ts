import { IoChevronBackSharp } from "react-icons/io5";
import styles from "./Record.module.css";
import RecordingContent from "./RecordingContent";
import { RecordingProps } from "../../utils/type";

interface Props {
  handleGoback: () => void;
  handleAddExercise: () => void;
  pickedDatas: RecordingProps[];
  handleDeleteRecordingData: (arg0: RecordingProps) => void;
}

export default function RecordPresenter(props: Props): React.ReactElement {
  const { handleGoback, handleAddExercise, pickedDatas, handleDeleteRecordingData } = props;

  return (
    <article className={styles.container}>
      <header>
        <section className={styles.header}>
          <IoChevronBackSharp className={styles.backIcon} onClick={handleGoback} />
          <h1>기록장</h1>
          <img src="./favicon-32x32.png" width="60px" />
        </section>

        <section className={styles.body}>
          {pickedDatas.map((datas, i) => {
            return <RecordingContent datas={datas} i={i} key={datas.name} handleDeleteRecordingData={handleDeleteRecordingData} />;
          })}
          <div className={styles.addExercise}>
            <h1 onClick={handleAddExercise}>운동추가</h1>
          </div>
        </section>
      </header>
    </article>
  );
}
