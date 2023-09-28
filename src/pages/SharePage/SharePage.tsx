import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import styles from "./SharePage.module.css";
import { Link, useNavigate } from "react-router-dom";
import TextCard from "../../components/TextCard/TextCard";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import db, { onUserStateChange } from "../../api/firebase";
import ReactPaginate from "react-paginate";
import { RootState, changeUser } from "../../utils/Store";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import CannotAccess from "../../components/CannotAccess/CannotAccess";
import IsLoading from "../../components/IsLoading/IsLoading";
interface ProductProps {
  title: string;
  content: string;
  category: string;
  id: string;
  url: string;
  creatorId: string;
}
export default function SharePage(): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (changeUser) {
      onUserStateChange((user: { uid: string | null; displayName: string | null; photoURL: string | undefined }) => {
        dispatch(changeUser({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }));
      });
    }
  }, [changeUser]);

  const productsPerPage = 5;
  const [offset, setOffset] = useState(0);
  const endOffset = offset + productsPerPage;
  const currentProducts = products.slice(offset, endOffset);
  const pageCount = Math.ceil(products.length / productsPerPage);

  //페이지 클릭시 offset을 변경해주고, 그에따른 data를 불러옵니다.
  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * productsPerPage) % products.length;
    setOffset(newOffset);
    getData();
  };

  const moveToBoard = () => {
    if (!user) {
      alert("로그인 하셔야 되는데.. 😬");
      return;
    }
    navigate("/board");
  };

  const getData = useCallback(async () => {
    if (!user.uid) {
      setLoading(false);
    }
    setLoading(true);
    const first = query(collection(db, "product"), orderBy("timeStamp", "desc"));
    const documentSnapshots = await getDocs(first);

    const contentArr = documentSnapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProductProps[];

    setProducts(contentArr);
    setLoading(false);
  }, [user.uid]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    getData();
  }, [getData]);

  return (
    <>
      {loading && <IsLoading />}
      {!user.uid && !loading && <CannotAccess />}
      {user.uid && (
        <article className={styles.sharePage}>
          {currentProducts.length === 0 && !loading && <div className={styles.noImage}> 이미지가 없습니다</div>}
          <section className={styles.cardStyle}>
            {currentProducts.map((product) => {
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
      )}
    </>
  );
}
