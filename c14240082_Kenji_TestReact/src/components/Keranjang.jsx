import styles from "./ui.module.css";

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function Keranjang({ cart, onIncrease, onDecrease, onRemove }) {
  const totalItem = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalHarga = cart.reduce((sum, item) => sum + item.qty * item.harga, 0);

  return (
    <div>
      <h3 className={styles.panelTitle}>Keranjang</h3>
      {cart.length === 0 ? (
        <p className={styles.emptyCart}>Belum ada item di keranjang.</p>
      ) : (
        <div className={styles.cartList}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.cartItemInfo}>
                <span className={styles.cartItemName}>{item.nama}</span>
                <span className={styles.cartPrice}>{formatRupiah(item.harga)} / item</span>
              </div>

              <div className={styles.qtyWrap}>
                <button type="button" className={styles.qtyButton} onClick={() => onDecrease(item.id)}>
                  −
                </button>
                <span className={styles.qtyValue}>{item.qty}</span>
                <button type="button" className={styles.qtyButton} onClick={() => onIncrease(item.id)}>
                  +
                </button>
                <button
                  type="button"
                  className={styles.inlineDeleteButton}
                  onClick={() => onRemove(item.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Jumlah item</span>
          <strong>{totalItem}</strong>
        </div>
        <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
          <span>Total harga</span>
          <span>{formatRupiah(totalHarga)}</span>
        </div>
      </div>
    </div>
  );
}
