import { useState, useEffect } from "react";
import typeData from "../../data/type.json";
import { useNavigate } from "react-router-dom";
import { onUserStateChange } from "../../api/firebase";
import AddExercisePresenter from "./AddExercisePresenter";
import { useDispatch, useSelector } from "react-redux";
import { RootState, changeUser, resetPickedDatas } from "../../utils/Store";
import CannotAccess from "../../components/CannotAccess/CannotAccess";

export default function AddExerciseContainer() {
  const types = ["전체", "상체", "하체"];
  const [importUpperDatas, setImportUpperDatas] = useState<boolean>(false);
  const [importLowerDatas, setImportLowerDatas] = useState<boolean>(false);
  const [allDatas, setAllDatas] = useState<boolean>(true);

  const upperData = typeData.data.filter((data) => data.type === "상체");
  const lowerData = typeData.data.filter((data) => data.type === "하체");
  const pickedDatas = useSelector((state: RootState) => state.pickedDatas.pickedDatas);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
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
  const handleType = (e: React.MouseEvent<HTMLButtonElement>) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if ((e.target as HTMLElement).innerText === "상체") {
      setImportUpperDatas(true);
      setImportLowerDatas(false);
      setAllDatas(false);
    } else if ((e.target as HTMLElement).innerText === "하체") {
      setImportLowerDatas(true);
      setImportUpperDatas(false);
      setAllDatas(false);
    } else if ((e.target as HTMLElement).innerText === "전체") {
      setAllDatas(true);
      setImportUpperDatas(false);
      setImportLowerDatas(false);
    }
  };

  const handleRecordPage = () => {
    navigate("/record");
  };
  console.log(upperData);
  return (
    <>
      {user.uid ? (
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
            handleRecordPage={handleRecordPage}
          />
        </>
      ) : (
        <CannotAccess />
      )}
    </>
  );
}
