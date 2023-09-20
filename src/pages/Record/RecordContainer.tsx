import { useEffect } from "react";
import RecordPresenter from "./RecordPresenter";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, changeUser, removePickedDatas, resetPickedDatas } from "../../utils/Store";
import { onUserStateChange } from "../../api/firebase";
import { RecordingProps } from "../../utils/type";

export default function RecordContainer(): React.ReactElement {
  const pickedDatas = useSelector((state: RootState) => state.pickedDatas.pickedDatas);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(pickedDatas);
  const handleGoback = () => {
    if (pickedDatas.length > 0) {
      const ok = window.confirm("운동 기록이 저장되지 않았습니다. 종료하시겠습니까?");
      if (ok) {
        navigate("/main");
        dispatch(resetPickedDatas());
      }
    } else navigate("/main");
  };
  const handleAddExercise = () => {
    navigate("/addExercise");
  };

  const handleDeleteRecordingData = (data: RecordingProps) => {
    dispatch(removePickedDatas(data));
  };

  useEffect(() => {
    if (changeUser) {
      onUserStateChange((user: { uid: string }) => {
        dispatch(changeUser(user?.uid));
      });
    }
  }, [changeUser]);

  return (
    <>
      <RecordPresenter
        handleGoback={handleGoback}
        handleAddExercise={handleAddExercise}
        pickedDatas={pickedDatas}
        handleDeleteRecordingData={handleDeleteRecordingData}
      />
    </>
  );
}
