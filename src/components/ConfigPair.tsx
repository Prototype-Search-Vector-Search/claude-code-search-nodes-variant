import type { ReactNode } from "react";
import "./ConfigPair.css";

export interface ConfigPairProps {
  children: ReactNode;
}

export function ConfigPair({ children }: ConfigPairProps) {
  return <div className="configPair">{children}</div>;
}

export interface ConfigOptionProps {
  title: string;
  description: ReactNode;
  children: ReactNode;
  divider?: boolean;
}

export function ConfigOption({ title, description, children, divider = true }: ConfigOptionProps) {
  return (
    <div className={`configOption ${divider ? "configOption--divider" : "configOption--noDivider"}`}>
      <div className="configOption-heading">
        <p className="configOption-title">{title}</p>
        <div className="configOption-description">{description}</div>
      </div>
      {children}
    </div>
  );
}
