import Icon from "@leafygreen-ui/icon";
import type { GlyphName } from "@leafygreen-ui/icon";
import { MongoDBLogoMark } from "@leafygreen-ui/logo";
import "./MiniSideNav.css";

export type MiniSideNavSection = "project" | "database" | "realtime" | "services" | "security";

export interface MiniSideNavProps {
  /** Which rail icon should render as active/highlighted for the current page. */
  activeSection: MiniSideNavSection;
  /** Always navigates back to the Project Overview page, regardless of current section. */
  onNavigateProjectOverview: () => void;
}

interface RailIcon {
  section: MiniSideNavSection;
  glyph: GlyphName;
  label: string;
}

const RAIL_ICONS: RailIcon[] = [
  { section: "database", glyph: "Database", label: "Database" },
  { section: "realtime", glyph: "Clock", label: "Real-Time Processing" },
  { section: "services", glyph: "Laptop", label: "Services" },
  { section: "security", glyph: "Lock", label: "Security" },
];

/**
 * Persistent 48px icon rail shown on pages nested under the main project nav (e.g. Search
 * & Vector Search). Pair with a flyout wrapper that slides out that page's own contextual
 * nav on hover — see `PersistentSideNav`.
 */
export function MiniSideNav({ activeSection, onNavigateProjectOverview }: MiniSideNavProps) {
  const isProjectActive = activeSection === "project";

  return (
    <nav className="miniSideNav">
      <div className="miniSideNav-logo">
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <MongoDBLogoMark height={24} color="green-dark-2" />
      </div>
      <button
        type="button"
        className={`miniSideNav-projectRow ${isProjectActive ? "miniSideNav-projectRow--active" : ""}`}
        aria-label="Project Overview"
        onClick={onNavigateProjectOverview}
      >
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Icon glyph="Project" size={18} fill={isProjectActive ? "#00684a" : "#5c6c75"} />
      </button>
      <div className="miniSideNav-icons">
        {RAIL_ICONS.map((icon) => {
          const isActive = icon.section === activeSection;
          return (
            <button
              key={icon.section}
              type="button"
              className={`miniSideNav-icon ${isActive ? "miniSideNav-icon--active" : ""}`}
              aria-label={icon.label}
            >
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph={icon.glyph} size={18} fill={isActive ? "#00684a" : "#5c6c75"} />
            </button>
          );
        })}
      </div>
      <div className="miniSideNav-footer">
        <button type="button" className="miniSideNav-icon" aria-label="Collapse navigation">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Icon glyph="NavCollapse" size={16} fill="#5c6c75" />
        </button>
      </div>
    </nav>
  );
}
