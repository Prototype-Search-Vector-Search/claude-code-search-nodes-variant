import Icon from "@leafygreen-ui/icon";
import { IconButton } from "@leafygreen-ui/icon-button";
import { MongoDBLogoMark, AtlasLogoLockup } from "@leafygreen-ui/logo";
import { AccountMenu } from "./AccountMenu";
import { ClusterMenu } from "./ClusterMenu";
import { ProjectMenu } from "./ProjectMenu";
import { OrganizationMenu } from "./OrganizationMenu";
import "./TopNav.css";

export interface TopNavProps {
  organization?: string;
  project?: string;
  /** When provided, a third "Cluster" breadcrumb segment is rendered. */
  clusterName?: string;
  /** Renders the full "MongoDB Atlas" wordmark lockup instead of just the leaf mark. */
  showAtlasLockup?: boolean;
  /** Set to false to omit the logo box entirely (e.g. when a sidenav already renders its own logo). */
  showLogo?: boolean;
  /**
   * Renders a leading overflow-menu button (and chevron) before the breadcrumb —
   * used on pages drilled deep into a resource hierarchy (e.g. a single search index)
   * where the mini rail's own secondary nav already shows the page title, so the
   * breadcrumb only needs a page-level actions menu.
   */
  showResourceMenu?: boolean;
  /**
   * Overrides the default Organization/Project/Cluster breadcrumb with an arbitrary
   * chain of segments, e.g. Cluster / Collection / Search Index.
   */
  breadcrumbSegments?: { label: string; value: string; withCaret?: boolean }[];
  /**
   * Controls the second icon button (after Help).
   * `billing` shows a Billing/CreditCard action (default), `invite` shows an Invite/IAM action.
   */
  secondaryAction?: "billing" | "invite";
  /** Controls how the Avatar is rendered. `text` shows an initial (default), `icon` shows the Person glyph. */
  avatarFormat?: "text" | "icon";
  /** Renders the breadcrumb at 50% opacity instead of full opacity. */
  dimBreadcrumb?: boolean;
}

function ResourceSegment({
  label,
  value,
  withCaret,
  accentLabel,
}: {
  label: string;
  value: string;
  withCaret?: boolean;
  accentLabel?: boolean;
}) {
  return (
    <div className="topNav-segment">
      <div className={`topNav-segmentLabel ${accentLabel ? "topNav-segmentLabel--accent" : ""}`}>{label}</div>
      <div className="topNav-segmentValueRow">
        <span className="topNav-segmentValue">{value}</span>
        {withCaret && (
          // @ts-ignore - React 19 polymorphic type mismatch
          <Icon glyph="CaretDown" size={12} fill="#001e2b" />
        )}
      </div>
    </div>
  );
}

export function TopNav({
  // `organization` is intentionally not read — the org breadcrumb always shows
  // the single prototype org (see OrganizationMenu). Kept in props for callers.
  project,
  clusterName,
  showAtlasLockup,
  showLogo = true,
  showResourceMenu = false,
  breadcrumbSegments,
  secondaryAction = "billing",
  avatarFormat = "text",
  dimBreadcrumb = false,
}: TopNavProps) {
  return (
    <div className="topNav">
      {showLogo && (
        <div className={`topNav-logoBox ${showAtlasLockup ? "topNav-logoBox--lockup" : ""}`}>
          {showAtlasLockup ? (
            // @ts-ignore - React 19 polymorphic type mismatch
            <AtlasLogoLockup height={32} color="green-dark-2" />
          ) : (
            // @ts-ignore - React 19 polymorphic type mismatch
            <MongoDBLogoMark height={32} color="green-dark-2" />
          )}
        </div>
      )}
      <div className="topNav-bar">
        <div className={`topNav-breadcrumb ${dimBreadcrumb ? "topNav-breadcrumb--dim" : ""}`}>
          {showResourceMenu && (
            <div className="topNav-resourceMenu">
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <IconButton aria-label="Page actions">
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Icon glyph="Ellipsis" size={14} />
              </IconButton>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="ChevronRight" size={12} fill="#889397" />
            </div>
          )}
          {breadcrumbSegments ? (
            breadcrumbSegments.map((segment, index) => (
              <div className="topNav-breadcrumbSegment" key={segment.label}>
                {index > 0 && (
                  // @ts-ignore - React 19 polymorphic type mismatch
                  <Icon glyph="ChevronRight" size={12} fill="#889397" />
                )}
                {segment.label === "Cluster" && (segment.withCaret ?? true) ? (
                  <ClusterMenu
                    label={segment.label}
                    value={segment.value}
                    accentLabel={index === breadcrumbSegments.length - 1}
                  />
                ) : segment.label === "Project" && (segment.withCaret ?? true) ? (
                  <ProjectMenu
                    label={segment.label}
                    value={segment.value}
                    accentLabel={index === breadcrumbSegments.length - 1}
                  />
                ) : segment.label === "Organization" && (segment.withCaret ?? true) ? (
                  <OrganizationMenu label={segment.label} accentLabel={index === breadcrumbSegments.length - 1} />
                ) : (
                  <ResourceSegment
                    label={segment.label}
                    value={segment.value}
                    withCaret={segment.withCaret ?? true}
                    accentLabel={index === breadcrumbSegments.length - 1}
                  />
                )}
              </div>
            ))
          ) : (
            <>
              <OrganizationMenu label="Organization" accentLabel={!project && !clusterName} />
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="ChevronRight" size={12} fill="#889397" />
              <ProjectMenu label="Project" value={project ?? ""} accentLabel={!clusterName} />
              {clusterName && (
                <>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Icon glyph="ChevronRight" size={12} fill="#889397" />
                  <ClusterMenu label="Cluster" value={clusterName} accentLabel />
                </>
              )}
            </>
          )}
        </div>
        <div className="topNav-actions">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <IconButton aria-label="Help">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="QuestionMarkWithCircle" />
          </IconButton>
          {secondaryAction === "invite" ? (
            // @ts-ignore - React 19 polymorphic type mismatch
            <IconButton aria-label="Invite & Manage Access">
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="InviteUser" />
            </IconButton>
          ) : (
            // @ts-ignore - React 19 polymorphic type mismatch
            <IconButton aria-label="Billing">
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="CreditCard" />
            </IconButton>
          )}
          {secondaryAction !== "invite" && (
            // @ts-ignore - React 19 polymorphic type mismatch
            <IconButton aria-label="Invite & Manage Access">
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="InviteUser" />
            </IconButton>
          )}
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <IconButton aria-label="Activity Feed & Alerts">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="Bell" />
          </IconButton>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <IconButton aria-label="Product Menu">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="Apps" />
          </IconButton>
          <AccountMenu avatarFormat={avatarFormat} />
        </div>
      </div>
    </div>
  );
}
