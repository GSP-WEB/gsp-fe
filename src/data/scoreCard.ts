export type Territory = "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7" | "T8";

export interface MonthlyDataPoint {
  month: string;
  value: number | null;
}

export interface TerritoryBar {
  territory: Territory;
  value: number | null;
}

export interface TerritoryMonthlyTrend {
  territory: Territory;
  values: (number | null)[]; // aligned index-for-index with monthlyTrend
}

export interface KpiCardData {
  id: string;
  title: string;
  overallValue: number | null;
  unit: "%" | "days" | "";
  monthlyTrend: MonthlyDataPoint[];
  territoryBars: TerritoryBar[];
  workInProgress?: boolean;
  /** Optional: per-territory history for the hover trend chart. Only needed if you want the full multi-line breakdown instead of the latest-snapshot table. */
  territoryMonthlyTrend?: TerritoryMonthlyTrend[];
}

export interface OverallRatingRow {
  territory: Territory;
  score: number;
  rating: number;
}

export interface KpiDateRow {
  kpi: string;
  dataAsOf: string;
}

// ─── Score Card KPI Data ─────────────────────────────────────
// NOTE: mock data is used here for demonstration purposes. In a real application, this data would be fetched from an API or database.

export const b2cGfpSellingJan: KpiCardData = {
  id: "b2c-gfp-selling-jan",
  title: "B2C GFP SELLING ACHIEVEMENT (JAN)",
  overallValue: 72,
  unit: "%",
  monthlyTrend: [
    { month: "Dec", value: 23 },
    { month: "Jan", value: 90 },
    { month: "Feb", value: 41 },
    { month: "Mar", value: 39 },
    { month: "Apr", value: 76 },
    { month: "May", value: 72 },
  ],
  territoryBars: [
    { territory: "T1", value: 45 },
    { territory: "T2", value: 56 },
    { territory: "T3", value: null },
    { territory: "T4", value: null },
    { territory: "T5", value: 69 },
    { territory: "T6", value: 43 },
    { territory: "T7", value: null },
    { territory: "T8", value: null },
  ],
  // Dec left null — not provided in the source breakdown yet.
  territoryMonthlyTrend: [
    { territory: "T1", values: [null, 45, 56, 69, 71, 56] },
    { territory: "T2", values: [null, 56, 70, 54, 69, 69] },
    { territory: "T3", values: [null, 23, 41, 54, 39, 43] },
    { territory: "T4", values: [null, 61, 70, 39, 71, 72] },
    { territory: "T5", values: [null, 61, 61, 43, 71, 72] },
    { territory: "T6", values: [null, 25, 24, 29, 66, 77] },
    { territory: "T7", values: [null, 23, 38, 29, 66, 78] },
  ],
};

export const b2cGfpSellingGay: KpiCardData = {
  id: "b2c-gfp-selling-gay",
  title: "B2C GFP SELLING ACHIEVEMENT (GAY)",
  overallValue: 98,
  unit: "%",
  monthlyTrend: [
    { month: "Dec", value: 54 },
    { month: "Jan", value: 70 },
    { month: "Feb", value: 54 },
    { month: "Mar", value: 99 },
    { month: "Apr", value: 99 },
    { month: "May", value: 98 },
  ],
  territoryBars: [
    { territory: "T1", value: 89 },
    { territory: "T2", value: 87 },
    { territory: "T3", value: 73 },
    { territory: "T4", value: null },
    { territory: "T5", value: 64 },
    { territory: "T6", value: 98 },
    { territory: "T7", value: null },
    { territory: "T8", value: null },
  ],
};

export const b2cSellingAchievement: KpiCardData = {
  id: "b2c-selling-achievement",
  title: "B2C B2B SELLING ACHIEVEMENT",
  overallValue: null,
  unit: "%",
  monthlyTrend: [],
  territoryBars: [],
  workInProgress: true,
};

export const b2cInstallSlotAdherence: KpiCardData = {
  id: "b2c-install-slot-adherence",
  title: "B2C INSTALL SLOT ADHERENCE",
  overallValue: 99,
  unit: "%",
  monthlyTrend: [
    { month: "Dec", value: 65 },
    { month: "Jan", value: 69 },
    { month: "Feb", value: 71 },
    { month: "Mar", value: 68 },
    { month: "Apr", value: 99 },
    { month: "May", value: 99 },
  ],
  territoryBars: [
    { territory: "T1", value: 99 },
    { territory: "T2", value: 79 },
    { territory: "T3", value: 97 },
    { territory: "T4", value: 46 },
    { territory: "T5", value: 36 },
    { territory: "T6", value: 22 },
    { territory: "T7", value: 97 },
    { territory: "T8", value: 6 },
  ],

  territoryMonthlyTrend: [
    { territory: "T1", values: [23, 45, 56, 69, 71, 56] },
    { territory: "T2", values: [54, 56, 70, 54, 69, 69] },
    { territory: "T3", values: [23, 23, 41, 54, 39, 43] },
    { territory: "T4", values: [100, 61, 70, 39, 71, 72] },
    { territory: "T5", values: [3, 61, 61, 43, 71, 72] },
    { territory: "T6", values: [1, 25, 24, 29, 66, 77] },
    { territory: "T7", values: [31, 23, 38, 29, 66, 78] },
  ],
};

