import styles from "./TextComponent.module.css";

export default function TextComponent({ text }) {
  return (
    <>
      <pre className={styles.text}>{text.text}</pre>
    </>
  );
}
