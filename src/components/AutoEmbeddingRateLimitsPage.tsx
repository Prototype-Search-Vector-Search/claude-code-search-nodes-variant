import type { ReactNode } from "react";
import { Button } from "@leafygreen-ui/button";
import { Badge } from "@leafygreen-ui/badge";
import { Link } from "@leafygreen-ui/typography";
import { Table, TableHead, HeaderRow, HeaderCell, TableBody, Row, Cell } from "@leafygreen-ui/table";
import { TopNav } from "./TopNav";
import { PersistentSideNav } from "./PersistentSideNav";
import { SearchNavPanel } from "./SearchNavPanel";
import "./AutoEmbeddingRateLimitsPage.css";

export interface AutoEmbeddingRateLimitsPageProps {
  onBackToProjectOverview: () => void;
  onOpenSearchIndexes: () => void;
  onOpenClusters: () => void;
  onOpenProjectSettings: () => void;
  onOpenIndexOverview: () => void;
  onOpenStatusDetails: () => void;
  onOpenSearchTester: () => void;
  onOpenAutoEmbeddingUsage: () => void;
  onOpenRerankingUsage: () => void;
  onOpenRerankingRateLimits: () => void;
}

interface RateLimitRow {
  models: string[];
  indexes: string[] | null;
  queryTpm: string;
  indexTpm: string;
  queryRpm: string;
  indexRpm: string;
}

const RATE_LIMIT_ROWS: RateLimitRow[] = [
  {
    models: ["voyage-4-large", "voyage-code-3"],
    indexes: ["index_1", "index_2"],
    queryTpm: "10,000",
    indexTpm: "10,000",
    queryRpm: "3",
    indexRpm: "3",
  },
  {
    models: ["voyage-4"],
    indexes: ["default", "vector_index"],
    queryTpm: "10,000",
    indexTpm: "10,000",
    queryRpm: "3",
    indexRpm: "3",
  },
  {
    models: ["voyage-4-lite"],
    indexes: null,
    queryTpm: "10,000",
    indexTpm: "10,000",
    queryRpm: "3",
    indexRpm: "3",
  },
];

function InlineCode({ children }: { children: ReactNode }) {
  return <span className="autoEmbeddingRateLimitsPage-code">{children}</span>;
}

