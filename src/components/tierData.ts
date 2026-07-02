// ─── Cluster Tier data ─────────────────────────────────────────────────────────

export type TierClass = "Low-CPU" | "General" | "Local NVMe SSD";

export interface Tier {
  name: string;
  ram: string;
  storage: string;
  vcpu: string;
  price: string;
  iops?: string;
  writeIops?: string;
  connections?: string;
  nvmeStorage?: string;
}

export const DEV_TIERS: Tier[] = [
  { name: "M10", ram: "2 GB", storage: "10 GB", vcpu: "2 vCPUs", price: "$0.08/hr" },
  { name: "M20", ram: "4 GB", storage: "20 GB", vcpu: "2 vCPUs", price: "$0.20/hr" },
];

export const DEDICATED_TIERS: Tier[] = [
  { name: "M30", ram: "8 GB", storage: "40 GB", vcpu: "2 vCPUs", price: "$1.00/hr", iops: "41,700", writeIops: "11,000", connections: "3,000", nvmeStorage: "400 GB" },
  { name: "M40", ram: "16 GB", storage: "80 GB", vcpu: "4 vCPUs", price: "$1.04/hr", iops: "83,000", writeIops: "22,000", connections: "6,000", nvmeStorage: "800 GB" },
  { name: "M50", ram: "32 GB", storage: "160 GB", vcpu: "8 vCPUs", price: "$2.00/hr", iops: "166,000", writeIops: "45,000", connections: "16,000", nvmeStorage: "800 GB" },
  { name: "M60", ram: "64 GB", storage: "320 GB", vcpu: "16 vCPUs", price: "$3.95/hr", iops: "421,500", writeIops: "180,000", connections: "132,000", nvmeStorage: "1600 GB" },
  { name: "M80", ram: "128 GB", storage: "750 GB", vcpu: "32 vCPUs", price: "$7.30/hr", iops: "421,500", writeIops: "180,000", connections: "132,000", nvmeStorage: "1600 GB" },
  { name: "M140", ram: "192 GB", storage: "1000 GB", vcpu: "48 vCPUs", price: "$10.99/hr", iops: "421,500", writeIops: "180,000", connections: "132,000", nvmeStorage: "3200 GB" },
  { name: "M200", ram: "256 GB", storage: "1500 GB", vcpu: "64 vCPUs", price: "$14.59/hr", iops: "421,500", writeIops: "180,000", connections: "132,000", nvmeStorage: "3200 GB" },
  { name: "M300", ram: "384 GB", storage: "2000 GB", vcpu: "96 vCPUs", price: "$21.85/hr", iops: "421,500", writeIops: "180,000", connections: "132,000", nvmeStorage: "6400 GB" },
  { name: "M400", ram: "512 GB", storage: "3000 GB", vcpu: "64 vCPUs", price: "$22.40/hr", iops: "421,500", writeIops: "180,000", connections: "132,000", nvmeStorage: "6400 GB" },
  { name: "M700", ram: "786 GB", storage: "4096 GB", vcpu: "96 vCPUs", price: "$33.26/hr", iops: "421,500", writeIops: "180,000", connections: "132,000", nvmeStorage: "6400 GB" },
];

export const ALL_TIERS: Tier[] = [...DEV_TIERS, ...DEDICATED_TIERS];

export type SearchTierClass = "Low-CPU" | "High-CPU" | "Storage-Optimized";

export interface SearchTier {
  name: string;
  ram: string;
  storage: string;
  vcpu: string;
  price: string;
  readIops: string;
  writeIops: string;
}

export const SEARCH_TIERS: SearchTier[] = [
  { name: "S20", ram: "4 GB", storage: "98 GB", vcpu: "2 vCPUs", price: "$0.12/hr", readIops: "26,875", writeIops: "11,250" },
  { name: "S30", ram: "8 GB", storage: "198 GB", vcpu: "4 vCPUs", price: "$0.24/hr", readIops: "53,750", writeIops: "22,500" },
  { name: "S40", ram: "16 GB", storage: "396 GB", vcpu: "8 vCPUs", price: "$0.48/hr", readIops: "107,500", writeIops: "45,000" },
  { name: "S50", ram: "32 GB", storage: "796 GB", vcpu: "16 vCPUs", price: "$0.99/hr", readIops: "215,000", writeIops: "90,000" },
  { name: "S60", ram: "64 GB", storage: "1592 GB", vcpu: "32 vCPUs", price: "$1.77/hr", readIops: "430,000", writeIops: "180,000" },
  { name: "S70", ram: "96 GB", storage: "2387 GB", vcpu: "48 vCPUs", price: "$2.50/hr", readIops: "645,000", writeIops: "270,000" },
  { name: "S80", ram: "128 GB", storage: "3185 GB", vcpu: "64 vCPUs", price: "$3.26/hr", readIops: "860,000", writeIops: "360,000" },
];
