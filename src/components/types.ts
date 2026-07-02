// ─── Shared types for the Create Cluster page ─────────────────────────────────

export type ClusterType = "flex" | "dedicated" | "free";
export type CloudProvider = "aws" | "gcp" | "azure";
export type DeleteTarget = "readOnly" | "analytics" | "search";

export interface NodeState {
  enabled: boolean;
  count: number;
}

export interface Region {
  code: string;
  name: string;
  flag: string;
  recommended?: boolean;
  lowCarbon?: boolean;
  noSearch?: boolean;
}

export interface ElectableRow {
  id: string;
  provider: CloudProvider;
  region: string;
  nodes: number;
  priority: string;
}

export interface WorkloadRow {
  id: string;
  provider: CloudProvider;
  region: string;
  nodes: number;
}

export interface Tag {
  id: string;
  key: string;
  value: string;
}

export const PROVIDER_NAMES: Record<CloudProvider, string> = {
  aws: "AWS",
  gcp: "Google Cloud",
  azure: "Azure",
};
