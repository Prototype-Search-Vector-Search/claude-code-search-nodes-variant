import { useEffect, useRef, useState } from "react";
import Icon from "@leafygreen-ui/icon";
import { Avatar } from "@leafygreen-ui/avatar";
import { Button } from "@leafygreen-ui/button";
import "./AccountMenu.css";

export interface AccountMenuProps {
  /** Controls how the trigger Avatar is rendered. */
  avatarFormat?: "text" | "icon";
}

export function AccountMenu({ avatarFormat = "text" }: AccountMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="accountMenu-wrap" ref={ref}>
      <button
        type="button"
        className="accountMenu-avatar"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {avatarFormat === "icon" ? (
          // @ts-ignore - React 19 polymorphic type mismatch
          <Avatar format="icon" />
        ) : (
          // @ts-ignore - React 19 polymorphic type mismatch
          <Avatar format="text" text="M" />
        )}
      </button>
      {open && (
        <div className="accountMenu-menu" role="menu">
          <div className="accountMenu-header">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Avatar format="text" text="M" size="large" />
            <div className="accountMenu-name">Michael Waltzer</div>
            <div className="accountMenu-email">michael.waltzer@mongodb.com</div>
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Button
              className="accountMenu-manageBtn"
              onClick={() => window.open(`${import.meta.env.BASE_URL}?view=account`, "_blank", "noopener")}
            >
              Manage your MongoDB Account
            </Button>
          </div>
          <div className="accountMenu-divider" />
          <div className="accountMenu-list">
            <button
              type="button"
              role="menuitem"
              className="accountMenu-item"
              onClick={() => {
                window.location.href = `${import.meta.env.BASE_URL}?view=organizations`;
              }}
            >
              Organizations
            </button>
            <button
              type="button"
              role="menuitem"
              className="accountMenu-item"
              onClick={() => {
                window.location.href = `${import.meta.env.BASE_URL}?view=clusters`;
              }}
            >
              All Clusters
            </button>
            <button type="button" role="menuitem" className="accountMenu-item">
              Invitations
            </button>
            <button type="button" role="menuitem" className="accountMenu-item">
              Send Feedback
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="OpenNewTab" size={14} fill="#016bf8" />
            </button>
          </div>
          <div className="accountMenu-divider" />
          <div className="accountMenu-list">
            <button type="button" role="menuitem" className="accountMenu-item">
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
