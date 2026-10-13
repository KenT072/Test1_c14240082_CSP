import { useEffect, useMemo, useRef, useState } from "react";
import AddMenuForm from "./components/AddMenuForm";
import FilterBar from "./components/FilterBar";
import Keranjang from "./components/Keranjang";
import MenuList from "./components/MenuList";
import TimerSesi from "./components/TimerSesi";
import styles from "./components/ui.module.css";
import { semuaMenu } from "./data/menu";

const STORAGE_KEY = "kantinkita-cart";

export default function App() {
  const [menu, setMenu] = useState(semuaMenu);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("semua");
  const [showTimer, setShowTimer] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const searchInputRef = useRef(null);
  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    document.title = totalItems > 0 ? `(${totalItems}) KantinKita` : "KantinKita";
  }, [cart]);

  const categories = useMemo(
    () => ["semua", ...new Set(menu.map((item) => item.kategori))],
    [menu]
  );

  const visibleMenu = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return menu.filter((item) => {
      const matchesKeyword = keyword === "" || item.nama.toLowerCase().includes(keyword);
      const matchesCategory =
        activeCategory === "semua" || item.kategori === activeCategory;

      return matchesKeyword && matchesCategory;
    });
  }, [activeCategory, menu, searchTerm]);

  const handleAddToCart = (menuItem) => {
    if (menuItem.stok === 0) {
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === menuItem.id);

      if (existing) {
        return prev.map((item) =>
          item.id === menuItem.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...menuItem, qty: 1 }];
    });
  };

  const handleUpdateQty = (id, delta) => {
    setCart((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) {
          return [item];
        }

        const nextQty = item.qty + delta;
        return nextQty > 0 ? [{ ...item, qty: nextQty }] : [];
      })
    );
  };

  const handleRemoveItem = (id) => {
    const toRemove = cart.find((item) => item.id === id);

    if (!toRemove) {
      return;
    }

    const confirmed = window.confirm(`Hapus ${toRemove.nama} dari keranjang?`);
    if (!confirmed) {
      return;
    }

    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const handleAddMenu = (newMenu) => {
    setMenu((prev) => [...prev, newMenu]);
  };

  return (
    <div className={styles.appShell}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>KantinKita</h1>
          <p className={styles.pageSubtitle}>Pesan makanan favoritmu di kampus.</p>
        </div>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => setShowTimer((prev) => !prev)}
        >
          {showTimer ? "Sembunyikan timer" : "Tampilkan timer"}
        </button>
      </header>

      <div className={styles.layout}>
        <main className={`${styles.panel} ${styles.mainPanel}`}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Menu</h2>
          </div>

          <FilterBar
            keyword={searchTerm}
            onKeywordChange={setSearchTerm}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onClear={handleClearSearch}
            inputRef={searchInputRef}
          />

          <MenuList
            menu={visibleMenu}
            onAddToCart={handleAddToCart}
            activeCategory={activeCategory}
            keyword={searchTerm}
          />

          <AddMenuForm categories={categories.filter((value) => value !== "semua")} onSubmit={handleAddMenu} />
        </main>

        <aside className={`${styles.panel} ${styles.sidePanel}`}>
          <div className={styles.timerHeader}>
            <h2 className={styles.panelTitle}>Ringkasan</h2>
          </div>

          {showTimer ? <TimerSesi elapsed={elapsed} onTick={setElapsed} /> : null}

          <div style={{ marginTop: 18 }}>
            <Keranjang
              cart={cart}
              onIncrease={(id) => handleUpdateQty(id, 1)}
              onDecrease={(id) => handleUpdateQty(id, -1)}
              onRemove={handleRemoveItem}
            />
          </div>

        </aside>
      </div>
    </div>
  );
}
