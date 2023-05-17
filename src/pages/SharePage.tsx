import React, { useRef, useCallback } from "react";
import Pagination from "../Pagination";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import styles from "./SharePage.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Filter } from "./board";
import TextCard from "../components/TextCard";
import {
  collection,
  endAt,
  endBefore,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  startAt,
} from "firebase/firestore";
import db from "../api/firebase";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import SearchBar from "../components/SearchBar";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<{ uid: string }>>;
  user?: { uid: string };
  type: string;
}

export default function SharePage({
  user,
  setUser,
  type,
  setType,
  imageList,
  setImageList,
}: Props): React.ReactElement {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [firstDoc, setFirstDoc] = useState();
  const [lastDoc, setLastDoc] = useState();
  const maxPage = 2;

  const moveToBoard = () => {
    if (!user) {
      alert("로그인 하셔야 되는데.. 😬");
      return;
    }
    navigate("/board");
  };

  const getData = useCallback(async () => {
    const first = query(
      collection(db, "product"),
      orderBy("createdAt", "desc"),
      limit(8)
    );
    const documentSnapshots = await getDocs(first);

    const contentArr = documentSnapshots.docs.map((doc) => ({
      id: doc.id,
      page,
      ...doc.data(),
    }));
    const firstVisible = documentSnapshots.docs[0];
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
    setFirstDoc(firstVisible);
    setProducts(contentArr);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  console.log(page);
  const prevButton = async () => {
    if (page == 1) return;
    setPage((prev) => prev - 1);
    const prev = query(
      collection(db, "product"),
      orderBy("createdAt", "desc"),
      endBefore(firstDoc),
      limit(8)
    );

    const documentSnapshots = await getDocs(prev);
    const contentArr = documentSnapshots.docs.map((doc) => ({
      id: doc.id,
      page,
      ...doc.data(),
    }));
    console.log(contentArr);

    setProducts(contentArr);
    const firstVisible = documentSnapshots.docs[0];
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
    setFirstDoc(firstVisible);
  };

  const nextButton = async () => {
    setPage((prev) => prev + 1);
    const next = query(
      collection(db, "product"),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(8)
    );

    const documentSnapshots = await getDocs(next);
    const contentArr = documentSnapshots.docs.map((doc) => ({
      id: doc.id,
      page,
      ...doc.data(),
    }));
    console.log(contentArr);
    setProducts(contentArr);
    const firstVisible = documentSnapshots.docs[0];
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
    setFirstDoc(firstVisible);
    console.log(documentSnapshots);
    console.log(lastVisible);
  };

  const onClickPage = (number) => {
    setPage(number);

    if (number == 1) {
      prevButton();
    }

    if (number == 2) {
      nextButton();
    }
  };

  // 검색창 만들기
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const filterTitle = products.filter((product) => {
    return product.title
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
  });

  console.log(filterTitle);

  console.log(search);

  return (
    <>
      <div>
        <Header user={user} setUser={setUser} />

        <div className={styles.title}>전체게시물 📝</div>
        <div className={styles.filter}>
          <SearchBar
            onChange={onChange}
            search={search}
            setSearch={setSearch}
          />
        </div>
        <div className={styles.cardStyle}>
          {filterTitle.map((product) => {
            return (
              <Link
                to={{
                  pathname: `/${product.id}`,
                }}
                key={product.id}
              >
                <TextCard
                  product={product}
                  user={user}
                  setUser={setUser}
                  imageList={imageList}
                />
              </Link>
            );
          })}
        </div>

        <div className={styles.write} onClick={moveToBoard}>
          {" "}
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            게시글
          </span>{" "}
          작성하러 가기~🐱‍🏍
        </div>

        <div className={styles.wrapper}>
          <Pagination
            maxPage={maxPage}
            currentPage={page}
            onClickPageButton={onClickPage}
            prevButton={prevButton}
            nextButton={nextButton}
          />
        </div>
      </div>
    </>
  );
}
