import { useState, useEffect } from "react";
import typeData from "../../data/type.json";
import { useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db, { onUserStateChange } from "../../api/firebase";
import AddExercisePresenter from "./addExercisePresenter";
import ExerciseType from "../../components/Type/ExerciseType";
import { useDispatch, useSelector } from "react-redux";
import { RootState, changeUser, resetPickedDatas } from "../../utils/Store";

export default function AddExerciseContainer() {
  const timeStamp = Timestamp.now();
  const types = ["전체", "상체", "하체"];
  const [importUpperDatas, setImportUpperDatas] = useState(false);
  const [importLowerDatas, setImportLowerDatas] = useState(false);
  const [allDatas, setAllDatas] = useState(true);

  const upperData = typeData.data.filter((data) => data.type === "상체");
  const lowerData = typeData.data.filter((data) => data.type === "하체");

  const user = useSelector((state: RootState) => state.user);
  const pickedDatas = useSelector((state) => state.pickedDatas.pickedDatas);
  const dispatch = useDispatch();

  useEffect(() => {
    if (changeUser) {
      onUserStateChange((user: { uid: string }) => {
        dispatch(changeUser(user?.uid));
      });
    }
  }, [changeUser]);

  const navigate = useNavigate();
  const handleGoback = () => {
    //나중에 모달창으로 구현하기
    if (pickedDatas.length > 0) {
      const ok = window.confirm("추가된 데이터가 날아가도 괜찮습니까?");
      if (ok) {
        dispatch(resetPickedDatas());
        navigate(-1);
      }
    } else navigate(-1);
  };
  const handleType = (e) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (e.target.innerText === "상체") {
      setImportUpperDatas(true);
      setImportLowerDatas(false);
      setAllDatas(false);
    } else if (e.target.innerText === "하체") {
      setImportLowerDatas(true);
      setImportUpperDatas(false);
      setAllDatas(false);
    } else if (e.target.innerText === "전체") {
      setAllDatas(true);
      setImportUpperDatas(false);
      setImportLowerDatas(false);
    }
  };

  const handleRecordPage = () => {
    //record화면에서 완료할때 추가할것
    // pickedDatas.forEach((data) => {
    //   addDoc(collection(db, "dataTypes"), {
    //     type: data.type,
    //     name: data.name,
    //     creatorId: user.uid,
    //     timeStamp,
    //   });
    // });
    navigate("/record");
  };

  return (
    <>
      <AddExercisePresenter
        datas={typeData.data}
        upperDatas={upperData}
        lowerDatas={lowerData}
        types={types}
        handleGoback={handleGoback}
        allDatas={allDatas}
        importUpperDatas={importUpperDatas}
        importLowerDatas={importLowerDatas}
        handleType={handleType}
        pickedDatas={pickedDatas}
        // setPickedDatas={setPickedDatas}
        handleRecordPage={handleRecordPage}
      />
    </>
  );
}
