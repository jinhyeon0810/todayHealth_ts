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
    <div className={styles.style}>
      <div className={styles.component}>
        <div className={styles.imageArea}>
          <img className={styles.images} src={product.url} />
        </div>
        <div className={styles.contentArea}>
          <div className={styles.type}> Category : {product.category}</div>
          <div className={styles.title}>{product.title.length > 6 ? `${product.title.substr(0, 6) + "..."}` : product.title} </div>
        </div>
        <div className={styles.userId}> id : {product.creatorId.substr(0, 4)}</div>
      </div>
    </div>
  );
}
