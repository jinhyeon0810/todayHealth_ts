import styles from "./TextCard.module.css";

interface Props {
  product: {
    url: string;
    category: string;
    title: string;
    creatorId: string;
  };
}

export default function TextCard({ product }: Props): React.ReactElement {
  return (
    <section className={styles.style}>
      <div className={styles.component}>
        <div className={styles.imageArea}>
          <img className={styles.images} src={product.url} />
        </div>
      </div>
    </section>
  );
}
