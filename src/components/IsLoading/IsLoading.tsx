import styles from "./IsLoading.module.css";

export default function IsLoading() {
  return (
    <div className={styles.isLoading}>
      <img className={styles.loadingGif} src="/loading.gif" />
    </div>
  );
}
