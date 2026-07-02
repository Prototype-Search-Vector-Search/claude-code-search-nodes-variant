import { useEffect, useRef, useState } from "react";
import Icon from "@leafygreen-ui/icon";
import "./ClusterMenu.css";

export interface ProjectMenuProps {
  /** The breadcrumb label (e.g. "Project"). */
  label: string;
  /** The currently active project name shown in the breadcrumb. */
  value: string;
  /** Renders the label in dark green (used when this is the active/last breadcrumb segment). */
  accentLabel?: boolean;
}

export function ProjectMenu({ label, value, accentLabel }: ProjectMenuProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
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

  const matches = "Greenery".toLowerCase().includes(query.trim().toLowerCase());

  return (
    <div className="clusterMenu" ref={ref}>
      <button
        type="button"
        className="clusterMenu-trigger topNav-segment"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`topNav-segmentLabel ${accentLabel ? "topNav-segmentLabel--accent" : ""}`}>{label}</span>
        <span className="topNav-segmentValueRow">
          <span className="topNav-segmentValue">{value}</span>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Icon glyph="CaretDown" size={12} fill="#001e2b" />
        </span>
      </button>

      {open && (
        <div className="clusterMenu-menu" role="menu">
          <div className="clusterMenu-search">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="MagnifyingGlass" size={16} fill="#889397" />
            <input
              type="text"
              className="clusterMenu-searchInput"
              placeholder="Find a Project"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>

          <div className="clusterMenu-list">
            {matches ? (
              <a
                href={`${import.meta.env.BASE_URL}?view=project-overview`}
                className="clusterMenu-item clusterMenu-item--active"
                role="menuitem"
              >
                Greenery
              </a>
            ) : (
              <div className="clusterMenu-empty">No projects found</div>
            )}
          </div>

          <div className="clusterMenu-divider" />
          <a href={`${import.meta.env.BASE_URL}?view=all-projects`} className="clusterMenu-viewAll" role="menuitem">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="Apps" size={16} fill="#016bf8" />
            View all Projects
          </a>
        </div>
      )}
    </div>
  );
}
