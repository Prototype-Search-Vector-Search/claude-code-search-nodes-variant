import { useState } from "react";
import type { ReactNode } from "react";
import Icon from "@leafygreen-ui/icon";
import type { GlyphName } from "@leafygreen-ui/icon";
import { IconButton } from "@leafygreen-ui/icon-button";
import { AtlasLogoLockup } from "@leafygreen-ui/logo";
import { AccountMenu } from "./AccountMenu";
import "./SideNavFlyout.css";
import "./AccountLayout.css";

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
    title: "Account",
    glyph: "Person",
    items: [{ label: "Profile Info", href: `${import.meta.env.BASE_URL}?view=account` }, { label: "Security" }],
  },
  {
    title: "Atlas Settings",
    glyph: "Cloud",
    items: [
      { label: "Invitations" },
      { label: "Organizations", href: `${import.meta.env.BASE_URL}?view=organizations` },
      { label: "User Preferences" },
      { label: "Legacy 2FA" },
    ],
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

export interface AccountLayoutProps {
  /** The nav item to highlight (e.g. "Profile Info" or "Organizations"). */
  activeItem: string;
  children: ReactNode;
}

export function AccountLayout({ activeItem, children }: AccountLayoutProps) {
  return (
    <div className="accountLayout">
      <aside className="accountLayout-sidebar">
        <div className="sideNavFlyout">
          <div className="sideNavFlyout-logo">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <AtlasLogoLockup height={32} color="green-dark-2" />
          </div>
          <div className="sideNavFlyout-body">
            {NAV_SECTIONS.map((section) => (
              <NavSectionBlock key={section.title} section={section} activeItem={activeItem} />
            ))}
          </div>
        </div>
      </aside>

      <div className="accountLayout-main">
        <div className="accountLayout-topActions">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <IconButton aria-label="Help">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="QuestionMarkWithCircle" />
          </IconButton>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <IconButton aria-label="Billing">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="CreditCard" />
          </IconButton>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <IconButton aria-label="Invite">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="InviteUser" />
          </IconButton>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <IconButton aria-label="Alerts">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="Bell" />
          </IconButton>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <IconButton aria-label="Product Menu">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="Apps" />
          </IconButton>
          <AccountMenu />
        </div>

        {children}
      </div>
    </div>
  );
}
