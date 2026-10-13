
import { useEffect } from "react";
import styles from "./ui.module.css";

export default function TimerSesi({ elapsed, onTick }) {
  useEffect(() => {
    const timerId = setInterval(() => {
      onTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [onTick]);

  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");

  return (
    <div className={styles.timerBox}>
      <span>Sesi aktif</span>
      <strong className={styles.timerValue}>
        {minutes}:{seconds}
      </strong>
    </div>
  );
}
