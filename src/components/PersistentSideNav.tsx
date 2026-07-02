import type { ReactNode } from "react";
import { MiniSideNav } from "./MiniSideNav";
import type { MiniSideNavSection } from "./MiniSideNav";
import { SideNavFlyout } from "./SideNavFlyout";
import "./PersistentSideNav.css";

export interface PersistentSideNavProps {
  /** Which rail icon is active for the current page/section. */
  activeSection: MiniSideNavSection;
  /** Which row is highlighted in the large project-wide flyout nav. */
  activeItem: string;
  onNavigateProjectOverview: () => void;
  onOpenSearchIndexes: () => void;
  onOpenClusters: () => void;
  onOpenProjectSettings: () => void;
  /** The page's own always-visible contextual nav panel (e.g. `SearchNavPanel`). */
  children: ReactNode;
}

/**
 * Three navigation layers for pages nested under the main project nav:
 *  1. `MiniSideNav` (48px) — always visible.
 *  2. `children`, the page's own contextual panel (e.g. `SearchNavPanel`, 208px) — always
 *     visible immediately next to the rail. Together 1+2 form one permanent 256px sidebar.
 *  3. The large project-wide nav (`SideNavFlyout`) — hidden by default, slides out on
 *     hover to cover the entire 256px sidebar (both 1 and 2), then retracts on mouse-leave.
 */
export function PersistentSideNav({
  activeSection,
  activeItem,
  onNavigateProjectOverview,
  onOpenSearchIndexes,
  onOpenClusters,
  onOpenProjectSettings,
  children,
}: PersistentSideNavProps) {
  return (
    <div className="persistentSideNav">
      <div className="persistentSideNav-hoverZone">
        <MiniSideNav activeSection={activeSection} onNavigateProjectOverview={onNavigateProjectOverview} />
        <div className="persistentSideNav-flyoutOverlay">
          <SideNavFlyout
            activeItem={activeItem}
            onNavigateProjectOverview={onNavigateProjectOverview}
            onOpenSearchIndexes={onOpenSearchIndexes}
            onOpenClusters={onOpenClusters}
            onOpenProjectSettings={onOpenProjectSettings}
            showLogo
          />
        </div>
      </div>
      {children}
    </div>
  );
}
