import RecordPresenter from "./RecordPresenter";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, changeUser, removePickedDatas, resetPickedDatas } from "../../utils/Store";
import { RecordingProps } from "../../utils/type";
import { useEffect, useState } from "react";
import { onUserStateChange } from "../../api/firebase";
import IsLoading from "../../components/IsLoading/IsLoading";

export default function RecordContainer(): React.ReactElement {
  const pickedDatas = useSelector((state: RootState) => state.pickedDatas.pickedDatas);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (changeUser) {
      onUserStateChange((user: { uid: string; displayName: string; photoURL: string }) => {
        dispatch(changeUser({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }));
        setLoading(false);
      });
    }
  }, [changeUser, user.uid]);

  const handleGoback = () => {
    if (!user.uid) return;
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

  return (
    <>
      {loading && <IsLoading />}
      {user.uid && !loading && (
        <>
          <RecordPresenter
            handleGoback={handleGoback}
            handleAddExercise={handleAddExercise}
            pickedDatas={pickedDatas}
            handleDeleteRecordingData={handleDeleteRecordingData}
          />
        </>
      )}
    </>
  );
}
