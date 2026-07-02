import { Combobox, ComboboxOption, ComboboxGroup } from "@leafygreen-ui/combobox";
import { ALL_REGIONS, REGION_GROUPS } from "./regionData";

export interface RegionSelectProps {
  value: string;
  onChange: (v: string) => void;
  exclude?: string[];
}

// Searchable region dropdown, grouped by continent — chosen over a plain
// <Select> because there are ~28 regions and a searchable list is easier
// to scan than a long flat menu.
export function RegionSelect({ value, onChange, exclude = [] }: RegionSelectProps) {
  return (
    <Combobox
      value={value}
      onChange={(v: string | null) => {
        if (v) onChange(v);
      }}
      clearable={false}
      aria-label="Region"
      size="small"
    >
      {REGION_GROUPS.map((group) => {
        const options = group.codes
          .map((code) => ALL_REGIONS.find((r) => r.code === code))
          .filter((r): r is NonNullable<typeof r> => !!r && (!exclude.includes(r.code) || r.code === value));
        if (options.length === 0) return null;
        return (
          <ComboboxGroup key={group.label} label={group.label}>
            {options.map((r) => (
              <ComboboxOption key={r.code} value={r.code} displayName={`${r.flag} ${r.name} (${r.code})`} />
            ))}
          </ComboboxGroup>
        );
      })}
    </Combobox>
  );
}
