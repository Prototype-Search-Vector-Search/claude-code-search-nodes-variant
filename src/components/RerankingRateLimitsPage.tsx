import type { ReactNode } from "react";
import { Button } from "@leafygreen-ui/button";
import { Badge } from "@leafygreen-ui/badge";
import { Link } from "@leafygreen-ui/typography";
import { Table, TableHead, HeaderRow, HeaderCell, TableBody, Row, Cell } from "@leafygreen-ui/table";
import { TopNav } from "./TopNav";
import { PersistentSideNav } from "./PersistentSideNav";
import { SearchNavPanel } from "./SearchNavPanel";
import "./RerankingRateLimitsPage.css";

export interface RerankingRateLimitsPageProps {
  onBackToProjectOverview: () => void;
  onOpenSearchIndexes: () => void;
  onOpenClusters: () => void;
  onOpenProjectSettings: () => void;
  onOpenIndexOverview: () => void;
  onOpenStatusDetails: () => void;
  onOpenSearchTester: () => void;
  onOpenAutoEmbeddingUsage: () => void;
  onOpenAutoEmbeddingRateLimits: () => void;
  onOpenRerankingUsage: () => void;
}

interface RateLimitRow {
  models: string[];
  tpm: string;
  rpm: string;
}

const RATE_LIMIT_ROWS: RateLimitRow[] = [
  { models: ["rerank-2.5", "rerank-2", "rerank-1"], tpm: "10,000", rpm: "3" },
  { models: ["rerank-2.5", "rerank-lite-1", "rerank-2.5-lite"], tpm: "10,000", rpm: "3" },
];

function InlineCode({ children }: { children: ReactNode }) {
  return <span className="rerankingRateLimitsPage-code">{children}</span>;
}

export function RerankingRateLimitsPage({
  onBackToProjectOverview,
  onOpenSearchIndexes,
  onOpenClusters,
  onOpenProjectSettings,
  onOpenIndexOverview,
  onOpenStatusDetails,
  onOpenSearchTester,
  onOpenAutoEmbeddingUsage,
  onOpenAutoEmbeddingRateLimits,
  onOpenRerankingUsage,
}: RerankingRateLimitsPageProps) {
  return (
    <div className="rerankingRateLimitsPage">
      <div className="rerankingRateLimitsPage-body">
        <PersistentSideNav
          activeSection="database"
          activeItem="Search & Vector Search"
          onNavigateProjectOverview={onBackToProjectOverview}
          onOpenSearchIndexes={onOpenSearchIndexes}
          onOpenClusters={onOpenClusters}
          onOpenProjectSettings={onOpenProjectSettings}
        >
          <SearchNavPanel
            activeItem="Reranking Rate Limits"
            onSelectSearchIndexes={onOpenSearchIndexes}
            onSelectIndexOverview={onOpenIndexOverview}
            onSelectStatusDetails={onOpenStatusDetails}
            onSelectSearchTester={onOpenSearchTester}
            onSelectAutoEmbeddingUsage={onOpenAutoEmbeddingUsage}
            onSelectAutoEmbeddingRateLimits={onOpenAutoEmbeddingRateLimits}
            onSelectRerankingUsage={onOpenRerankingUsage}
            onSelectRerankingRateLimits={() => {}}
          />
        </PersistentSideNav>

        <div className="rerankingRateLimitsPage-mainColumn">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <TopNav organization="Leafy Green" project="Greenery" clusterName="Cluster0" showLogo={false} />

          <div className="rerankingRateLimitsPage-mainArea">
            <p className="rerankingRateLimitsPage-heading">Native Reranking Rate Limits</p>

            <p className="rerankingRateLimitsPage-description">
              For details, please see our{" "}
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Link href="#">docs on rate limits</Link>.
            </p>

            <div className="rerankingRateLimitsPage-tableWrap">
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Table>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <TableHead>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <HeaderRow>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <HeaderCell>Model</HeaderCell>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <HeaderCell>Tokens/Min (TPM)</HeaderCell>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <HeaderCell>Requests/Min (RPM)</HeaderCell>
                  </HeaderRow>
                </TableHead>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <TableBody>
                  {RATE_LIMIT_ROWS.map((row) => (
                    // @ts-ignore - React 19 polymorphic type mismatch
                    <Row key={row.models.join(",")}>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Cell>
                        <div className="rerankingRateLimitsPage-modelCell">
                          {row.models.map((model) => (
                            <InlineCode key={model}>{model}</InlineCode>
                          ))}
                        </div>
                      </Cell>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Cell>
                        <span className="rerankingRateLimitsPage-numericCell">{row.tpm}</span>
                      </Cell>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Cell>
                        <span className="rerankingRateLimitsPage-numericCell">{row.rpm}</span>
                      </Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="rerankingRateLimitsPage-divider" />

            <p className="rerankingRateLimitsPage-subheading">Increase Rate Limit</p>

            <p className="rerankingRateLimitsPage-description">
              Your cluster is currently on Tier 0. Your limits will automatically be increased once you move to the
              next usage tier based on the criteria outlined below. Once you qualify for a tier, you will never be
              downgraded to a lower tier.{" "}
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Link href="#">Visit our usage tiers documentation</Link> to learn more about the limits associated
              with each tier.
            </p>

            <div className="rerankingRateLimitsPage-tiers">
              <div className="rerankingRateLimitsPage-tier">
                <div className="rerankingRateLimitsPage-tierRail">
                  <span className="rerankingRateLimitsPage-tierDot rerankingRateLimitsPage-tierDot--filled" />
                  <span className="rerankingRateLimitsPage-tierLine" />
                </div>
                <div className="rerankingRateLimitsPage-tierContent">
                  <div className="rerankingRateLimitsPage-tierHeader">
                    <span className="rerankingRateLimitsPage-tierName">Tier 0</span>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Badge variant="green">Current Tier</Badge>
                  </div>
                  <p className="rerankingRateLimitsPage-tierText">Add payment method to move to Tier 1</p>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Button size="xsmall">Add payment method</Button>
                </div>
              </div>

              <div className="rerankingRateLimitsPage-tier">
                <div className="rerankingRateLimitsPage-tierRail">
                  <span className="rerankingRateLimitsPage-tierDot" />
                </div>
                <div className="rerankingRateLimitsPage-tierContent">
                  <div className="rerankingRateLimitsPage-tierHeader">
                    <span className="rerankingRateLimitsPage-tierName">Tier 1</span>
                  </div>
                  <p className="rerankingRateLimitsPage-tierText">
                    If you still need a higher rate limit, please request a rate limit increase
                  </p>
                  <p className="rerankingRateLimitsPage-tierText">
                    *Atlas customers with a{" "}
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Link href="#">paid support plan</Link>: Submit a support ticket through the{" "}
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Link href="#">MongoDB Support portal</Link>
                  </p>
                  <p className="rerankingRateLimitsPage-tierText">
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    *All other customers: Email <Link href="#">address@mongodb.com</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
