import Sidebar from "@/components/Sidebar/Sidebar";
import ScoreCardSection from "@/components/ScoreCardSection/ScoreCardSection";
import styles from "./page.module.scss";
import { scoreCardSections } from "@/data/scoreCardSections";

const section = scoreCardSections.find((s) => s.id === "last-mile-repair")!;

export default function LastMileRepairPage() {
  return (
    <div className={styles.content}>
      <main className={styles.main}>
        <ScoreCardSection title={section.label} cards={section.cards} />

        <div className={styles.footer}>
          Data Last Updated: 6/24/2026 10:34:04 PM (Some items on the page have
          not been updated)
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
