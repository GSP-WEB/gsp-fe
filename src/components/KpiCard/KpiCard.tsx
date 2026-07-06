'use client';
import { KpiCardData } from '@/data/scoreCard';
import TrendPanel from './TrendPanel';
import styles from './KpiCard.module.scss';

interface Props {
  data: KpiCardData;
  wide?: boolean;
  /** Which edge the hover panel should hug — use "right" for the last card in a row so the panel doesn't run off the page. */
  align?: 'left' | 'right';
}

export default function KpiCard({ data, wide = false, align = 'left' }: Props) {
  if (data.workInProgress) {
    return (
      <div className={`${styles.card} ${wide ? styles.wide : ''} ${styles.wip}`}>
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
    <div className={`${styles.card} ${wide ? styles.wide : ''} ${hasDetail ? styles.hoverable : ''}`}>
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
        <div className={`${styles.hoverPanel} ${align === 'right' ? styles.alignRight : ''}`}>
          <TrendPanel data={data} />
        </div>
      )}
    </div>
  );
}
