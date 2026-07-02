import Icon from "@leafygreen-ui/icon";
import { Badge } from "@leafygreen-ui/badge";
import "./IndexDetailHeader.css";

export interface IndexDetailHeaderProps {
  title: string;
  indexName: string;
  onBack: () => void;
}

/**
 * Shared header for the Search Index detail pages (Index Overview, Status Details,
 * Search Tester) — back link, serif page title, and the index name/status badge row.
 */
export function IndexDetailHeader({ title, indexName, onBack }: IndexDetailHeaderProps) {
  return (
    <>
      <button type="button" className="indexDetailHeader-backLink" onClick={onBack}>
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Icon glyph="ArrowLeft" size={12} fill="#016bf8" />
        <span>Back to Search Indexes</span>
      </button>
      <p className="indexDetailHeader-title">{title}</p>
      <div className="indexDetailHeader-badges">
        <span className="indexDetailHeader-indexName">{indexName}</span>
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Badge variant="green">READY</Badge>
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Badge variant="lightgray">QUERYABLE</Badge>
      </div>
    </>
  );
}
