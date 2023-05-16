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
  prevButton,
  nextButton,
}: Props): React.ReactElement {
  return (
    <div className={styles.wrapper}>
      <button onClick={prevButton}>{"< Previous"}</button>
      {new Array(maxPage).fill(null).map((_, i) => (
        <PageButton number={i + 1} key={i} onClick={onClickPageButton} />
      ))}

      <button onClick={nextButton}>{"Next >"}</button>
    </div>
  );
}

function PageButton({ number, onClick }): React.ReactElement {
  return (
    <button className={styles.button} onClick={() => onClick(number)}>
      {number}
    </button>
  );
}
