import React, { useEffect, useState } from "react";
import styles from "./Flower.module.css";

function Flower() {
  const [browserSize, setBrowserSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const flowerArray = [];
  for (let i = 1; i <= 50; i++) {
    flowerArray.push(i);
  }
  const IMG_SRC = "https://cdn.crowdpic.net/detail-thumb/thumb_d_2585BEDB390ADAC6CEB0FF3482B0D396.png";

  const handleResize = () => {
    setBrowserSize({
      width: window.innerWidth * 0.9,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {flowerArray.map((f) => {
        return (
          <img
            key={f}
            className={styles.flower}
            src={IMG_SRC}
            style={{
              marginLeft: Math.random() * browserSize.width * 0.9,
              top: Math.random() * browserSize.height * 0.5,
            }}
          ></img>
        );
      })}
    </>
  );
}

export default React.memo(Flower);
