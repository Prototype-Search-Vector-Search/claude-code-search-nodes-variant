import "./Sparkline.css";

export interface SparklineSeries {
  color: string;
  points: number[];
}

export interface SparklineProps {
  series: SparklineSeries[];
  width?: number;
  height?: number;
}

function toPath(points: number[], width: number, height: number): string {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const stepX = width / (points.length - 1);
  return points
    .map((value, index) => {
      const x = index * stepX;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

/** Lightweight decorative line-chart used for the Clusters page metrics — no charting library. */
export function Sparkline({ series, width = 300, height = 48 }: SparklineProps) {
  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      {series.map((s, i) => (
        <path key={i} d={toPath(s.points, width, height)} fill="none" stroke={s.color} strokeWidth={1.5} />
      ))}
    </svg>
  );
}
