"use client";
import { overallRatings, kpiDates } from "@/mock-data/scoreCard";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      {/* Overall Rating */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>OVERALL RATING</span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>TERRITORY ▲</th>
              <th>SCORE</th>
              <th>RATING</th>
            </tr>
          </thead>
          <tbody>
            {overallRatings.map((row) => (
              <tr key={row.territory}>
                <td>{row.territory}</td>
                <td>{row.score}</td>
                <td>{row.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rating Legend */}
      <div className={styles.section}>
        <div className={styles.legendHeader}>** RATING</div>
        <ul className={styles.legend}>
          <li>
            <span className={styles.legendScore}>5</span> - EXCEPTIONAL
          </li>
          <li>
            <span className={styles.legendScore}>4</span> - EXCELLENT
          </li>
          <li>
            <span className={styles.legendScore}>3</span> - GOOD
          </li>
          <li>
            <span className={styles.legendScore}>2</span> - FAIR
          </li>
          <li>
            <span className={styles.legendScore}>1</span> - POOR
          </li>
        </ul>
      </div>

      {/* KPI Dates */}
      <div className={styles.section}>
        <table className={styles.kpiTable}>
          <thead>
            <tr>
              <th>KPI</th>
              <th>DATA AS OF</th>
            </tr>
          </thead>
          <tbody>
            {kpiDates.map((row, i) => (
              <tr key={i}>
                <td>{row.kpi}</td>
                <td className={styles.dateCell}>{row.dataAsOf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </aside>
  );
}
