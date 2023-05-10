import React from "react";
import styles from "./Pagination.module.css";

interface Props {
  maxPage: number;
  currentPage: number;
  onClickPageButton: string;
}

export default function Pagination({
  maxPage,
  currentPage,
  onClickPageButton,
}): React.ReactElement {
  return (
    <div>
      <button>{"< Previous"}</button>
      {new Array(maxPage).fill(null).map((_, i) => (
        <PageButton number={i + 1} />
      ))}

      <button>{"Next >"}</button>
    </div>
  );
}

function PageButton({ number }): React.ReactElement {
  return <button className={styles.button}>{number}</button>;
}
