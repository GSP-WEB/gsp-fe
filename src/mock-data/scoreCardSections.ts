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
  KpiCardData,
} from "./scoreCard";

export interface ScoreCardSectionData {
  id: string;
  label: string;
  cards: KpiCardData[];
}

const sellingAndInstallationCards: KpiCardData[] = [
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

// NOTE: Network Maintenance and Last Mile Repair don't have their own KPIs
// defined yet, so both mock/placeholder sections reuse the Selling and
// Installation card set for now. Swap these arrays out once real data
// exists for each — nothing else (the overview page, the individual
// sub-pages, ScoreCardSection) needs to change when you do.
export const scoreCardSections: ScoreCardSectionData[] = [
  {
    id: "selling-and-installation",
    label: "Selling and Installation",
    cards: sellingAndInstallationCards,
  },
  {
    id: "network-maintenance",
    label: "Network Maintenance",
    cards: sellingAndInstallationCards, // mock — reuses S&I cards for now
  },
  {
    id: "last-mile-repair",
    label: "Last Mile Repair",
    cards: sellingAndInstallationCards, // mock — reuses S&I cards for now
  },
];
