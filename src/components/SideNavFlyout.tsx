import { useState } from "react";
import Icon from "@leafygreen-ui/icon";
import type { GlyphName } from "@leafygreen-ui/icon";
import { IconButton } from "@leafygreen-ui/icon-button";
import { AtlasLogoLockup } from "@leafygreen-ui/logo";
import "./SideNavFlyout.css";

interface NavSection {
  title: string;
  glyph: GlyphName;
  items: string[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Database",
    glyph: "Database",
    items: ["Clusters", "Search & Vector Search", "Data Explorer", "Backup"],
  },
  {
    title: "Real-Time Processing",
    glyph: "Clock",
    items: ["Stream Processing", "Triggers"],
  },
  {
    title: "Services",
    glyph: "Laptop",
    items: ["AI Models", "Migration", "Data Federation", "Visualization"],
  },
  {
    title: "Security",
    glyph: "Lock",
    items: ["Security Quickstart", "Project Identity & Access", "Database & Network Access", "Activity Feed"],
  },
];

const PROJECT_OVERVIEW_LABEL = "Project Overview";
const PROJECT_SETTINGS_LABEL = "Project Settings";

interface SideNavSectionProps {
  section: NavSection;
  activeItem: string;
  selectedItem: string | null;
  onSelectItem: (item: string) => void;
  onOpenSearchIndexes: () => void;
  onOpenClusters: () => void;
}

function SideNavSection({
  section,
  activeItem,
  selectedItem,
  onSelectItem,
  onOpenSearchIndexes,
  onOpenClusters,
}: SideNavSectionProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="sideNavFlyout-section">
      <button
        type="button"
        className="sideNavFlyout-sectionHeader"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Icon glyph={section.glyph} size={14} fill="#00684a" />
        <span className="sideNavFlyout-sectionTitle">{section.title}</span>
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Icon glyph={open ? "CaretUp" : "CaretDown"} size={12} fill="#00684a" />
      </button>
      {open && (
        <div className="sideNavFlyout-items">
          {section.items.map((item) => {
            const isActive = item === activeItem || (activeItem !== PROJECT_OVERVIEW_LABEL && item === selectedItem);
            return (
              <button
                key={item}
                type="button"
                className={`sideNavFlyout-item ${isActive ? "sideNavFlyout-item--active" : ""}`}
                onClick={() => {
                  onSelectItem(item);
                  if (item === "Search & Vector Search") onOpenSearchIndexes();
                  if (item === "Clusters") onOpenClusters();
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export interface SideNavFlyoutProps {
  /** Which item should render as the active/highlighted row: `"Project Overview"` or a leaf item label. */
  activeItem: string;
  onNavigateProjectOverview: () => void;
  onOpenSearchIndexes: () => void;
  onOpenClusters: () => void;
  onOpenProjectSettings: () => void;
  /**
   * Renders the "MongoDB Atlas" lockup at the top of the panel. Used when this flyout
   * covers a mini rail (which only has a small leaf mark) — pages that already show the
   * lockup in their own TopNav (e.g. Project Overview's always-visible sidenav) should
   * leave this false to avoid showing the logo twice.
   */
  showLogo?: boolean;
}

/**
 * Full sidenav panel content (Project Overview row + Database/Real-Time/Services/Security
 * sections). Shared across every page — only `activeItem` changes which single row is
 * highlighted. Meant to be rendered inside a hover-triggered slide-out wrapper alongside
 * `MiniSideNav`.
 */
export function SideNavFlyout({
  activeItem,
  onNavigateProjectOverview,
  onOpenSearchIndexes,
  onOpenClusters,
  onOpenProjectSettings,
  showLogo = false,
}: SideNavFlyoutProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const isProjectOverviewActive = activeItem === PROJECT_OVERVIEW_LABEL;
  const isProjectSettingsActive = activeItem === PROJECT_SETTINGS_LABEL;

  return (
    <div className="sideNavFlyout">
      {showLogo && (
        <div className="sideNavFlyout-logo">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <AtlasLogoLockup height={32} color="green-dark-2" />
        </div>
      )}
      <div className="sideNavFlyout-body">
        <div className={`sideNavFlyout-projectRow ${isProjectOverviewActive ? "sideNavFlyout-projectRow--active" : ""}`}>
          {isProjectOverviewActive ? (
            <span className="sideNavFlyout-projectRowContent">
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="Project" size={14} fill="#00684a" />
              <span className="sideNavFlyout-projectRowLabel">Project Overview</span>
            </span>
          ) : (
            <button
              type="button"
              className="sideNavFlyout-projectRowContent sideNavFlyout-projectRowContent--button"
              onClick={onNavigateProjectOverview}
            >
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="Project" size={14} fill="#5c6c75" />
              <span className="sideNavFlyout-projectRowLabel">Project Overview</span>
            </button>
          )}
          <div
            className={`sideNavFlyout-projectRowGutter ${
              isProjectSettingsActive ? "sideNavFlyout-projectRowGutter--active" : ""
            }`}
          >
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <IconButton aria-label="Project settings" onClick={onOpenProjectSettings}>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="Settings" size={14} fill={isProjectSettingsActive ? "#00684a" : undefined} />
            </IconButton>
          </div>
        </div>

        {NAV_SECTIONS.map((section) => (
          <SideNavSection
            key={section.title}
            section={section}
            activeItem={activeItem}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
            onOpenSearchIndexes={onOpenSearchIndexes}
            onOpenClusters={onOpenClusters}
          />
        ))}
      </div>

      <div className="sideNavFlyout-footer">
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <IconButton aria-label="Collapse navigation">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Icon glyph="NavCollapse" size={14} />
        </IconButton>
      </div>
    </div>
  );
}
