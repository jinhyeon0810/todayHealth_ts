import { useEffect } from "react";
import styles from "./CannotAccess.module.css";
import { useNavigate } from "react-router-dom";

export default function CannotAccess() {
  const navigate = useNavigate();
  return (
    <section className={styles.cannotAccess}>
      <div>로그인 하셔야 이용할 수 있습니다</div>
      <div onClick={() => navigate("/")} className={styles.backToPage}>
        되돌아가기
      </div>
    </section>
  );
}
