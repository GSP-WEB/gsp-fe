"use client";
import { useRef, useState } from "react";
import { KpiCardData } from "@/data/scoreCard";
import TrendPanel from "./TrendPanel";
import styles from "./KpiCard.module.scss";

interface Props {
  data: KpiCardData;
  wide?: boolean;
}

// How much horizontal room (px) the panel needs before we decide it'd run
// off the right edge and should hug the right side of the card instead.
const PANEL_WIDTH = 460;

export default function KpiCard({ data, wide = false }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  const checkOverflow = () => {
    const el = cardRef.current;
    if (!el) return;
    const { left } = el.getBoundingClientRect();
    const wouldOverflow = left + PANEL_WIDTH > window.innerWidth;
    setFlipped(wouldOverflow);
  };

  if (data.workInProgress) {
    return (
      <div className={`${styles.card} ${wide ? styles.wide : ""} ${styles.wip}`}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>{data.title}</span>
        </div>
        <div className={styles.wipBody}>
          <span className={styles.wipText}>WORK IN PROGRESS</span>
        </div>
      </div>
    );
  }

  const hasValue = data.overallValue !== null;
  const hasDetail =
    data.monthlyTrend.some((d) => d.value !== null) ||
    data.territoryBars.some((b) => b.value !== null);

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${wide ? styles.wide : ""} ${hasDetail ? styles.hoverable : ""}`}
      onMouseEnter={checkOverflow}
      onFocus={checkOverflow}
    >
      <div className={styles.header}>
        <span className={styles.headerTitle}>{data.title}</span>
      </div>
      <div className={styles.body}>
        {hasValue ? (
          <div className={styles.kpiValue}>
            {data.overallValue}
            {data.unit}
          </div>
        ) : (
          <div className={styles.kpiDash}>-</div>
        )}
      </div>

      {hasDetail && (
        <div className={`${styles.hoverPanel} ${flipped ? styles.alignRight : ""}`}>
          <TrendPanel data={data} />
        </div>
      )}
    </div>
  );
}
