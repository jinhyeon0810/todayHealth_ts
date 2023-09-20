import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import styles from "./SharePage.module.css";
import { Link, useNavigate } from "react-router-dom";
import TextCard from "../../components/TextCard/TextCard";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import db from "../../api/firebase";
import ReactPaginate from "react-paginate";
import { RootState } from "../../utils/Store";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";

interface ProductProps {
  title: string;
  content: string;
  category: string;
  id: string;
  url: string;
  creatorId: string;
}

export default function SharePage(): React.ReactElement {
  const user = useSelector((state: RootState) => state.user);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const navigate = useNavigate();

  const productsPerPage = 10;
  const [offset, setOffset] = useState(0);
  const endOffset = offset + productsPerPage;
  const currentProducts = products.slice(offset, endOffset);
  const pageCount = Math.ceil(products.length / productsPerPage);
  //페이지 클릭시 offset을 변경해주고, 그에따른 data를 불러옵니다.
  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * productsPerPage) % products.length;
    console.log(newOffset);
    setOffset(newOffset);
    getData();
  };
  console.log(offset);
  console.log(endOffset);
  const moveToBoard = () => {
    if (!user) {
      alert("로그인 하셔야 되는데.. 😬");
      return;
    }
    navigate("/board");
  };

  const getData = useCallback(async () => {
    const first = query(collection(db, "product"), orderBy("timeStamp", "desc"));
    const documentSnapshots = await getDocs(first);

    const contentArr = documentSnapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProductProps[];

    setProducts(contentArr);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getData();
  }, [getData]);

  // 검색창 만들기
  const [search, setSearch] = useState<string>("");

  const filterTitle = currentProducts.filter((product) => {
    return product.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  console.log(filterTitle);

  console.log(search);

  return (
    <>
      <article className={styles.sharePage}>
        {/* <div className={styles.title}>전체게시물 📝</div>

        <SearchBar search={search} setSearch={setSearch} /> */}
        <section className={styles.cardStyle}>
          {filterTitle.map((product) => {
            return (
              <Link
                to={{
                  pathname: `/${product.id}`,
                }}
                key={product.id}
              >
                <TextCard product={product} />
              </Link>
            );
          })}
        </section>

        <section className={styles.wrapper}>
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={productsPerPage}
            breakLabel={"..."}
            previousLabel={"이전"}
            nextLabel={"다음"}
            onPageChange={handlePageClick}
            containerClassName={styles.pagination}
            activeClassName={styles.currentPage}
            previousClassName={styles.previous}
            nextClassName={styles.next}
          />
        </section>

        <section className={styles.write} onClick={moveToBoard}>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>게시글</span> 작성하러 가기~🐱‍🏍
        </section>

        <Footer />
      </article>
    </>
  );
}
