import Icon from "@leafygreen-ui/icon";
import { Button } from "@leafygreen-ui/button";
import { IconButton } from "@leafygreen-ui/icon-button";
import { SearchInput } from "@leafygreen-ui/search-input";
import { Link } from "@leafygreen-ui/typography";
import { IndexDetailPageShell } from "./IndexDetailPageShell";
import "./SearchTesterPage.css";

export interface SearchTesterPageProps {
  onBackToProjectOverview: () => void;
  onSelectSearchIndexes: () => void;
  onSelectIndexOverview: () => void;
  onSelectStatusDetails: () => void;
  onSelectAutoEmbeddingUsage: () => void;
  onSelectAutoEmbeddingRateLimits: () => void;
  onSelectRerankingUsage: () => void;
  onSelectRerankingRateLimits: () => void;
  onOpenClusters: () => void;
  onOpenProjectSettings: () => void;
}

interface ResultDoc {
  id: string;
  category: string;
  description: string;
}

const RESULTS: ResultDoc[] = [
  {
    id: "691651035960bb2bfecf7f22",
    category: "Furniture",
    description: "Experience ultimate relaxation with our CloudComfort Sectional Sofa. T…",
  },
  {
    id: "691651035960bb2bfecf7f23",
    category: "Furniture",
    description: "The ErgoLux Office Chair is designed for professionals who spend long …",
  },
  {
    id: "691651035960bb2bfecf7f24",
    category: "Lighting",
    description: "Transform your space with the Sunset Glow Floor Lamp. This modern floo…",
  },
  {
    id: "691651035960bb2bfecf7f25",
    category: "Lighting",
    description: "Add elegance to your dining room with our Crystal Chandelier Pendant. …",
  },
];

export function SearchTesterPage({
  onBackToProjectOverview,
  onSelectSearchIndexes,
  onSelectIndexOverview,
  onSelectStatusDetails,
  onSelectAutoEmbeddingUsage,
  onSelectAutoEmbeddingRateLimits,
  onSelectRerankingUsage,
  onSelectRerankingRateLimits,
  onOpenClusters,
  onOpenProjectSettings,
}: SearchTesterPageProps) {
  return (
    <IndexDetailPageShell
      activeItem="Search Tester"
      title="Search Tester"
      onBackToProjectOverview={onBackToProjectOverview}
      onSelectAutoEmbeddingUsage={onSelectAutoEmbeddingUsage}
      onSelectAutoEmbeddingRateLimits={onSelectAutoEmbeddingRateLimits}
      onSelectRerankingUsage={onSelectRerankingUsage}
      onSelectRerankingRateLimits={onSelectRerankingRateLimits}
      onOpenClusters={onOpenClusters}
      onOpenProjectSettings={onOpenProjectSettings}
      onSelectSearchIndexes={onSelectSearchIndexes}
      onSelectIndexOverview={onSelectIndexOverview}
      onSelectStatusDetails={onSelectStatusDetails}
      onSelectSearchTester={() => {}}
    >
      <p className="searchTesterPage-description">
        Enter a term below to run a simple $search query on these sample documents from{" "}
        <strong>homestyle_haven.products</strong> using your search index and see the top 10 documents that are
        returned ranked by{" "}
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Link href="#">score</Link>. To edit $search query or to run{" "}
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Link href="#">$searchMeta</Link>, click "Edit Query" button. To run queries with stages after $search,
        visit the{" "}
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Link href="#">aggregation pipeline</Link>.
      </p>

      <div className="searchTesterPage-searchRow">
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <SearchInput
          aria-label="Enter any term to search documents"
          placeholder="Enter any term to search documents..."
          className="searchTesterPage-searchInput"
        />
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Button variant="baseGreen" leftGlyph={<Icon glyph="MagnifyingGlass" />}>
          Search
        </Button>
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Button variant="default" leftGlyph={<Icon glyph="Edit" />}>
          Edit Query
        </Button>
      </div>

      <div className="searchTesterPage-results">
        {RESULTS.map((doc) => (
          <div className="searchTesterPage-resultCard" key={doc.id}>
            <div className="searchTesterPage-resultCode">
              <div>
                <span className="searchTesterPage-key">_id</span>: <span className="searchTesterPage-objectId">ObjectId('{doc.id}')</span>
              </div>
              <div>
                <span className="searchTesterPage-key">category</span>: <span className="searchTesterPage-string">"{doc.category}"</span>
              </div>
              <div>
                <span className="searchTesterPage-key">description</span>: <span className="searchTesterPage-string">"{doc.description}"</span>
              </div>
            </div>
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <IconButton aria-label="Expand document">
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="ChevronRight" />
            </IconButton>
          </div>
        ))}
      </div>
    </IndexDetailPageShell>
  );
}
