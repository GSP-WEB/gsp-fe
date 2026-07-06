import TopBar from "@/components/TopBar/TopBar";
import NavBar from "@/components/NavBar/NavBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import KpiCard from "@/components/KpiCard/KpiCard";
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

export default function ScoreCardPage() {
  return (
    <div className={styles.shell}>
      <NavBar />
      <div className={styles.content}>
        <main className={styles.main}>
          {/* Row 1: GFP Selling */}
          <div className={styles.grid3}>
            <KpiCard data={b2cGfpSellingJan} />
            <KpiCard data={b2cGfpSellingGay} />
            <KpiCard data={b2cSellingAchievement} align="right" />
          </div>

          {/* Row 2: Slot Adherence */}
          <div className={styles.grid3}>
            <KpiCard data={b2cInstallSlotAdherence} />
            <KpiCard data={b2bInstallSlotAdherence} />
            <KpiCard data={b2bB2cSlotAvailability} align="right" />
            {/* <KpiCard data={b2cGfpSellingJan} />
            <KpiCard data={b2cGfpSellingGay} />
            <KpiCard data={b2cSellingAchievement} align="right" /> */}
          </div>

          {/* Row 3: Install Within 24h */}
          <div className={styles.grid3}>
            <KpiCard data={b2cInstallWithin24h} />
            <KpiCard data={b2bInstallWithin24h} />
            <KpiCard data={b2bCoreDataSchedule} align="right" />
          </div>

          {/* Row 4: Quality + Acquisition */}
          <div className={styles.grid2}>
            <KpiCard data={b2cB2bQualityInstall} />
            <KpiCard data={b2cAcquisitionQuality} align="right" />
          </div>

          <div className={styles.footer}>
            Data Last Updated: 6/24/2026 10:34:04 PM (Some items on the page
            have not been updated)
          </div>
        </main>
        <Sidebar />
      </div>
    </div>
  );
}
