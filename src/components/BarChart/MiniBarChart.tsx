"use client";
import {
  BarChart,
  Bar,
  XAxis,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { MonthlyDataPoint } from "@/mock-data/scoreCard";
import styles from "./MiniBarChart.module.scss";

interface Props {
  data: MonthlyDataPoint[];
  color?: string;
  height?: number;
}

export default function MiniBarChart({
  data,
  color = "#4a90d9",
  height = 90,
}: Props) {
  const filtered = data.filter((d) => d.value !== null);
  if (filtered.length === 0) return null;

  const maxVal = Math.max(...filtered.map((d) => d.value as number));

  return (
    <div className={styles.chartWrap} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 14, right: 4, left: 4, bottom: 0 }}
          barCategoryGap="20%"
        >
          <XAxis
            dataKey="month"
            tick={{ fontSize: 9, fill: "#888" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ fontSize: 10, padding: "4px 8px" }}
            formatter={(v: number) => [`${v}%`, ""]}
            labelStyle={{ fontWeight: 600 }}
          />
          <Bar dataKey="value" radius={[1, 1, 0, 0]} maxBarSize={28}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.value === maxVal ? color : `${color}99`}
              />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              formatter={(v: number | null) => (v !== null ? `${v}%` : "")}
              style={{ fontSize: 8, fill: "#555", fontWeight: 500 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
