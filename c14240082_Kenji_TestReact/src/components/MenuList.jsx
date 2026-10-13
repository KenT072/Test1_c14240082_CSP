import MenuCard from "./MenuCard";
import styles from "./ui.module.css";

export default function MenuList({ menu, onAddToCart, activeCategory, keyword }) {
  if (menu.length === 0) {
    const keywordText = keyword.trim() ? `"${keyword.trim()}"` : "pilihan saat ini";
    const categoryText = activeCategory !== "semua" ? ` di kategori "${activeCategory}"` : "";

    return (
      <div className={styles.emptyState}>
        Tidak ada menu yang cocok dengan kata kunci {keywordText}{categoryText}.
      </div>
    );
  }

  return (
    <div className={styles.menuGrid}>
      {menu.map((item) => (
        <MenuCard key={item.id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
