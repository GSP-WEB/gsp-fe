import { useQuery } from "@tanstack/react-query";
import type {
  KpiCardData,
  MonthlyDataPoint,
  TerritoryBar,
  TerritoryMonthlyTrend,
  Territory,
} from "@/mock-data/scoreCard";

interface EagleEyeMonthlyChartParams {
  kpi?: string;
  kpi_code?: string;
  chart_level?: string;
  chart_position?: string;
  demand?: string;
  limit?: number;
  offset?: number;
}

interface MonthlyChartSegment {
  labels: string[];
  series: Record<string, (number | null)[]>;
}

interface MonthlyChartKpi {
  kpi_id: number;
  kpi_name: string;
  segments: Record<string, MonthlyChartSegment>;
}

interface EagleEyeMonthlyChartResponse {
  data: Record<string, MonthlyChartKpi>;
}

// Maps API territory labels to the Territory union used by KpiCardData.
const TERRITORY_MAP: Record<string, Territory> = {
  "TERRITORY 1": "T1",
  "TERRITORY 2": "T2",
  "TERRITORY 3": "T3",
  "TERRITORY 4": "T4",
  "TERRITORY 5": "T5",
  "TERRITORY 6": "T6",
  "TERRITORY 7": "T7",
  "TERRITORY 8": "T8",
};

export function toKpiCardDataFromMonthly(kpi: MonthlyChartKpi): KpiCardData {
  const segments = kpi?.segments ?? {};
  // Prefer S1; fall back to the first non-empty segment.
  const segment: MonthlyChartSegment =
    segments["S1"]?.labels?.length
      ? segments["S1"]
      : (Object.values(segments).find((s) => s.labels?.length > 0) ?? {
          labels: [],
          series: {},
        });

  const { labels, series } = segment;

  const nationwideValues: (number | null)[] = series["NATIONWIDE"] ?? [];

  const monthlyTrend: MonthlyDataPoint[] = labels.map((month, i) => ({
    month,
    value: nationwideValues[i] ?? null,
  }));

  const latestOverall =
    [...nationwideValues].reverse().find((v) => v !== null) ?? null;

  // Only map entries that resolve to a valid Territory (T1–T8).
  const territoryEntries = Object.entries(series)
    .filter(([name]) => name in TERRITORY_MAP)
    .map(([name, values]) => ({
      territory: TERRITORY_MAP[name] as Territory,
      values: values.map((v) => v ?? null) as (number | null)[],
    }));

  const territoryBars: TerritoryBar[] = territoryEntries.map(
    ({ territory, values }) => ({
      territory,
      value: [...values].reverse().find((v) => v !== null) ?? null,
    }),
  );

  const territoryMonthlyTrend: TerritoryMonthlyTrend[] = territoryEntries.map(
    ({ territory, values }) => ({ territory, values }),
  );

  return {
    id: String(kpi.kpi_id),
    title: kpi.kpi_name,
    overallValue: latestOverall,
    unit: "%",
    monthlyTrend,
    territoryBars,
    territoryMonthlyTrend:
      territoryMonthlyTrend.length > 0 ? territoryMonthlyTrend : undefined,
  };
}

async function fetchEagleEyeMonthlyChart(
  params: EagleEyeMonthlyChartParams,
): Promise<EagleEyeMonthlyChartResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_FOSP_URL;
  const url = new URL(`${baseUrl}/bigquery/ee-monthly-chart`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_FOSP_API_KEYS ?? "",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch eagle eye monthly chart: ${response.statusText}`,
    );
  }

  return response.json();
}

export function useEagleEyeMonthlyChart(params: EagleEyeMonthlyChartParams) {
  return useQuery({
    queryKey: ["eagle-eye-monthly-chart", params],
    queryFn: () => fetchEagleEyeMonthlyChart(params),
  });
}
