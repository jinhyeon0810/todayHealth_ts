import styles from "./TextComponent.module.css";

interface TextCompoProps {
  text: {
    text: string;
  };
}
export default function TextComponent({ text }: TextCompoProps) {
  return (
    <>
      <pre className={styles.text}>{text.text}</pre>
    </>
  );
}
