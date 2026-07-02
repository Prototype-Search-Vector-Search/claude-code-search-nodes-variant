import "./MiniBarChart.css";

export interface BarDatum {
  value: number;
  color: string;
}

export interface MiniBarChartProps {
  data: BarDatum[];
  maxValue?: number;
  startLabel: string;
  endLabel: string;
}

const GRID_STEPS = [30, 25, 20, 15, 10, 5, 0];

export function MiniBarChart({ data, maxValue = 30, startLabel, endLabel }: MiniBarChartProps) {
  return (
    <div className="miniBarChart">
      <div className="miniBarChart-plot">
        <div className="miniBarChart-yAxis">
          {GRID_STEPS.map((step) => (
            <span key={step} className="miniBarChart-yLabel">
              {step}
            </span>
          ))}
        </div>
        <div className="miniBarChart-bars">
          {data.map((datum, index) => (
            <div
              key={index}
              className="miniBarChart-bar"
              style={{ height: `${(datum.value / maxValue) * 100}%`, background: datum.color }}
            />
          ))}
        </div>
      </div>
      <div className="miniBarChart-xAxis">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
    </div>
  );
}

export interface LegendSwatchProps {
  color: string;
  label: string;
}

export function LegendSwatch({ color, label }: LegendSwatchProps) {
  return (
    <span className="miniBarChart-legendItem">
      <span className="miniBarChart-legendSwatch" style={{ background: color }} />
      {label}
    </span>
  );
}
