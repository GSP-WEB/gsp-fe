import Sidebar from "@/components/Sidebar/Sidebar";
import KpiCard from "@/components/KpiCard/KpiCard";
import Grid from "@/components/Grid/Grid";
import styles from "./page.module.scss";
import {
  b2cGfpSellingJan,
  b2cGfpSellingGay,
  b2cSellingAchievement,
  b2cInstallSlotAdherence,
  b2bInstallSlotAdherence,
  b2bB2cSlotAvailability,
  b2cInstallWithin24h,
  b2bInstallWithin24h,
  b2bCoreDataSchedule,
  b2cB2bQualityInstall,
  b2cAcquisitionQuality,
} from "@/data/scoreCard";

const cards = [
  b2cGfpSellingJan,
  b2cGfpSellingGay,
  b2cSellingAchievement,
  b2cInstallSlotAdherence,
  b2bInstallSlotAdherence,
  b2bB2cSlotAvailability,
  b2cInstallWithin24h,
  b2bInstallWithin24h,
  b2bCoreDataSchedule,
  b2cB2bQualityInstall,
  b2cAcquisitionQuality,
];

export default function SellingAndInstallation() {
  return (
    <div className={styles.content}>
      <main className={styles.main}>
        <Grid minColumnWidth={260} columns={3}>
          {cards.map((card) => (
            <KpiCard key={card.id} data={card} />
          ))}
        </Grid>

        <div className={styles.footer}>
          Data Last Updated: 6/24/2026 10:34:04 PM (Some items on the page have
          not been updated)
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