export function AutoEmbeddingRateLimitsPage({
  onBackToProjectOverview,
  onOpenSearchIndexes,
  onOpenClusters,
  onOpenProjectSettings,
  onOpenIndexOverview,
  onOpenStatusDetails,
  onOpenSearchTester,
  onOpenAutoEmbeddingUsage,
  onOpenRerankingUsage,
  onOpenRerankingRateLimits,
}: AutoEmbeddingRateLimitsPageProps) {
  return (
    <div className="autoEmbeddingRateLimitsPage">
      <div className="autoEmbeddingRateLimitsPage-body">
        <PersistentSideNav
          activeSection="database"
          activeItem="Search & Vector Search"
          onNavigateProjectOverview={onBackToProjectOverview}
          onOpenSearchIndexes={onOpenSearchIndexes}
          onOpenClusters={onOpenClusters}
          onOpenProjectSettings={onOpenProjectSettings}
        >
          <SearchNavPanel
            activeItem="Auto-Embedding Rate Limits"
            onSelectSearchIndexes={onOpenSearchIndexes}
            onSelectIndexOverview={onOpenIndexOverview}
            onSelectStatusDetails={onOpenStatusDetails}
            onSelectSearchTester={onOpenSearchTester}
            onSelectAutoEmbeddingUsage={onOpenAutoEmbeddingUsage}
            onSelectAutoEmbeddingRateLimits={() => {}}
            onSelectRerankingUsage={onOpenRerankingUsage}
            onSelectRerankingRateLimits={onOpenRerankingRateLimits}
          />
        </PersistentSideNav>

        <div className="autoEmbeddingRateLimitsPage-mainColumn">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <TopNav organization="Leafy Green" project="Greenery" clusterName="Cluster0" showLogo={false} />

          <div className="autoEmbeddingRateLimitsPage-mainArea">
            <p className="autoEmbeddingRateLimitsPage-heading">Automated Embedding Rate Limits</p>

            <p className="autoEmbeddingRateLimitsPage-description">
              Rate limits, in the context of Automated Embedding, restrict the frequency of embedding generation
              operations and are applied separately for queries and for indexing (first time index build, document
              inserts and updates) operations.
            </p>

            <div className="autoEmbeddingRateLimitsPage-tableWrap">
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Table>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <TableHead>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <HeaderRow>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <HeaderCell>Model</HeaderCell>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <HeaderCell>Indexes using the model</HeaderCell>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <HeaderCell>Query Limit: Tokens/Min (TPM)</HeaderCell>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <HeaderCell>Index Limit: Tokens/Min (TPM)</HeaderCell>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <HeaderCell>Query Limit: Requests/Min (RPM)</HeaderCell>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <HeaderCell>Index Limit: Requests/Min (RPM)</HeaderCell>
                  </HeaderRow>
                </TableHead>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <TableBody>
                  {RATE_LIMIT_ROWS.map((row) => (
                    // @ts-ignore - React 19 polymorphic type mismatch
                    <Row key={row.models.join(",")}>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Cell>
                        <div className="autoEmbeddingRateLimitsPage-modelCell">
                          {row.models.map((model) => (
                            <InlineCode key={model}>{model}</InlineCode>
                          ))}
                        </div>
                      </Cell>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Cell>
                        {row.indexes ? (
                          <span className="autoEmbeddingRateLimitsPage-indexCell">
                            {row.indexes.map((index, i) => (
                              <span key={index}>
                                {i > 0 && ", "}
                                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                                <Link href="#" hideExternalIcon>
                                  {index}
                                </Link>
                              </span>
                            ))}
                          </span>
                        ) : (
                          <span className="autoEmbeddingRateLimitsPage-indexCell">–</span>
                        )}
                      </Cell>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Cell>
                        <span className="autoEmbeddingRateLimitsPage-numericCell">{row.queryTpm}</span>
                      </Cell>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Cell>
                        <span className="autoEmbeddingRateLimitsPage-numericCell">{row.indexTpm}</span>
                      </Cell>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Cell>
                        <span className="autoEmbeddingRateLimitsPage-numericCell">{row.queryRpm}</span>
                      </Cell>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Cell>
                        <span className="autoEmbeddingRateLimitsPage-numericCell">{row.indexRpm}</span>
                      </Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="autoEmbeddingRateLimitsPage-divider" />

            <p className="autoEmbeddingRateLimitsPage-subheading">Query Rate Limits</p>

            <p className="autoEmbeddingRateLimitsPage-description">
              Your cluster is currently on Tier 0. Once you qualify for a tier, you will never be downgraded to a
              lower tier.{" "}
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Link href="#">Visit our usage tiers documentation</Link> to learn more about the limits associated
              with each tier.
            </p>

            <div className="autoEmbeddingRateLimitsPage-tiers">
              <div className="autoEmbeddingRateLimitsPage-tier">
                <div className="autoEmbeddingRateLimitsPage-tierRail">
                  <span className="autoEmbeddingRateLimitsPage-tierDot autoEmbeddingRateLimitsPage-tierDot--filled" />
                  <span className="autoEmbeddingRateLimitsPage-tierLine" />
                </div>
                <div className="autoEmbeddingRateLimitsPage-tierContent">
                  <div className="autoEmbeddingRateLimitsPage-tierHeader">
                    <span className="autoEmbeddingRateLimitsPage-tierName">Tier 0</span>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Badge variant="green">Current Tier</Badge>
                  </div>
                  <p className="autoEmbeddingRateLimitsPage-tierText">Add payment method to move to Tier 1.</p>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Button size="xsmall">Add payment method</Button>
                </div>
              </div>

              <div className="autoEmbeddingRateLimitsPage-tier">
                <div className="autoEmbeddingRateLimitsPage-tierRail">
                  <span className="autoEmbeddingRateLimitsPage-tierDot" />
                </div>
                <div className="autoEmbeddingRateLimitsPage-tierContent">
                  <div className="autoEmbeddingRateLimitsPage-tierHeader">
                    <span className="autoEmbeddingRateLimitsPage-tierName">Tier 1</span>
                  </div>
                  <p className="autoEmbeddingRateLimitsPage-tierText">
                    If you need a higher rate limit, please request a rate limit increase.
                  </p>
                </div>
              </div>
            </div>

            <div className="autoEmbeddingRateLimitsPage-divider" />

            <p className="autoEmbeddingRateLimitsPage-subheading">Index Rate Limits</p>

            <p className="autoEmbeddingRateLimitsPage-description">
              Your cluster is currently on Tier 1. Once you qualify for a tier, you will never be downgraded to a
              lower tier.{" "}
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Link href="#">Visit our usage tiers documentation</Link> to learn more about the limits associated
              with each tier.
            </p>

            <p className="autoEmbeddingRateLimitsPage-description">
              If you still need a higher rate limit, please request a rate limit increase.
            </p>

            <ul className="autoEmbeddingRateLimitsPage-list">
              <li>
                Atlas Customers with a{" "}
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Link href="#">paid support plan</Link>: Submit a support ticket through the{" "}
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Link href="#">MongoDB Support portal</Link>
              </li>
              <li>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                All other customers: Email <Link href="#">contact@voyageai.com</Link>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
