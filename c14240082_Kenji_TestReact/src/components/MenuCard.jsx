import Badge from "./Badge";
import styles from "./ui.module.css";

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function MenuCard({ item, onAddToCart }) {
  const habis = item.stok === 0;

  return (
    <article className={`${styles.menuCard} ${habis ? styles.menuCardDisabled : ""}`}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.menuName}>{item.nama}</h3>
          <p className={styles.menuMeta}>{item.kategori}</p>
        </div>
        <Badge tone={habis ? "danger" : "default"}>{habis ? "Habis" : "Tersedia"}</Badge>
      </div>

      <div className={styles.priceRow}>
        <span>Harga</span>
        <span className={styles.priceValue}>{formatRupiah(item.harga)}</span>
      </div>

      <div className={styles.stockRow}>
        <span>Stok</span>
        <span>{item.stok}</span>
      </div>

      <button
        type="button"
        className={styles.addButton}
        onClick={() => onAddToCart(item)}
        disabled={habis}
      >
        Tambah
      </button>
    </article>
  );
}
