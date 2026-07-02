import Icon from "@leafygreen-ui/icon";
import type { GlyphName } from "@leafygreen-ui/icon";
import "./SearchNavPanel.css";

interface SecondaryNavItem {
  label: string;
  glyph?: GlyphName;
}

interface SecondaryNavGroup {
  title: string;
  items: SecondaryNavItem[];
  dividerBefore?: boolean;
}

const SECONDARY_NAV_GROUPS: SecondaryNavGroup[] = [
  { title: "AUTO-EMBEDDING", items: [{ label: "Usage" }, { label: "Rate Limits" }] },
  { title: "RERANKING", items: [{ label: "Usage" }, { label: "Rate Limits" }] },
  {
    title: "SHORTCUTS",
    dividerBefore: true,
    items: [
      { label: "Cluster Metrics", glyph: "Shortcut" },
      { label: "Data Explorer", glyph: "Shortcut" },
    ],
  },
];

export type SearchNavActiveItem =
  | "Search Indexes"
  | "Index Overview"
  | "Status Details"
  | "Search Tester"
  | "Auto-Embedding Usage"
  | "Auto-Embedding Rate Limits"
  | "Reranking Usage"
  | "Reranking Rate Limits";

export interface SearchNavPanelProps {
  activeItem?: SearchNavActiveItem;
  onSelectSearchIndexes?: () => void;
  onSelectIndexOverview?: () => void;
  onSelectStatusDetails?: () => void;
  onSelectSearchTester?: () => void;
  onSelectAutoEmbeddingUsage?: () => void;
  onSelectAutoEmbeddingRateLimits?: () => void;
  onSelectRerankingUsage?: () => void;
  onSelectRerankingRateLimits?: () => void;
}

/**
 * Always-visible contextual nav for the Search & Vector Search page — rendered as
 * `PersistentSideNav`'s children, sitting permanently next to `MiniSideNav` (the mini
 * rail already owns the logo, so this panel doesn't repeat it). Each page nested under
 * the main project nav supplies its own panel like this one.
 */
export function SearchNavPanel({
  activeItem = "Search Indexes",
  onSelectSearchIndexes,
  onSelectIndexOverview,
  onSelectStatusDetails,
  onSelectSearchTester,
  onSelectAutoEmbeddingUsage,
  onSelectAutoEmbeddingRateLimits,
  onSelectRerankingUsage,
  onSelectRerankingRateLimits,
}: SearchNavPanelProps) {
  const isListActive = activeItem === "Search Indexes";
  const isIndexDetailActive =
    activeItem === "Index Overview" || activeItem === "Status Details" || activeItem === "Search Tester";

  const itemActions: Record<string, { active: boolean; onClick?: () => void }> = {
    "AUTO-EMBEDDING:Usage": { active: activeItem === "Auto-Embedding Usage", onClick: onSelectAutoEmbeddingUsage },
    "AUTO-EMBEDDING:Rate Limits": {
      active: activeItem === "Auto-Embedding Rate Limits",
      onClick: onSelectAutoEmbeddingRateLimits,
    },
    "RERANKING:Usage": { active: activeItem === "Reranking Usage", onClick: onSelectRerankingUsage },
    "RERANKING:Rate Limits": {
      active: activeItem === "Reranking Rate Limits",
      onClick: onSelectRerankingRateLimits,
    },
  };

  return (
    <div className="searchNavPanel">
      <div className="searchNavPanel-header">Search and Vector Search</div>

      <div className="searchNavPanel-body">
        {isListActive ? (
          <div className="searchNavPanel-active">
            <span className="searchNavPanel-activeLabel">Search Indexes</span>
          </div>
        ) : (
          <button type="button" className="searchNavPanel-parentLink" onClick={onSelectSearchIndexes}>
            Search Indexes
          </button>
        )}

        {isIndexDetailActive && (
          <div className="searchNavPanel-group searchNavPanel-group--indexDetail">
            <div className="searchNavPanel-groupHeader">
              <span className="searchNavPanel-groupTitle">SEARCH INDEX</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="CaretUp" size={12} fill="#5c6c75" />
            </div>
            <div className="searchNavPanel-groupItems">
              <button
                type="button"
                className={`searchNavPanel-item ${activeItem === "Index Overview" ? "searchNavPanel-item--active" : ""}`}
                onClick={onSelectIndexOverview}
              >
                Index Overview
              </button>
              <button
                type="button"
                className={`searchNavPanel-item ${activeItem === "Status Details" ? "searchNavPanel-item--active" : ""}`}
                onClick={onSelectStatusDetails}
              >
                Status Details
              </button>
              <button
                type="button"
                className={`searchNavPanel-item ${activeItem === "Search Tester" ? "searchNavPanel-item--active" : ""}`}
                onClick={onSelectSearchTester}
              >
                Search Tester
              </button>
            </div>
          </div>
        )}

        {SECONDARY_NAV_GROUPS.map((group) => (
          <div
            className={`searchNavPanel-group ${group.dividerBefore ? "searchNavPanel-group--divided" : ""}`}
            key={group.title}
          >
            <div className="searchNavPanel-groupHeader">
              <span className="searchNavPanel-groupTitle">{group.title}</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="CaretUp" size={12} fill="#5c6c75" />
            </div>
            <div className="searchNavPanel-groupItems">
              {group.items.map((item) => {
                const action = itemActions[`${group.title}:${item.label}`];
                return (
                  <button
                    type="button"
                    key={item.label}
                    className={`searchNavPanel-item ${action?.active ? "searchNavPanel-item--active" : ""}`}
                    onClick={action?.onClick}
                  >
                    {item.glyph && (
                      // @ts-ignore - React 19 polymorphic type mismatch
                      <Icon glyph={item.glyph} size={14} fill="#5c6c75" />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
