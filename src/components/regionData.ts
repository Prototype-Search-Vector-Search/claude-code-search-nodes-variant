import type { Region } from "./types";

// ─── Region data ───────────────────────────────────────────────────────────────
export const ALL_REGIONS: Region[] = [
  { code: "us-east-1", name: "N. Virginia", flag: "🇺🇸", recommended: true, lowCarbon: true },
  { code: "us-east-2", name: "Ohio", flag: "🇺🇸", recommended: true },
  { code: "us-west-1", name: "N. California", flag: "🇺🇸" },
  { code: "us-west-2", name: "Oregon", flag: "🇺🇸", recommended: true },
  { code: "ca-central-1", name: "Montreal", flag: "🇨🇦", recommended: true },
  { code: "sa-east-1", name: "Sao Paulo", flag: "🇧🇷", recommended: true, noSearch: true },
  { code: "eu-north-1", name: "Stockholm", flag: "🇸🇪", recommended: true },
  { code: "eu-west-1", name: "Ireland", flag: "🇮🇪", recommended: true },
  { code: "eu-west-2", name: "London", flag: "🇬🇧", recommended: true },
  { code: "eu-west-3", name: "Paris", flag: "🇫🇷", recommended: true },
  { code: "eu-central-1", name: "Frankfurt", flag: "🇩🇪" },
  { code: "eu-central-2", name: "Zurich", flag: "🇨🇭", recommended: true, noSearch: true },
  { code: "eu-south-1", name: "Milan", flag: "🇮🇹", recommended: true },
  { code: "eu-south-2", name: "Spain", flag: "🇪🇸" },
  { code: "mx-central-1", name: "Mexico", flag: "🇲🇽", recommended: true, noSearch: true },
  { code: "ap-southeast-2", name: "Sydney", flag: "🇦🇺" },
  { code: "ap-southeast-4", name: "Melbourne", flag: "🇦🇺" },
  { code: "ap-east-1", name: "Hong Kong", flag: "🇭🇰" },
  { code: "ap-southeast-3", name: "Jakarta", flag: "🇮🇩" },
  { code: "ap-northeast-3", name: "Osaka", flag: "🇯🇵" },
  { code: "ap-northeast-2", name: "Seoul", flag: "🇰🇷" },
  { code: "ap-southeast-1", name: "Singapore", flag: "🇸🇬" },
  { code: "ap-northeast-1", name: "Tokyo", flag: "🇯🇵" },
  { code: "ap-south-1", name: "Mumbai", flag: "🇮🇳" },
  { code: "ap-south-2", name: "Hyderabad", flag: "🇮🇳" },
  { code: "me-central-1", name: "UAE", flag: "🇦🇪" },
  { code: "me-south-1", name: "Bahrain", flag: "🇧🇭" },
  { code: "af-south-1", name: "Cape Town", flag: "🇿🇦" },
];

export const REGION_GROUPS: { label: string; codes: string[] }[] = [
  { label: "NORTH AMERICA", codes: ["us-east-1", "us-east-2", "us-west-1", "us-west-2", "ca-central-1"] },
  { label: "SOUTH AMERICA", codes: ["sa-east-1"] },
  { label: "EUROPE", codes: ["eu-north-1", "eu-west-1", "eu-west-2", "eu-west-3", "eu-central-1", "eu-central-2", "eu-south-1", "eu-south-2"] },
  { label: "AUSTRALIA", codes: ["ap-southeast-2", "ap-southeast-4"] },
  { label: "ASIA", codes: ["ap-east-1", "ap-southeast-3", "ap-northeast-3", "ap-northeast-2", "ap-southeast-1", "ap-northeast-1", "ap-south-1", "ap-south-2"] },
  { label: "MIDDLE EAST", codes: ["me-central-1", "me-south-1"] },
  { label: "AFRICA", codes: ["af-south-1"] },
];

export function regionByCode(code: string): Region | undefined {
  return ALL_REGIONS.find((r) => r.code === code);
}
