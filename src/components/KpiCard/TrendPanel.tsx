"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { KpiCardData, Territory } from "@/mock-data/scoreCard";
import styles from "./TrendPanel.module.scss";

interface Props {
  data: KpiCardData;
}

// Fixed categorical palette — one color per territory, never reassigned by rank.
const TERRITORY_COLORS: Record<Territory, string> = {
  T1: "#2a78d6",
  T2: "#1baf7a",
  T3: "#eda100",
  T4: "#008300",
  T5: "#9085e9",
  T6: "#e34948",
  T7: "#e87ba4",
  T8: "#eb6834",
};

function buildChartRows(data: KpiCardData) {
  const territoryTrends = data.territoryMonthlyTrend ?? [];
  return data.monthlyTrend.map((point, i) => {
    const row: Record<string, number | string | null> = {
      month: point.month,
      nationwide: point.value,
    };
    territoryTrends.forEach((t) => {
      row[t.territory] = t.values[i] ?? null;
    });
    return row;
  });
}

export default function TrendPanel({ data }: Props) {
  const hasTrend = data.monthlyTrend.some((d) => d.value !== null);
  const territoryTrends = data.territoryMonthlyTrend ?? [];
  const hasTerritoryTrends = territoryTrends.length > 0;
  const snapshotTerritories = data.territoryBars.filter(
    (b) => b.value !== null,
  );
  const latestNationwide = [...data.monthlyTrend]
    .reverse()
    .find((d) => d.value !== null)?.value;
  const chartRows = buildChartRows(data);

  return (
    <div className={styles.panel}>
      <div className={styles.panelTitle}>{data.title}</div>
      <div className={styles.panelSubtitle}>Month-on-month trend</div>

      {hasTrend && (
        <>
          <div className={styles.legendRow}>
            <span className={styles.nationwideDot} />
            <span className={styles.legendLabel}>
              Nationwide (latest MoM: {latestNationwide}
              {data.unit})
            </span>
          </div>

          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartRows}
                margin={{
                  top: 8,
                  right: hasTerritoryTrends ? 30 : 16,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid stroke="#e5e5e5" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: "#888" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#888" }}
                  axisLine={false}
                  tickLine={false}
                  width={32}
                  tickFormatter={(v) => `${v}${data.unit}`}
                />
                <Tooltip
                  formatter={(v: number, name: string) => [
                    `${v}${data.unit}`,
                    name === "nationwide" ? "Nationwide" : name,
                  ]}
                  contentStyle={{ fontSize: 11, padding: "4px 8px" }}
                  labelStyle={{ fontWeight: 600 }}
                />
                {territoryTrends.map((t) => (
                  <Line
                    key={t.territory}
                    type="monotone"
                    dataKey={t.territory}
                    stroke={TERRITORY_COLORS[t.territory]}
                    strokeWidth={1.5}
                    dot={false}
                    connectNulls
                  />
                ))}
                <Line
                  type="monotone"
                  dataKey="nationwide"
                  stroke="#16213e"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  connectNulls
                >
                  {!hasTerritoryTrends && (
                    <Label
                      value={`${latestNationwide}${data.unit}`}
                      position="top"
                    />
                  )}
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
      {hasTerritoryTrends && (
        <div className={styles.legendChips}>
          {territoryTrends.map((t) => (
            <span key={t.territory} className={styles.chip}>
              <span
                className={styles.chipDot}
                style={{ background: TERRITORY_COLORS[t.territory] }}
              />
              {t.territory}
            </span>
          ))}
        </div>
      )}
      {hasTerritoryTrends ? (
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>MoM</th>
                {data.monthlyTrend.map((m) => (
                  <th key={m.month}>{m.month}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className={styles.nationwideRow}>
                <td>Nationwide</td>
                {data.monthlyTrend.map((m) => (
                  <td key={m.month}>
                    {m.value !== null ? `${m.value}${data.unit}` : "—"}
                  </td>
                ))}
              </tr>
              {territoryTrends.map((t) => (
                <tr key={t.territory}>
                  <td>{t.territory}</td>
                  {t.values.map((v, i) => (
                    <td key={i}>{v !== null ? `${v}${data.unit}` : "—"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : snapshotTerritories.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Territory</th>
              <th>Latest</th>
            </tr>
          </thead>
          <tbody>
            {snapshotTerritories.map((t) => (
              <tr key={t.territory}>
                <td>{t.territory}</td>
                <td>
                  {t.value}
                  {data.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {!hasTrend && snapshotTerritories.length === 0 && !hasTerritoryTrends && (
        <div className={styles.empty}>No historical data yet</div>
      )}
    </div>
  );
}
