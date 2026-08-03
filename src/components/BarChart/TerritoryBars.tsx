"use client";
import { TerritoryBar } from "@/mock-data/scoreCard";
import styles from "./TerritoryBars.module.scss";

interface Props {
  bars: TerritoryBar[];
}

export default function TerritoryBars({ bars }: Props) {
  const maxVal = Math.max(
    ...bars.filter((b) => b.value !== null).map((b) => b.value as number),
    100,
  );

  return (
    <div className={styles.container}>
      {bars.map((bar) => (
        <div key={bar.territory} className={styles.row}>
          <span className={styles.label}>{bar.territory}</span>
          <div className={styles.barTrack}>
            {bar.value !== null ? (
              <>
                <div
                  className={styles.bar}
                  style={{ width: `${(bar.value / maxVal) * 100}%` }}
                />
                <span className={styles.value}>{bar.value}%</span>
              </>
            ) : (
              <div className={styles.empty} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
