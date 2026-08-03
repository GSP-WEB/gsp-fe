"use client";
import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import ScoreCardSection from "@/components/ScoreCardSection/ScoreCardSection";
import styles from "./page.module.scss";
import {
  useEagleEyeMonthlyChart,
  toKpiCardDataFromMonthly,
} from "@/hooks/useEagleEyeMonthlyChart";

const SECTIONS = [
  { id: "selling-and-installation", label: "Selling and Installation" },
  { id: "network-maintenance", label: "Network Maintenance" },
  { id: "last-mile-repair", label: "Last Mile Repair" },
] as const;

export default function ScoreCardOverview() {
  const [visible, setVisible] = useState<Record<string, boolean>>({
    "selling-and-installation": true,
    "network-maintenance": true,
    "last-mile-repair": true,
  });

  // TODO: swap demand to "FOSP" and use section-specific chart params
  // when FOSP data is available.
  const sAndI = useEagleEyeMonthlyChart({
    demand: "Eagle Eye",
    chart_position: "mob",
    chart_level: "TBL_001",
    // limit: 10,
  });
  const nm = useEagleEyeMonthlyChart({
    demand: "Eagle Eye",
    chart_position: "BB",
    // limit: 5,
  });
  const lmr = useEagleEyeMonthlyChart({
    demand: "Eagle Eye",
    chart_position: "MOB",
    chart_level: "LIB",
    // limit: 7,
  });

  const sectionData = useMemo(
    () => ({
      "selling-and-installation": sAndI,
      "network-maintenance": nm,
      "last-mile-repair": lmr,
    }),
    [sAndI, nm, lmr],
  );

  const toggle = (id: string) =>
    setVisible((prev) => ({ ...prev, [id]: !prev[id] }));

  const visibleSections = SECTIONS.filter((s) => visible[s.id]);

  return (
    <div className={styles.content}>
      <main className={styles.main}>
        <div
          className={styles.filterBar}
          role="group"
          aria-label="Filter score card sections"
        >
          {SECTIONS.map((section) => {
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

        {visibleSections.map((section) => {
          const { data, isLoading, isError } = sectionData[section.id];
          const cards = Object.values(data?.data ?? {}).map(
            toKpiCardDataFromMonthly,
          );
          return (
            <div key={section.id}>
              {isLoading && <p>Loading {section.label}...</p>}
              {isError && <p>Failed to load {section.label} data.</p>}
              {!isLoading && !isError && (
                <ScoreCardSection
                  title={section.label}
                  cards={cards}
                  keyPrefix={`${section.id}-`}
                />
              )}
            </div>
          );
        })}

        <div className={styles.footer}>
          Data Last Updated: 6/24/2026 10:34:04 PM (Some items on the page have
          not been updated)
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
