import type { ReactNode } from "react";
import Icon from "@leafygreen-ui/icon";
import { Button } from "@leafygreen-ui/button";
import { Card } from "@leafygreen-ui/card";
import { Link } from "@leafygreen-ui/typography";
import { Table, TableHead, HeaderRow, HeaderCell, TableBody, Row, Cell } from "@leafygreen-ui/table";
import { IndexDetailPageShell } from "./IndexDetailPageShell";
import "./IndexOverviewPage.css";

export interface IndexOverviewPageProps {
  onBackToProjectOverview: () => void;
  onSelectSearchIndexes: () => void;
  onSelectStatusDetails: () => void;
  onSelectSearchTester: () => void;
  onSelectAutoEmbeddingUsage: () => void;
  onSelectAutoEmbeddingRateLimits: () => void;
  onSelectRerankingUsage: () => void;
  onSelectRerankingRateLimits: () => void;
  onOpenClusters: () => void;
  onOpenProjectSettings: () => void;
}

interface ConfigRow {
  label: string;
  description: ReactNode;
  value: string;
}

const CONFIG_ROWS: ConfigRow[] = [
  {
    label: "Index Analyzer",
    description: "Specifies how text is processed and tokenized when building the search index.",
    value: "lucene.standard",
  },
  {
    label: "Search Analyzer",
    description: "Defines how search queries are processed and tokenized.",
    value: "lucene.standard",
  },
  {
    label: "Dynamic Mapping",
    description:
      "Automatically maps supported data to field mapping types, including new fields and fields with polymorphic data.",
    value: "On",
  },
  {
    label: "Stored Source Fields",
    description: (
      <>
        Selects which fields from the collection are stored in the index for retrieval alongside search results. See{" "}
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Link href="#">Use Cases</Link> and{" "}
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Link href="#">Performance Considerations</Link> for details.
      </>
    ),
    value: "None",
  },
  {
    label: "Synonyms Mappings",
    description: 'Respects defined word equivalents by accounting for similar terms (like "car" and "automobile") to improve search results.',
    value: "None",
  },
];

export function IndexOverviewPage({
  onBackToProjectOverview,
  onSelectSearchIndexes,
  onSelectStatusDetails,
  onSelectSearchTester,
  onSelectAutoEmbeddingUsage,
  onSelectAutoEmbeddingRateLimits,
  onSelectRerankingUsage,
  onSelectRerankingRateLimits,
  onOpenClusters,
  onOpenProjectSettings,
}: IndexOverviewPageProps) {
  return (
    <IndexDetailPageShell
      activeItem="Index Overview"
      title="Index Overview"
      onBackToProjectOverview={onBackToProjectOverview}
      onSelectSearchIndexes={onSelectSearchIndexes}
      onSelectIndexOverview={() => {}}
      onSelectStatusDetails={onSelectStatusDetails}
      onSelectSearchTester={onSelectSearchTester}
      onSelectAutoEmbeddingUsage={onSelectAutoEmbeddingUsage}
      onSelectAutoEmbeddingRateLimits={onSelectAutoEmbeddingRateLimits}
      onSelectRerankingUsage={onSelectRerankingUsage}
      onSelectRerankingRateLimits={onSelectRerankingRateLimits}
      onOpenClusters={onOpenClusters}
      onOpenProjectSettings={onOpenProjectSettings}
    >
      <div className="indexOverviewPage-descriptionRow">
        <p className="indexOverviewPage-description">
          This search index parses the data in <strong>homestyle_haven.products</strong> and has the following
          configurations.
        </p>
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Button variant="default" size="small" rightGlyph={<Icon glyph="CaretDown" />}>
          Edit Index Definition
        </Button>
      </div>

      {/* @ts-ignore - React 19 polymorphic type mismatch */}
      <Card className="indexOverviewPage-card">
        <span className="indexOverviewPage-cardTitle">Index Configurations</span>
        <div className="indexOverviewPage-configRows">
          {CONFIG_ROWS.map((row) => (
            <div className="indexOverviewPage-configRow" key={row.label}>
              <span className="indexOverviewPage-configLabel">{row.label}</span>
              <span className="indexOverviewPage-configDescription">{row.description}</span>
              <span className="indexOverviewPage-configValue">{row.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* @ts-ignore - React 19 polymorphic type mismatch */}
      <Card className="indexOverviewPage-card">
        <span className="indexOverviewPage-cardTitle">Field Mappings</span>
        <p className="indexOverviewPage-fieldMappingsIntro">
          Configure specific fields within your search index with data types, analyzers, and input parameters.
          Field-level definitions will override the defaults above.{" "}
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Link href="#">Learn more</Link>
        </p>
        <div className="indexOverviewPage-fieldMappingsTable">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Table>
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <TableHead>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <HeaderRow>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <HeaderCell>Field Name</HeaderCell>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <HeaderCell>Data Type</HeaderCell>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <HeaderCell>Properties</HeaderCell>
              </HeaderRow>
            </TableHead>
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <TableBody>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Row>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Cell>category</Cell>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Cell>String</Cell>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Link href="#" hideExternalIcon>
                    String Properties
                  </Link>
                </Cell>
              </Row>
            </TableBody>
          </Table>
        </div>
      </Card>
    </IndexDetailPageShell>
  );
}
