import Icon from "@leafygreen-ui/icon";
import { Button } from "@leafygreen-ui/button";
import { TopNav } from "./TopNav";
import { PersistentSideNav } from "./PersistentSideNav";
import { ClusterNavPanel } from "./ClusterNavPanel";
import "./ClusterMetricsPage.css";

export interface ClusterMetricsPageProps {
  onBackToProjectOverview: () => void;
  onBackToClusters: () => void;
  onOpenSearchIndexes: () => void;
  onOpenClusters: () => void;
  onOpenProjectSettings: () => void;
  onOpenClusterOverview: () => void;
}

const METRIC_TITLES = [
  "Search Normalized Process CPU",
  "Normalized Process CPU",
  "Normalized System CPU",
  "Disk Queue Depth",
  "System Memory",
  "Search Process Memory",
  "Search Page Faults",
  "Page Faults",
  "Disk IOPS",
  "Max Normalized System CPU",
  "Search Disk Space Used",
  "Search Index Size",
  "Search Max Fields Indexed",
  "Search Max Replication Log",
  "Search Opcounters",
  "Search Process CPU",
  "Search Process Throttling",
  "Search Query Status",
  "Search Max Number Of Lucene Docs",
  "Search JVM Heap Memory",
  "Search Fields Indexed",
];

const TOOLS_CHARTS = [
  "Asserts", "Cache Ratio", "Cache Activity", "Cache Usage", "Catalog", "Connection Rate", "Connections",
  "Cursors", "Disk Storage", "Document Metrics", "Memory", "Network", "Opcounters", "Opcounters - Repl",
  "Operation Execution Times", "Operation Throttling", "Oplog GB/Hour", "Page Faults", "Query Executor",
  "Query Targeting", "Replication Lag", "Replication Headroom", "Scan And Order", "Replication Oplog Window",
  "Tickets Available", "Sort",
];

const SEARCH_METRICS = [
  "Search Disk Space Used", "Search Fields Indexed", "Search Index Size", "Search JVM Heap Memory",
  "Search Max Fields Indexed", "Search Max Number Of Lucene Docs", "Search Max Replication Log",
  "Search Normalized Process CPU", "Search Opcounters", "Search Page Faults", "Search Process CPU",
  "Search Process Memory", "Search Process Throttling", "Search Query Status",
];

const HARDWARE_METRICS = [
  "Disk IOPS", "Max Disk IOPS", "Disk Latency", "Disk Queue Depth", "Max Disk Queue Depth", "Disk Space Free",
  "Disk Throughput", "Max Disk Throughput", "Normalized System CPU", "Normalized Process CPU", "Process CPU",
  "Max Process CPU", "Swap Usage", "Max System Memory", "System CPU", "System Network",
];

// A few chips render "selected" to match the screenshot.
const SELECTED = new Set(["Page Faults", "Disk IOPS", "Normalized System CPU", "Process CPU", "System Memory"]);

// Deterministic pseudo-random so the static mock renders identically each time.
function rand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function MockChart({ seed }: { seed: number }) {
  const width = 300;
  const height = 120;
  const next = rand(seed);
  const barCount = 26;
  const bars = Array.from({ length: barCount }, () => next());
  // A couple of trend lines overlaid on the bars.
  const linePts = (base: number, amp: number, r: () => number) =>
    Array.from({ length: 20 }, (_, i) => {
      const x = (i / 19) * width;
      const y = height - (base + Math.sin(i * 0.5) * amp + r() * 8) ;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");

  return (
    <svg className="clusterMetricsPage-chart" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={0} x2={width} y1={height * g} y2={height * g} stroke="#1c3a48" strokeWidth={1} />
      ))}
      {bars.map((v, i) => {
        const x = (i / barCount) * width;
        const barH = 20 + v * (height - 30);
        return <rect key={i} x={x} y={height - barH} width={width / barCount - 2} height={barH} fill="#c0341d" opacity={0.85} />;
      })}
      <polyline points={linePts(70, 14, rand(seed + 7))} fill="none" stroke="#00ed64" strokeWidth={1.5} />
      <polyline points={linePts(40, 10, rand(seed + 13))} fill="none" stroke="#016bf8" strokeWidth={1.5} />
    </svg>
  );
}

