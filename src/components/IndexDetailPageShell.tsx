import type { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { PersistentSideNav } from "./PersistentSideNav";
import { SearchNavPanel, type SearchNavActiveItem } from "./SearchNavPanel";
import { IndexDetailHeader } from "./IndexDetailHeader";
import "./IndexDetailPageShell.css";

export interface IndexDetailPageShellProps {
  activeItem: SearchNavActiveItem;
  title: string;
  onBackToProjectOverview: () => void;
  onSelectSearchIndexes: () => void;
  onSelectIndexOverview: () => void;
  onSelectStatusDetails: () => void;
  onSelectSearchTester: () => void;
  onSelectAutoEmbeddingUsage: () => void;
  onSelectAutoEmbeddingRateLimits: () => void;
  onSelectRerankingUsage: () => void;
  onSelectRerankingRateLimits: () => void;
  onOpenClusters: () => void;
  onOpenProjectSettings: () => void;
  children: ReactNode;
}

const BREADCRUMB_SEGMENTS = [
  { label: "Cluster", value: "Cluster0" },
  { label: "Collection", value: "homestyle_haven.products" },
  { label: "Search Index", value: "default" },
];

/**
 * Shared layout for the Search Index detail pages (Index Overview, Status Details,
 * Search Tester) — mini rail + SearchNavPanel (in its "index detail" mode) + a
 * resource-drilldown TopNav + the common back-link/title/badges header.
 */
export function IndexDetailPageShell({
  activeItem,
  title,
  onBackToProjectOverview,
  onSelectSearchIndexes,
  onSelectIndexOverview,
  onSelectStatusDetails,
  onSelectSearchTester,
  onSelectAutoEmbeddingUsage,
  onSelectAutoEmbeddingRateLimits,
  onSelectRerankingUsage,
  onSelectRerankingRateLimits,
  onOpenClusters,
  onOpenProjectSettings,
  children,
}: IndexDetailPageShellProps) {
  return (
    <div className="indexDetailPage">
      <div className="indexDetailPage-body">
        <PersistentSideNav
          activeSection="database"
          activeItem="Search & Vector Search"
          onNavigateProjectOverview={onBackToProjectOverview}
          onOpenSearchIndexes={onSelectSearchIndexes}
          onOpenClusters={onOpenClusters}
          onOpenProjectSettings={onOpenProjectSettings}
        >
          <SearchNavPanel
            activeItem={activeItem}
            onSelectSearchIndexes={onSelectSearchIndexes}
            onSelectIndexOverview={onSelectIndexOverview}
            onSelectStatusDetails={onSelectStatusDetails}
            onSelectSearchTester={onSelectSearchTester}
            onSelectAutoEmbeddingUsage={onSelectAutoEmbeddingUsage}
            onSelectAutoEmbeddingRateLimits={onSelectAutoEmbeddingRateLimits}
            onSelectRerankingUsage={onSelectRerankingUsage}
            onSelectRerankingRateLimits={onSelectRerankingRateLimits}
          />
        </PersistentSideNav>

        <div className="indexDetailPage-mainColumn">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <TopNav showLogo={false} showResourceMenu breadcrumbSegments={BREADCRUMB_SEGMENTS} />

          <div className="indexDetailPage-mainArea">
            <IndexDetailHeader title={title} indexName="default" onBack={onSelectSearchIndexes} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
