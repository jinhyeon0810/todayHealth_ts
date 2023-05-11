import React from "react";
import Pagination from "../Pagination";
import { useState } from "react";
import Header from "../components/Header";
import styles from "./SharePage.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<{ uid: string }>>;
  user?: { uid: string };
}

export default function SharePage({
  user,
  setUser,
}: Props): React.ReactElement {
  const maxPage = 10;
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const moveToBoard = () => {
    navigate("/board");
  };

  return (
    <>
      <div>
        <Header user={user} setUser={setUser} />
        <div className={styles.write} onClick={moveToBoard}>
          {" "}
          게시글 작성
        </div>
        <div>
          {/* <div className={styles.title}>전체게시물📝</div>
          <div>이미지(다이어트,벌크업,컷팅에 따라 사진이 바뀜)</div>
          <div>제목1</div>
          <div>내용1</div> */}
        </div>

        <div className={styles.wrapper}>
          <Pagination
            maxPage={maxPage}
            currentPage={page}
            onClickPageButton={(number) => setPage(number)}
          />
        </div>
      </div>
    </>
  );
}