export function ClusterMetricsPage({
  onBackToProjectOverview,
  onBackToClusters,
  onOpenSearchIndexes,
  onOpenClusters,
  onOpenProjectSettings,
  onOpenClusterOverview,
}: ClusterMetricsPageProps) {
  return (
    <div className="clusterMetricsPage">
      <div className="clusterMetricsPage-body">
        <PersistentSideNav
          activeSection="database"
          activeItem="Clusters"
          onNavigateProjectOverview={onBackToProjectOverview}
          onOpenSearchIndexes={onOpenSearchIndexes}
          onOpenClusters={onOpenClusters}
          onOpenProjectSettings={onOpenProjectSettings}
        >
          <ClusterNavPanel
            activeItem="Metrics"
            onOpenSearchIndexes={onOpenSearchIndexes}
            onOpenOverview={onOpenClusterOverview}
          />
        </PersistentSideNav>

        <div className="clusterMetricsPage-mainColumn">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <TopNav organization="Leafy Green" project="Greenery" clusterName="Cluster0" showLogo={false} />

          <div className="clusterMetricsPage-mainArea">
            <button type="button" className="clusterMetricsPage-backLink" onClick={onBackToClusters}>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="ArrowLeft" size={12} fill="#016bf8" />
              <span>Back to Clusters</span>
            </button>

            <div className="clusterMetricsPage-headerRow">
              <div>
                <p className="clusterMetricsPage-heading">Metrics</p>
                <div className="clusterMetricsPage-subtitle">
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Icon glyph="Person" size={14} fill="#5c6c75" />
                  <span>Cluster0</span>
                </div>
              </div>
              <div className="clusterMetricsPage-metaRow">
                <div className="clusterMetricsPage-metaCol">
                  <span className="clusterMetricsPage-metaLabel">VERSION</span>
                  <span className="clusterMetricsPage-metaValue">8.0.26</span>
                </div>
                <div className="clusterMetricsPage-metaCol">
                  <span className="clusterMetricsPage-metaLabel">REGION</span>
                  <span className="clusterMetricsPage-metaValue">AWS N. Virginia (us-east-1)</span>
                </div>
                <div className="clusterMetricsPage-metaCol">
                  <span className="clusterMetricsPage-metaLabel">CLUSTER TIER</span>
                  <span className="clusterMetricsPage-metaValue">M10 (General)</span>
                </div>
              </div>
            </div>

            <div className="clusterMetricsPage-toolbar">
              <span className="clusterMetricsPage-toolbarLabel">GRANULARITY</span>
              <span className="clusterMetricsPage-toolbarChip">1 min ▾</span>
              <span className="clusterMetricsPage-toolbarLabel">PERIOD</span>
              <span className="clusterMetricsPage-toolbarChip">Last 6 Hours ▾</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Button size="xsmall">ADD CHART</Button>
              <div className="clusterMetricsPage-toolbarSpacer" />
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Button size="xsmall">ADD ALERTS</Button>
            </div>

            <div className="clusterMetricsPage-chartsSection">
              <div className="clusterMetricsPage-charts">
                {METRIC_TITLES.map((title, ti) => (
                  <div key={title} className="clusterMetricsPage-metric">
                    <p className="clusterMetricsPage-metricTitle">{title}</p>
                    <div className="clusterMetricsPage-metricRow">
                      {[0, 1, 2].map((ci) => (
                        <MockChart key={ci} seed={(ti + 1) * 100 + ci * 17 + 3} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="clusterMetricsPage-picker">
                <div className="clusterMetricsPage-pickerGroup">
                  <p className="clusterMetricsPage-pickerTitle">TOOLS CHARTS</p>
                  <div className="clusterMetricsPage-pickerChips">
                    {TOOLS_CHARTS.map((c) => (
                      <span key={c} className={`clusterMetricsPage-chip ${SELECTED.has(c) ? "clusterMetricsPage-chip--on" : ""}`}>{c}</span>
                    ))}
                  </div>
                </div>
                <div className="clusterMetricsPage-pickerGroup">
                  <p className="clusterMetricsPage-pickerTitle">Search Metrics</p>
                  <div className="clusterMetricsPage-pickerChips">
                    {SEARCH_METRICS.map((c) => (
                      <span key={c} className={`clusterMetricsPage-chip ${SELECTED.has(c) ? "clusterMetricsPage-chip--on" : ""}`}>{c}</span>
                    ))}
                  </div>
                  <p className="clusterMetricsPage-pickerTitle">Hardware Metrics</p>
                  <div className="clusterMetricsPage-pickerChips">
                    {HARDWARE_METRICS.map((c) => (
                      <span key={c} className={`clusterMetricsPage-chip ${SELECTED.has(c) ? "clusterMetricsPage-chip--on" : ""}`}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
