"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import ScoreCardSection from "@/components/ScoreCardSection/ScoreCardSection";
import styles from "./page.module.scss";
import {
  useEagleEyeMonthlyChart,
  toKpiCardDataFromMonthly,
} from "@/hooks/useEagleEyeMonthlyChart";

export default function LastMileRepairPage() {
  // TODO: swap demand to "FOSP", chart_position to "score_card",
  // chart_level to "last_mile_repair" when FOSP data is available.
  const { data, isLoading, isError } = useEagleEyeMonthlyChart({
    demand: "Eagle Eye",
    chart_position: "MOB",
    chart_level: "LIB",
    // limit: 7,
  });

  const cards = Object.values(data?.data ?? {}).map(toKpiCardDataFromMonthly);

  return (
    <div className={styles.content}>
      <main className={styles.main}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Failed to load KPI data.</p>}
        {!isLoading && !isError && (
          <ScoreCardSection title="Last Mile Repair" cards={cards} />
        )}
        <div className={styles.footer}>
          Data Last Updated: 6/24/2026 10:34:04 PM (Some items on the page have
          not been updated)
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
