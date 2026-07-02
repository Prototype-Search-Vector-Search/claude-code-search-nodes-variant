import Icon from "@leafygreen-ui/icon";
import { Button } from "@leafygreen-ui/button";
import { Badge } from "@leafygreen-ui/badge";
import { Menu, MenuItem } from "@leafygreen-ui/menu";
import { Link } from "@leafygreen-ui/typography";
import { SearchInput } from "@leafygreen-ui/search-input";
import { Table, TableHead, HeaderRow, HeaderCell, TableBody, Row, Cell } from "@leafygreen-ui/table";
import { TopNav } from "./TopNav";
import { PersistentSideNav } from "./PersistentSideNav";
import { SearchNavPanel } from "./SearchNavPanel";
import "./SearchIndexesPage.css";

export interface SearchIndexesPageProps {
  onBackToProjectOverview: () => void;
  onOpenIndexOverview: () => void;
  onOpenStatusDetails: () => void;
  onOpenSearchTester: () => void;
  onOpenAutoEmbeddingUsage: () => void;
  onOpenAutoEmbeddingRateLimits: () => void;
  onOpenRerankingUsage: () => void;
  onOpenRerankingRateLimits: () => void;
  onOpenClusters: () => void;
  onOpenProjectSettings: () => void;
}

const COLUMNS: { label: string; sort?: "active" | "neutral"; info?: boolean }[] = [
  { label: "Database", sort: "active" },
  { label: "Collection", sort: "active" },
  { label: "Index Name", sort: "neutral" },
  { label: "Status", sort: "neutral", info: true },
  { label: "Queryable", sort: "neutral", info: true },
  { label: "Type" },
  { label: "Index Fields" },
  { label: "Size", sort: "neutral", info: true },
  { label: "Actions" },
];

export function SearchIndexesPage({
  onBackToProjectOverview,
  onOpenIndexOverview,
  onOpenStatusDetails,
  onOpenSearchTester,
  onOpenAutoEmbeddingUsage,
  onOpenAutoEmbeddingRateLimits,
  onOpenRerankingUsage,
  onOpenRerankingRateLimits,
  onOpenClusters,
  onOpenProjectSettings,
}: SearchIndexesPageProps) {
  return (
    <div className="searchIndexesPage">
      <div className="searchIndexesPage-body">
        <PersistentSideNav
          activeSection="database"
          activeItem="Search & Vector Search"
          onNavigateProjectOverview={onBackToProjectOverview}
          onOpenSearchIndexes={() => {}}
          onOpenClusters={onOpenClusters}
          onOpenProjectSettings={onOpenProjectSettings}
        >
          <SearchNavPanel
            onSelectAutoEmbeddingUsage={onOpenAutoEmbeddingUsage}
            onSelectAutoEmbeddingRateLimits={onOpenAutoEmbeddingRateLimits}
            onSelectRerankingUsage={onOpenRerankingUsage}
            onSelectRerankingRateLimits={onOpenRerankingRateLimits}
          />
        </PersistentSideNav>

        <div className="searchIndexesPage-mainColumn">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <TopNav organization="Leafy Green" project="Greenery" clusterName="Cluster0" showLogo={false} />

          <div className="searchIndexesPage-mainArea">
          <p className="searchIndexesPage-heading">Search & Vector Search</p>

          <div className="searchIndexesPage-toolbar">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <SearchInput
              aria-label="Find a search index"
              placeholder="Find a search index"
              className="searchIndexesPage-search"
            />
            <div className="searchIndexesPage-toolbarActions">
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Button variant="default" size="small">
                View compound query example
              </Button>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Button variant="primary" size="small" leftGlyph={<Icon glyph="Plus" />}>
                Create Search Index
              </Button>
            </div>
          </div>

          <div className="searchIndexesPage-tableWrap">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Table>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <TableHead>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <HeaderRow>
                  {COLUMNS.map((col) => (
                    // @ts-ignore - React 19 polymorphic type mismatch
                    <HeaderCell key={col.label}>
                      <span className="searchIndexesPage-headerCell">
                        {col.label}
                        {col.info && (
                          // @ts-ignore - React 19 polymorphic type mismatch
                          <Icon glyph="InfoWithCircle" size={12} fill="#889397" />
                        )}
                        {col.sort === "active" && (
                          // @ts-ignore - React 19 polymorphic type mismatch
                          <Icon glyph="SortAscending" size={12} fill="#016bf8" />
                        )}
                        {col.sort === "neutral" && (
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
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Row>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>homestyle_haven</Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Link href="#" hideExternalIcon>
                      products
                    </Link>
                  </Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Link href="#" hideExternalIcon onClick={onOpenIndexOverview}>
                      default
                    </Link>
                  </Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>
                    <div className="searchIndexesPage-statusCell">
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Badge variant="green">READY</Badge>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Link href="#" hideExternalIcon className="searchIndexesPage-statusLink" onClick={onOpenStatusDetails}>
                        View status details
                      </Link>
                    </div>
                  </Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Icon glyph="Checkmark" fill="#00a35c" />
                  </Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>search</Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>[dynamic]</Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>36.94MB</Cell>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Cell>
                    <div className="searchIndexesPage-actionsCell">
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Button size="xsmall" onClick={onOpenSearchTester}>QUERY</Button>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Menu
                        renderDarkMenu={false}
                        trigger={
                          // @ts-ignore - React 19 polymorphic type mismatch
                          <Button size="xsmall" aria-label="More actions" leftGlyph={<Icon glyph="Ellipsis" />} />
                        }
                      >
                        {/* @ts-ignore - React 19 polymorphic type mismatch */}
                        <MenuItem>Edit With Visual Editor</MenuItem>
                        {/* @ts-ignore - React 19 polymorphic type mismatch */}
                        <MenuItem>Edit With JSON Editor</MenuItem>
                        {/* @ts-ignore - React 19 polymorphic type mismatch */}
                        <MenuItem>Delete Index</MenuItem>
                      </Menu>
                    </div>
                  </Cell>
                </Row>
              </TableBody>
            </Table>
          </div>

          <div className="searchIndexesPage-learnMore">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Link href="https://www.mongodb.com/docs/atlas/atlas-search/">
              Learn more about Atlas Search
            </Link>
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Link href="https://www.mongodb.com/docs/atlas/atlas-vector-search/">
              Learn more about Atlas Vector Search
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
