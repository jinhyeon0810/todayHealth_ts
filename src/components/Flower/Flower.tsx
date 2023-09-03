import React from "react";
import styles from "./Flower.module.css";

function Flower() {
  const flowerArray = [];
  for (let i = 1; i <= 30; i++) {
    flowerArray.push(i);
  }
  const IMG_SRC = "https://cdn.crowdpic.net/detail-thumb/thumb_d_2585BEDB390ADAC6CEB0FF3482B0D396.png";
  console.log(flowerArray);
  return (
    <>
      {flowerArray.map((f) => {
        return (
          <img
            key={f}
            className={styles.flower}
            src={IMG_SRC}
            style={{
              marginLeft: Math.random() * window.innerWidth * 0.95,
              top: Math.random() * window.innerHeight,
            }}
          ></img>
        );
      })}
    </>
  );
}

export default React.memo(Flower);
