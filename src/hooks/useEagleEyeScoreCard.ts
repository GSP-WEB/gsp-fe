import { useQuery } from "@tanstack/react-query";

interface EagleEyeScoreCardParams {
  kpi?: string;
  kpi_code?: string;
  chart_level?: string;
  chart_position?: string;
  demand?: string;
  limit?: number;
  offset?: number;
}

interface MonthValue {
  value: string;
}

interface EagleEyeScoreCardItem {
  KPI_Code: string;
  KPI: string;
  CUT: string;
  YEAR: string;
  QUARTER: string;
  latest_month: MonthValue;
  previous_month: MonthValue;
  latest_score: number | null;
  previous_score: number | null;
  latest_target: number | null;
  previous_target: number | null;
  latest_baseline: number | null;
  previous_baseline: number | null;
  latest_YTD_Score: number | null;
  previous_YTD_Score: number | null;
  latest_YTD_Target: number | null;
  previous_YTD_Target: number | null;
  latest_QTR_Score: number | null;
  previous_QTR_Score: number | null;
  latest_Status: string | null;
  latest_Funded: string | null;
  Latest_Remarks: string | null;
  Alias: string;
  "Chart Level": string;
  "Unit of Measure": string;
  "Dashboard Name": string | null;
  Link: string | null;
  Source: string | null;
  Scope_Tagging: string;
  Chart_Position: string;
  Demand: string;
  Last_Year_Score: number | null;
  Last_Year_Target: number | null;
  Last_Year_YTD_Score: number | null;
}

interface EagleEyeScoreCardResponse {
  data: EagleEyeScoreCardItem[];
  total: number;
  limit: number;
  offset: number;
  dryRunBytesProcessed: string;
}

async function fetchEagleEyeScoreCard(
  params: EagleEyeScoreCardParams,
): Promise<EagleEyeScoreCardResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_FOSP_URL;
  const url = new URL(`${baseUrl}/bigquery/ee-scorecard`);

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
      `Failed to fetch eagle eye scorecard: ${response.statusText}`,
    );
  }

  return response.json();
}

export function useEagleEyeScoreCard(params: EagleEyeScoreCardParams) {
  return useQuery({
    queryKey: ["eagle-eye-scorecard", params],
    queryFn: () => fetchEagleEyeScoreCard(params),
  });
}
