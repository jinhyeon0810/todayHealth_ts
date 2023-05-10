import React from "react";
import Pagination from "../Pagination";
import { useState } from "react";

export default function SharePage(): React.ReactElement {
  const maxPage = 10;
  const [page, setPage] = useState(1);
  return (
    <div>
      오운완 게시판
      <Pagination
        maxPage={maxPage}
        currentPage={page}
        onClickPageButton={(number) => setPage(number)}
      />
    </div>
  );
}
