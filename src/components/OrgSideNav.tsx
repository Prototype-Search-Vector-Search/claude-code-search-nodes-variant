import { useState } from "react";
import Icon from "@leafygreen-ui/icon";
import type { GlyphName } from "@leafygreen-ui/icon";
import { IconButton } from "@leafygreen-ui/icon-button";
import "./SideNavFlyout.css";
import "./OrgSideNav.css";

interface NavItem {
  label: string;
  href?: string;
}

interface NavSection {
  title: string;
  glyph: GlyphName;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Identity & Access",
    glyph: "Person",
    items: [
      { label: "All Projects", href: `${import.meta.env.BASE_URL}?view=all-projects` },
      { label: "Users" },
      { label: "Applications" },
      { label: "Teams" },
      { label: "Federation" },
    ],
  },
  { title: "AI Models", glyph: "Sparkle", items: [{ label: "Model API Keys" }, { label: "Usage" }, { label: "Rate Limits" }] },
  { title: "Billing", glyph: "CreditCard", items: [{ label: "Overview" }, { label: "Invoices" }, { label: "Cost Explorer" }] },
  {
    title: "Configurations",
    glyph: "Building",
    items: [{ label: "Resource Policies" }, { label: "Admin" }, { label: "Activity Feed" }],
  },
];

function NavSectionBlock({ section, activeItem }: { section: NavSection; activeItem: string }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="sideNavFlyout-section">
      <button type="button" className="sideNavFlyout-sectionHeader" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Icon glyph={section.glyph} size={14} fill="#00684a" />
        <span className="sideNavFlyout-sectionTitle">{section.title}</span>
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Icon glyph={open ? "CaretUp" : "CaretDown"} size={12} fill="#00684a" />
      </button>
      {open && (
        <div className="sideNavFlyout-items">
          {section.items.map((item) => {
            const className = `sideNavFlyout-item ${item.label === activeItem ? "sideNavFlyout-item--active" : ""}`;
            return item.href ? (
              <a key={item.label} href={item.href} className={className}>
                {item.label}
              </a>
            ) : (
              <button key={item.label} type="button" className={className}>
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export interface OrgSideNavProps {
  /** Which nav row is active (e.g. "All Projects" or "Organization Settings"). */
  activeItem: string;
}

export function OrgSideNav({ activeItem }: OrgSideNavProps) {
  const settingsActive = activeItem === "Organization Settings";
  return (
    <div className="orgSideNav">
      <div className="sideNavFlyout">
        <div className="sideNavFlyout-body">
          {NAV_SECTIONS.map((section) => (
            <NavSectionBlock key={section.title} section={section} activeItem={activeItem} />
          ))}
        </div>
        <a
          href={`${import.meta.env.BASE_URL}?view=org-settings`}
          className={`orgSideNav-orgSettings ${settingsActive ? "orgSideNav-orgSettings--active" : ""}`}
        >
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Icon glyph="Settings" size={14} fill={settingsActive ? "#00684a" : "#5c6c75"} />
          <span>Organization Settings</span>
        </a>
        <div className="sideNavFlyout-footer">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <IconButton aria-label="Collapse navigation">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="NavCollapse" size={14} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
