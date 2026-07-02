import type { ReactNode } from "react";
import { Card } from "@leafygreen-ui/card";
import Icon from "@leafygreen-ui/icon";
import { palette } from "@leafygreen-ui/palette";
import "./SectionRow.css";

export interface SectionRowProps {
  title: string;
  meta?: ReactNode;
  open: boolean;
  onToggle: () => void;
  children?: ReactNode;
}

export function SectionRow({ title, meta, open, onToggle, children }: SectionRowProps) {
  return (
    // @ts-ignore - React 19 polymorphic type mismatch
    <Card className="sectionRow">
      <button type="button" className="sectionRow-header" onClick={onToggle}>
        <span className="sectionRow-title">{title}</span>
        <span className="sectionRow-metaWrap">
          {meta && <span className="sectionRow-meta">{meta}</span>}
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Icon glyph={open ? "ChevronUp" : "ChevronDown"} fill={palette.gray.base} />
        </span>
      </button>
      {open && children}
    </Card>
  );
}