export const b2bInstallSlotAdherence: KpiCardData = {
  id: "b2b-install-slot-adherence",
  title: "B2B INSTALL SLOT ADHERENCE",
  overallValue: null,
  unit: "%",
  monthlyTrend: [
    { month: "Dec", value: 20 },
    { month: "Jan", value: 22 },
    { month: "Feb", value: 24 },
    { month: "Mar", value: 29 },
    { month: "Apr", value: 100 },
    { month: "May", value: 100 },
  ],
  territoryBars: [
    { territory: "T1", value: 100 },
    { territory: "T2", value: 100 },
    { territory: "T3", value: 100 },
    { territory: "T4", value: 100 },
    { territory: "T5", value: 100 },
    { territory: "T6", value: 100 },
    { territory: "T7", value: 100 },
    { territory: "T8", value: 100 },
  ],
};

export const b2bB2cSlotAvailability: KpiCardData = {
  id: "b2b-b2c-slot-availability",
  title: "B2B & B2C 24H INSTALL SLOT AVAILABILITY",
  overallValue: null,
  unit: "%",
  monthlyTrend: [
    { month: "Dec", value: 51 },
    { month: "Jan", value: 52 },
    { month: "Feb", value: 60 },
    { month: "Mar", value: 66 },
    { month: "Apr", value: null },
    { month: "May", value: null },
  ],
  territoryBars: [
    { territory: "T1", value: null },
    { territory: "T2", value: null },
    { territory: "T3", value: null },
    { territory: "T4", value: null },
    { territory: "T5", value: null },
    { territory: "T6", value: null },
    { territory: "T7", value: null },
    { territory: "T8", value: null },
  ],
};

export const b2cInstallWithin24h: KpiCardData = {
  id: "b2c-install-within-24h",
  title: "B2C INSTALL W/N 24 HRS (ALL IN)",
  overallValue: 73,
  unit: "%",
  monthlyTrend: [
    { month: "Dec", value: 71 },
    { month: "Jan", value: 75 },
    { month: "Feb", value: 78 },
    { month: "Mar", value: 69 },
    { month: "Apr", value: 73 },
    { month: "May", value: 73 },
  ],
  territoryBars: [
    { territory: "T1", value: null },
    { territory: "T2", value: null },
    { territory: "T3", value: null },
    { territory: "T4", value: null },
    { territory: "T5", value: null },
    { territory: "T6", value: null },
    { territory: "T7", value: null },
    { territory: "T8", value: null },
  ],
};

export const b2bInstallWithin24h: KpiCardData = {
  id: "b2b-install-within-24h",
  title: "B2B INSTALL W/N 24 HRS (ALL IN)",
  overallValue: 37,
  unit: "%",
  monthlyTrend: [
    { month: "Dec", value: 28 },
    { month: "Jan", value: 37 },
    { month: "Feb", value: 39 },
    { month: "Mar", value: 41 },
    { month: "Apr", value: 34 },
    { month: "May", value: 37 },
  ],
  territoryBars: [
    { territory: "T1", value: null },
    { territory: "T2", value: null },
    { territory: "T3", value: null },
    { territory: "T4", value: 47 },
    { territory: "T5", value: null },
    { territory: "T6", value: 27 },
    { territory: "T7", value: 30 },
    { territory: "T8", value: null },
  ],
};

export const b2bCoreDataSchedule: KpiCardData = {
  id: "b2b-core-data-schedule",
  title: "B2B CORE DATA SCHEDULE ADHERENCE",
  overallValue: null,
  unit: "%",
  monthlyTrend: [
    { month: "Dec", value: 98 },
    { month: "Jan", value: null },
    { month: "Feb", value: null },
    { month: "Mar", value: 93 },
    { month: "Apr", value: null },
    { month: "May", value: null },
  ],
  territoryBars: [
    { territory: "T1", value: null },
    { territory: "T2", value: null },
    { territory: "T3", value: null },
    { territory: "T4", value: null },
    { territory: "T5", value: null },
    { territory: "T6", value: null },
    { territory: "T7", value: null },
    { territory: "T8", value: null },
  ],
};

