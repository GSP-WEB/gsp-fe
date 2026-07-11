"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import ScoreCardSection from "@/components/ScoreCardSection/ScoreCardSection";
import styles from "./page.module.scss";
import { scoreCardSections } from "@/data/scoreCardSections";

export default function ScoreCardOverview() {
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(scoreCardSections.map((s) => [s.id, true])),
  );

  const toggle = (id: string) =>
    setVisible((prev) => ({ ...prev, [id]: !prev[id] }));

  const visibleSections = scoreCardSections.filter((s) => visible[s.id]);

  return (
    <div className={styles.content}>
      <main className={styles.main}>
        <div
          className={styles.filterBar}
          role="group"
          aria-label="Filter score card sections"
        >
          {scoreCardSections.map((section) => {
            const isOn = visible[section.id];
            return (
              <button
                key={section.id}
                type="button"
                className={`${styles.chip} ${isOn ? styles.chipActive : ""}`}
                onClick={() => toggle(section.id)}
                aria-pressed={isOn}
              >
                <span className={styles.chipDot} />
                {section.label}
              </button>
            );
          })}
        </div>

        {visibleSections.length === 0 && (
          <p className={styles.empty}>
            Select at least one section above to view its KPIs.
          </p>
        )}

        {visibleSections.map((section) => (
          <ScoreCardSection
            key={section.id}
            title={section.label}
            cards={section.cards}
            keyPrefix={`${section.id}-`}
          />
        ))}

        <div className={styles.footer}>
          Data Last Updated: 6/24/2026 10:34:04 PM (Some items on the page have
          not been updated)
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
