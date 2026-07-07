import { Button } from "@leafygreen-ui/button";
import { H2 } from "@leafygreen-ui/typography";
import { TopNav } from "./TopNav";
import "./ReviewChangesPage.css";

export interface ReviewChangesPageProps {
  clusterName: string;
  /** Org > Project breadcrumb shown in the review card title. */
  organization?: string;
  project?: string;
  searchNodeCount: number;
  searchTierName: string;
  searchTierDetail: string;
  originalPrice: string;
  newPrice: string;
  onCancel: () => void;
  onEdit: () => void;
  onApply: () => void;
}

export function ReviewChangesPage({
  clusterName,
  organization = "MongoDB-Products-Team",
  project = "MikeW",
  searchNodeCount,
  searchTierName,
  searchTierDetail,
  originalPrice,
  newPrice,
  onCancel,
  onEdit,
  onApply,
}: ReviewChangesPageProps) {
  return (
    <div className="reviewChanges">
      {/* TopNav — unchanged from the rest of the app */}
      <TopNav organization="Leafy" project="Greenery" clusterName={clusterName} dimBreadcrumb />

      {/* Page header */}
      <div className="reviewChanges-headerWrap">
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <H2 as="h1" className="reviewChanges-heading">
          Editing {clusterName}
        </H2>
      </div>

      {/* Review card */}
      <div className="reviewChanges-content">
        <div className="reviewChanges-card">
          <p className="reviewChanges-title">
            Review your changes to <strong>{organization}</strong> &gt;
            <strong>{project}</strong> &gt; <strong>{clusterName}</strong>
          </p>

          <table className="reviewChanges-table">
            <thead>
              <tr>
                <th className="reviewChanges-feature">Feature</th>
                <th>Original</th>
                <th>New</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="reviewChanges-feature">Search Node Configuration</td>
                <td className="reviewChanges-original">No Search Nodes</td>
                <td className="reviewChanges-new">
                  {searchNodeCount} Search Node{searchNodeCount === 1 ? "" : "s"}
                </td>
              </tr>
              <tr>
                <td className="reviewChanges-feature">Search Tier</td>
                <td className="reviewChanges-original">N/A</td>
                <td className="reviewChanges-new">
                  {searchTierName}
                  <span className="reviewChanges-newDetail">{searchTierDetail}</span>
                </td>
              </tr>
              <tr className="reviewChanges-priceRow">
                <td className="reviewChanges-feature">Pricing</td>
                <td className="reviewChanges-original">{originalPrice}</td>
                <td className="reviewChanges-new">
                  {newPrice.split("/")[0]}
                  <span className="reviewChanges-priceUnit">/{newPrice.split("/")[1]}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="reviewChanges-footer">
        <div className="reviewChanges-footerInner">
          <button type="button" className="reviewChanges-cancelLink" onClick={onCancel}>
            Cancel
          </button>
          <div className="reviewChanges-footerActions">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Button variant="default" size="large" onClick={onEdit}>
              Edit
            </Button>
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Button variant="primary" size="large" onClick={onApply}>
              Apply Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
