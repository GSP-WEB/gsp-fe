'use client';
import { KpiCardData } from '@/data/scoreCard';
import MiniBarChart from '../BarChart/MiniBarChart';
import TerritoryBars from '../BarChart/TerritoryBars';
import styles from './KpiCard.module.scss';

interface Props {
  data: KpiCardData;
  wide?: boolean;
}

export default function KpiCard({ data, wide = false }: Props) {
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

  return (
    <div className={`${styles.card} ${wide ? styles.wide : ''}`}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>{data.title}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.chartSection}>
          {hasValue && (
            <div className={styles.kpiValue}>
              {data.overallValue}
              {data.unit}
            </div>
          )}
          {!hasValue && <div className={styles.kpiDash}>-</div>}
          <MiniBarChart data={data.monthlyTrend} />
        </div>
        <div className={styles.territorySection}>
          <TerritoryBars bars={data.territoryBars} />
        </div>
      </div>
    </div>
  );
}
