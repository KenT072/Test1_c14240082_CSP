import styles from "./ui.module.css";

export default function Badge({ children, tone = "default" }) {
  const className = tone === "danger" ? styles.badgeDanger : styles.badgeDefault;

  return <span className={`${styles.badge} ${className}`}>{children}</span>;
}
