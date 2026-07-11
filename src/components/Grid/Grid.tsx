import { CSSProperties, ReactNode } from "react";
import styles from "./Grid.module.scss";

type GridCSSProperties = CSSProperties & {
  "--grid-columns"?: number;
  "--grid-min-col"?: string;
  "--grid-gap"?: string;
};

interface GridProps {
  children: ReactNode;
  /** Fixed number of columns (e.g. 3). Omit this to get automatic,
   * responsive columns instead — the grid will fit as many as will
   * comfortably hold `minColumnWidth` each. */
  columns?: number;
  /** Only used when `columns` is omitted. Minimum width (px) a column
   * can shrink to before wrapping to the next row. Defaults to 260. */
  minColumnWidth?: number;
  /** Gap between cells, in px. Defaults to the page's standard grid gap. */
  gap?: number;
  className?: string;
}

export default function Grid({
  children,
  columns,
  minColumnWidth = 260,
  gap,
  className = "",
}: GridProps) {
  const style: GridCSSProperties = {};
  if (columns) {
    style["--grid-columns"] = columns;
  } else {
    style["--grid-min-col"] = `${minColumnWidth}px`;
  }
  if (gap !== undefined) {
    style["--grid-gap"] = `${gap}px`;
  }

  return (
    <div
      className={`${styles.grid} ${columns ? styles.fixed : styles.auto} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
