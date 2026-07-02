import Icon from "@leafygreen-ui/icon";
import "./ClusterNavPanel.css";

export type ClusterNavActiveItem =
  | "Overview"
  | "Metrics"
  | "Query Insights"
  | "Profiler"
  | "Performance Advisor"
  | "Backup"
  | "Command Line Tools"
  | "Infrastructure as Code";

export interface ClusterNavPanelProps {
  activeItem: ClusterNavActiveItem;
  onOpenSearchIndexes?: () => void;
  onOpenMetrics?: () => void;
  onOpenOverview?: () => void;
}

const ITEM_HANDLERS: Partial<Record<ClusterNavActiveItem, "onOpenMetrics" | "onOpenOverview">> = {
  Metrics: "onOpenMetrics",
  Overview: "onOpenOverview",
};

const NAV_ITEMS: ClusterNavActiveItem[] = [
  "Overview",
  "Metrics",
  "Query Insights",
  "Profiler",
  "Performance Advisor",
  "Backup",
  "Command Line Tools",
  "Infrastructure as Code",
];

/**
 * Always-visible contextual nav for a single cluster's pages — rendered as
 * `PersistentSideNav`'s children, sitting permanently next to `MiniSideNav`.
 */
export function ClusterNavPanel({ activeItem, onOpenSearchIndexes, onOpenMetrics, onOpenOverview }: ClusterNavPanelProps) {
  const handlers = { onOpenMetrics, onOpenOverview };
  return (
    <div className="clusterNavPanel">
      <div className="clusterNavPanel-header">Clusters</div>

      <div className="clusterNavPanel-body">
        {NAV_ITEMS.map((item) => {
          if (item === activeItem) {
            return (
              <div className="clusterNavPanel-active" key={item}>
                <span className="clusterNavPanel-activeLabel">{item}</span>
              </div>
            );
          }
          const handlerKey = ITEM_HANDLERS[item];
          return (
            <button
              type="button"
              className="clusterNavPanel-item"
              key={item}
              onClick={handlerKey ? handlers[handlerKey] : undefined}
            >
              {item}
            </button>
          );
        })}

        <div className="clusterNavPanel-group">
          <div className="clusterNavPanel-groupHeader">
            <span className="clusterNavPanel-groupTitle">SHORTCUTS</span>
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="CaretUp" size={12} fill="#5c6c75" />
          </div>
          <div className="clusterNavPanel-groupItems">
            <button type="button" className="clusterNavPanel-item" onClick={onOpenSearchIndexes}>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="Shortcut" size={14} fill="#5c6c75" />
              Search & Vector Search
            </button>
            <button type="button" className="clusterNavPanel-item">
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="Shortcut" size={14} fill="#5c6c75" />
              Data Explorer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
