"use client";
import { useRef, useState } from "react";
import { KpiCardData } from "@/mock-data/scoreCard";
import TrendPanel from "./TrendPanel";
import styles from "./KpiCard.module.scss";

interface Props {
  data: KpiCardData;
  wide?: boolean;
}

// How much horizontal room (px) the panel needs before we decide it'd run
// off the right edge and should hug the right side of the card instead.
const PANEL_WIDTH = 460;

interface MomDelta {
  month: string;
  delta: number;
}

// Month-over-month delta from the last two non-null points in the trend.
// NOTE: this assumes "higher is better" (green on increase, amber on
// decrease), which holds for most of these KPIs (selling %, install
// quality, etc.) but would be backwards for a metric where lower is
// better (e.g. latency, congestion). There's no per-KPI "direction"
// field in the data model yet — add one if you need per-card control.
function getMomDelta(data: KpiCardData): MomDelta | null {
  const points = data.monthlyTrend.filter((d) => d.value !== null);
  if (points.length < 2) return null;
  const latest = points[points.length - 1];
  const prior = points[points.length - 2];
  const delta = Math.round((latest.value! - prior.value!) * 10) / 10;
  return { month: latest.month, delta };
}

interface PanelPos {
  top: number;
  left: number;
}

export default function KpiCard({ data, wide = false }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [panelPos, setPanelPos] = useState<PanelPos>({ top: 0, left: 0 });

  const computePos = () => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const left =
      rect.left + PANEL_WIDTH > window.innerWidth
        ? Math.max(0, rect.right - PANEL_WIDTH)
        : rect.left;
    setPanelPos({ top: rect.bottom + 6, left });
  };

  if (data.workInProgress) {
    return (
      <div
        className={`${styles.card} ${wide ? styles.wide : ""} ${styles.wip}`}
      >
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
  const mom = hasValue ? getMomDelta(data) : null;

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${wide ? styles.wide : ""} ${hasDetail ? styles.hoverable : ""}`}
      onMouseEnter={computePos}
      onFocus={computePos}
    >
      <div className={styles.header}>
        <span className={styles.headerTitle}>{data.title}</span>
      </div>

      {mom && (
        <div className={styles.asOf}>as of {mom.month.toUpperCase()}</div>
      )}

      <div className={styles.body}>
        {hasValue ? (
          <>
            <div className={styles.kpiValue}>
              {data.overallValue}
              {data.unit}
            </div>
            {mom && mom.delta !== 0 && (
              <div
                className={`${styles.delta} ${mom.delta > 0 ? styles.deltaUp : styles.deltaDown}`}
              >
                <span className={styles.deltaArrow}>
                  {mom.delta > 0 ? "▲" : "▼"}
                </span>
                MoM: {mom.delta > 0 ? "+" : ""}
                {mom.delta}
                {data.unit}
              </div>
            )}
            {mom && mom.delta === 0 && (
              <div className={styles.deltaFlat}>— No change MoM</div>
            )}
          </>
        ) : (
          <div className={styles.kpiDash}>-</div>
        )}
      </div>

      {hasDetail && (
        <div
          className={styles.hoverPanel}
          style={{ top: panelPos.top, left: panelPos.left }}
        >
          <TrendPanel data={data} />
        </div>
      )}
    </div>
  );
}
