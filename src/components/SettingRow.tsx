import type { ReactNode } from "react";
import "./SettingRow.css";

export interface SettingRowProps {
  label: string;
  badge?: string;
  description: ReactNode;
  children: ReactNode;
  topBorder?: boolean;
}

export function SettingRow({ label, badge, description, children, topBorder = true }: SettingRowProps) {
  return (
    <div className={`settingRow ${topBorder ? "settingRow--topBorder" : ""}`}>
      <div className="settingRow-main">
        <p className="settingRow-label">
          {label}
          {badge && <span className="settingRow-badge">{badge}</span>}
        </p>
        <div className="settingRow-description">{description}</div>
      </div>
      <div className="settingRow-control">{children}</div>
    </div>
  );
}
