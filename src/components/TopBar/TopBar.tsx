"use client";
import styles from "./TopBar.module.scss";

export default function TopBar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <span className={styles.icon}>⊙</span>
        <h1 className={styles.title}>[GT] GSP PERFORMANCE DASHBOARD</h1>
      </div>
      <div className={styles.actions}>
        <button className={styles.btnReset}>↩ Reset</button>
        <button className={styles.btnShare}>
          <span>👤+</span> Share <span className={styles.chevron}>▾</span>
        </button>
        <button className={styles.btnMore}>⋮</button>
        <div className={styles.avatar}>G</div>
      </div>
    </header>
  );
}
