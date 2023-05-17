import React from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onChange, search, setSearch }) {
  return (
    <div>
      <input
        className={styles.inputFilter}
        placeholder="검색"
        onChange={onChange}
        value={search}
        name="search"
      />
    </div>
  );
}
