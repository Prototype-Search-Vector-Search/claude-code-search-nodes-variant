import Icon from "@leafygreen-ui/icon";
import { Badge } from "@leafygreen-ui/badge";
import { Banner } from "@leafygreen-ui/banner";
import { Checkbox } from "@leafygreen-ui/checkbox";
import { Toggle } from "@leafygreen-ui/toggle";
import { Card } from "@leafygreen-ui/card";
import { Button } from "@leafygreen-ui/button";
import { Link } from "@leafygreen-ui/typography";
import { Table, TableHead, HeaderRow, HeaderCell, TableBody, Row, Cell } from "@leafygreen-ui/table";
import { IndexDetailPageShell } from "./IndexDetailPageShell";
import "./StatusDetailsPage.css";

export interface StatusDetailsPageProps {
  onBackToProjectOverview: () => void;
  onSelectSearchIndexes: () => void;
  onSelectIndexOverview: () => void;
  onSelectSearchTester: () => void;
  onSelectAutoEmbeddingUsage: () => void;
  onSelectAutoEmbeddingRateLimits: () => void;
  onSelectRerankingUsage: () => void;
  onSelectRerankingRateLimits: () => void;
  onOpenClusters: () => void;
  onOpenProjectSettings: () => void;
}

const COLUMNS: { label: string; sort?: boolean; info?: boolean }[] = [
  { label: "Shard Name", sort: true },
  { label: "Node", sort: true },
  { label: "Status", sort: true },
  { label: "Queryable", sort: true },
  { label: "Node Type" },
  { label: "Region", sort: true },
  { label: "Documents (Estimated)", info: true },
  { label: "Size", info: true, sort: true },
  { label: "Actions" },
];

const SHARD_ROWS = [
  { shard: "ac-gli5w9t-shard-02", node: "0l5lqn", size: "299.36KB" },
  { shard: "ac-gli5w9t-shard-02", node: "tgy7ed", size: "299.32KB" },
];

export function StatusDetailsPage({
  onBackToProjectOverview,
  onSelectSearchIndexes,
  onSelectIndexOverview,
  onSelectSearchTester,
  onSelectAutoEmbeddingUsage,
  onSelectAutoEmbeddingRateLimits,
  onSelectRerankingUsage,
  onSelectRerankingRateLimits,
  onOpenClusters,
  onOpenProjectSettings,
}: StatusDetailsPageProps) {
  return (
    <IndexDetailPageShell
      activeItem="Status Details"
      title="Status Details"
      onBackToProjectOverview={onBackToProjectOverview}
      onSelectSearchIndexes={onSelectSearchIndexes}
      onSelectIndexOverview={onSelectIndexOverview}
      onSelectStatusDetails={() => {}}
      onSelectAutoEmbeddingUsage={onSelectAutoEmbeddingUsage}
      onSelectAutoEmbeddingRateLimits={onSelectAutoEmbeddingRateLimits}
      onSelectRerankingUsage={onSelectRerankingUsage}
      onSelectRerankingRateLimits={onSelectRerankingRateLimits}
      onOpenClusters={onOpenClusters}
      onOpenProjectSettings={onOpenProjectSettings}
      onSelectSearchTester={onSelectSearchTester}
    >
      <div className="statusDetailsPage-countRow">
        <span className="statusDetailsPage-countLabel">
          INDEXED DOCUMENTS: <strong>11 of 11 (Estimated)</strong>
        </span>
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Icon glyph="InfoWithCircle" size={14} fill="#889397" />
        <div className="statusDetailsPage-exactCount">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Toggle aria-label="Use exact count" size="small" />
          <span>Use exact count</span>
        </div>
      </div>

      {/* @ts-ignore - React 19 polymorphic type mismatch */}
      <Card className="statusDetailsPage-card">
        <span className="statusDetailsPage-cardTitle">Index Serving Queries</span>
        <p className="statusDetailsPage-cardBody">
          Your queries are running normally using your latest index definition, which you can find in{" "}
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Link href="#" onClick={onSelectIndexOverview}>
            Index Overview
          </Link>
          .
        </p>
      </Card>

      {/* @ts-ignore - React 19 polymorphic type mismatch */}
      <Card className="statusDetailsPage-card">
        <span className="statusDetailsPage-cardTitle">Status Details by Node</span>

        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Banner className="statusDetailsPage-banner" variant="info">
          The index build status is different on each cluster node and might cause mixed query results to be
          returned.{" "}
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Link href="#">Learn about why node statuses differ</Link>
        </Banner>

        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Checkbox
          className="statusDetailsPage-checkbox"
          label='Automatically hide shards where index status is "Does_Not_Exist"'
          defaultChecked
        />

        <div className="statusDetailsPage-tableWrap">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Table>
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <TableHead>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <HeaderRow>
                {COLUMNS.map((col) => (
                  // @ts-ignore - React 19 polymorphic type mismatch
                  <HeaderCell key={col.label}>
                    <span className="statusDetailsPage-headerCell">
                      {col.label}
                      {col.info && (
                        // @ts-ignore - React 19 polymorphic type mismatch
                        <Icon glyph="InfoWithCircle" size={12} fill="#889397" />
                      )}
                      {col.sort && (
                        // @ts-ignore - React 19 polymorphic type mismatch
                        <Icon glyph="Unsorted" size={12} fill="#889397" />
                      )}
                    </span>
                  </HeaderCell>
                ))}
              </HeaderRow>
            </TableHead>
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <TableBody>
              {SHARD_ROWS.map((row) => (
                // @ts-ignore - React 19 polymorphic type mismatch
                <Row key={row.node}>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>{row.shard}</Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>{row.node}</Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Badge variant="green">READY</Badge>
                  </Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Icon glyph="Checkmark" fill="#00a35c" />
                  </Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>Search Node</Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>—</Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>11 (100%) indexed of 11</Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>{row.size}</Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Button size="xsmall" aria-label="More actions" leftGlyph={<Icon glyph="Ellipsis" />} />
                  </Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </IndexDetailPageShell>
  );
}
