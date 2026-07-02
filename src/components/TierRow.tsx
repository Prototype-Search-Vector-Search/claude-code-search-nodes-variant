import Icon from "@leafygreen-ui/icon";
import { palette } from "@leafygreen-ui/palette";
import type { Tier } from "./tierData";
import "./TierTable.css";

export interface TierRowProps {
  tier: Tier;
  selected: boolean;
  onClick: () => void;
}

export function TierRow({ tier, selected, onClick }: TierRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tierTable-row ${selected ? "tierTable-row--selected" : ""}`}
    >
      <div className={`tierTable-cellName ${selected ? "tierTable-cellName--selected" : "tierTable-cellName--unselected"}`}>
        {selected && (
          // @ts-ignore - React 19 polymorphic type mismatch
          <Icon glyph="CheckmarkWithCircle" fill={palette.green.dark1} size={14} />
        )}
        {tier.name}
      </div>
      <div className="tierTable-cell">{tier.ram}</div>
      <div className="tierTable-cell">{tier.storage}</div>
      <div className="tierTable-cell">{tier.vcpu}</div>
      <div className="tierTable-cellPrice">
        <span className="tierTable-priceFrom">from </span>
        <span className="tierTable-priceValue">{tier.price}</span>
      </div>
    </button>
  );
}
