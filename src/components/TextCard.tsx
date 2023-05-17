import React, { useState, useEffect } from "react";
import styles from "./TextCard.module.css";
import { deleteDoc, doc } from "firebase/firestore";
import db from "../api/firebase";
import { useNavigate } from "react-router-dom";

interface Props {
  setUser?: React.Dispatch<React.SetStateAction<{ uid: string }>>;
  user?: { uid: string };
}

export default function TextCard({
  products,
  setProducts,
  product,
  user,
  setUser,
  imageList,
}: Props): React.ReactElement {
  const navigate = useNavigate();

  return (
    <div className={styles.style}>
      <div className={styles.component}>
        <div className={styles.imageArea}>
          <img className={styles.images} src={product.url} />
        </div>
        <div className={styles.contentArea}>
          <div className={styles.type}> Category : {product.category}</div>
          <div className={styles.title}>
            {product.title.length > 6
              ? `${product.title.substr(0, 6) + "..."}`
              : product.title}{" "}
          </div>
        </div>
        <div className={styles.userId}>
          {" "}
          id : {product.creatorId.substr(0, 4)}
        </div>
      </div>
    </div>
  );
}
