import React, { useState, useEffect } from "react";
import styles from "./Snow.module.css";

export default function Snow({ style }): React.ReactElement {
  return (
    <p style={style} className={styles.snowFlake}>
      &#127800; d &#127800; d &#127800; d &#127800; d &#127800; d &#127800; d
      &#127800; d &#127800; d &#127800; d &#127800; d &#127800; d &#127800; d
    </p>
  );
}

const makeSnow = () => {
  let animationDelay = "0s";
  let fontSize = "14px";
  const arr = Array.from("abcdefghijklmnopqrstuvwxyz");

  return arr.map((element, i) => {
    animationDelay = `${(Math.random() * 16).toFixed(2)}s`;
    fontSize = `${Math.random() * 10 + 10}px`;
    const style = {
      animationDelay,
      fontSize,
    };
    return <Snow key={i} style={style} />;
  });
};

const FallingSnow = () => {
  <div className={styles.snowContainer}>{makeSnow()}</div>;
};