export const b2cB2bQualityInstall: KpiCardData = {
  id: "b2c-b2b-quality-install",
  title: "B2C & B2B QUALITY INSTALL (6 Months)",
  overallValue: 98.2,
  unit: "%",
  monthlyTrend: [
    { month: "Dec", value: 91.0 },
    { month: "Jan", value: 92.3 },
    { month: "Feb", value: 93.7 },
    { month: "Mar", value: 94.9 },
    { month: "Apr", value: 96.3 },
    { month: "May", value: 98.2 },
  ],
  territoryBars: [
    { territory: "T1", value: 98 },
    { territory: "T2", value: 97 },
    { territory: "T3", value: 99 },
    { territory: "T4", value: 96 },
    { territory: "T5", value: 97 },
    { territory: "T6", value: 98 },
    { territory: "T7", value: 99 },
    { territory: "T8", value: 98 },
  ],
};

export const b2cAcquisitionQuality: KpiCardData = {
  id: "b2c-acquisition-quality",
  title: "B2C ACQUISITION QUALITY",
  overallValue: null,
  unit: "%",
  monthlyTrend: [],
  territoryBars: [],
  workInProgress: true,
};

// ─── Sidebar Data ────────────────────────────────────────────

export const overallRatings: OverallRatingRow[] = [
  { territory: "T1", score: 0, rating: 1 },
  { territory: "T2", score: 0, rating: 1 },
  { territory: "T3", score: 0, rating: 1 },
  { territory: "T4", score: 0, rating: 1 },
];

export const kpiDates: KpiDateRow[] = [
  { kpi: "Install Quality", dataAsOf: "May 28, 2026" },
  { kpi: "Slot Adherence", dataAsOf: "Mar 19, 2026" },
  { kpi: "Slot Availability", dataAsOf: "Mar 19, 2026" },
  { kpi: "Acquisition Quality", dataAsOf: "Jan 31, 2026" },
  { kpi: "Install w/n 24 Hrs (All In)", dataAsOf: "May 31, 2026" },
  { kpi: "B2B Core Data Schedule Adhe...", dataAsOf: "Mar 31, 2026" },
  { kpi: "B2C GFP Selling", dataAsOf: "May 28, 2026" },
  { kpi: "B2C GAH Selling", dataAsOf: "May 27, 2026" },
];

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navTabs: NavItem[] = [
  {
    label: "SCORE CARD",
    href: "/score-card/selling-and-installation",
    children: [
      {
        label: "Selling and Installation",
        href: "/score-card/selling-and-installation",
      },
      { label: "Network Maintenance", href: "/score-card/network-maintenance" },
      { label: "Last Mile Repair", href: "/score-card/last-mile-repair" },
    ],
  },
  {
    label: "SELLING AND INSTALLATION",
    href: "/selling-and-installation/p1",
    children: [
      {
        label: "[WOR] Selling and Installation (P1)",
        href: "/selling-and-installation/p1",
      },
      {
        label: "[WOR] Selling and Installation (P2)",
        href: "/selling-and-installation/p2",
      },
      {
        label: "Install Slot Adherence",
        href: "/selling-and-installation/install-slot-adherence",
      },
      {
        label: "Install Slot Availability",
        href: "/selling-and-installation/install-slot-availability",
      },
    ],
  },
  {
    label: "NETWORK MAINTENANCE",
    href: "/network-maintenance/distribution",
    children: [
      {
        label: "Distribution (MCT)",
        href: "/network-maintenance/distribution",
      },
    ],
  },
  {
    label: "LAST MILE REPAIR",
    href: "/last-mile-repair/wor",
    children: [
      {
        label: "[WOR] Last Mile Repair",
        href: "/last-mile-repair/wor",
      },
      {
        label: "Repair Pipeline & Aging",
        href: "/last-mile-repair/repair-pipeline-and-aging",
      },
      {
        label: "Repair Tickets",
        href: "/last-mile-repair/repair-tickets",
      },
      {
        label: "Repair Slot Adherence",
        href: "/last-mile-repair/repair-slot-adherence",
      },
      {
        label: "Repair Slot Availability",
        href: "/last-mile-repair/repair-slot-availability",
      },
      {
        label: "Core Data Timeliness",
        href: "/last-mile-repair/core-data-timeliness",
      },
    ],
  },
  {
    label: "B2B SECTION",
    href: "/b2b-section/core-data-mttr-reso",
    children: [
      {
        label: "Core Data MTTR-Reso",
        href: "/b2b-section/core-data-mttr-reso",
      },
    ],
  },
  {
    label: "OTHER REPORTS",
    href: "/other-reports/ng1-compliance",
    children: [
      {
        label: "NG1 Compliance",
        href: "/other-reports/ng1-compliance",
      },
      {
        label: "Violation Tickets",
        href: "/other-reports/violation-tickets",
      },
      {
        label: "NPS",
        href: "/other-reports/nps",
      },
      {
        label: "Selling Details",
        href: "/other-reports/selling-details",
      },
      {
        label: "Team Based Selling",
        href: "/other-reports/team-based-selling",
      },
      {
        label: "GSP Daily Critical Report",
        href: "/other-reports/gsp-daily-critical-report",
      },
      {
        label: "Payout Dashboard",
        href: "/other-reports/payout-dashboard",
      },
    ],
  },
];
