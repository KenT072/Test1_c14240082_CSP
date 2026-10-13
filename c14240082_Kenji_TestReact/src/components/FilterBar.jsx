import styles from "./ui.module.css";

export default function FilterBar({
  keyword,
  onKeywordChange,
  categories,
  activeCategory,
  onCategoryChange,
  onClear,
  inputRef,
}) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.searchRow}>
        <input
          ref={inputRef}
          type="search"
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          placeholder="Cari menu..."
          className={styles.searchInput}
          aria-label="Cari menu"
        />
        {keyword && (
          <button type="button" className={styles.clearButton} onClick={onClear}>
            Bersihkan
          </button>
        )}
      </div>

      <div className={styles.categoryWrap}>
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const label = category === "semua" ? "Semua" : category;

          return (
            <button
              key={category}
              type="button"
              className={`${styles.categoryButton} ${isActive ? styles.categoryButtonActive : ""}`}
              onClick={() => onCategoryChange(category)}
              aria-pressed={isActive}
            >
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
