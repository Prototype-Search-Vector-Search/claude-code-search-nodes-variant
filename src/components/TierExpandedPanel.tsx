import Icon from "@leafygreen-ui/icon";
import { palette } from "@leafygreen-ui/palette";
import { Checkbox } from "@leafygreen-ui/checkbox";
import { Select, Option } from "@leafygreen-ui/select";
import { Banner } from "@leafygreen-ui/banner";
import { Body } from "@leafygreen-ui/typography";
import type { Tier, TierClass } from "./tierData";
import { ALL_TIERS } from "./tierData";
import "./TierExpandedPanel.css";

export interface TierExpandedPanelProps {
  tier: Tier;
  tierClass: TierClass;
  autoScale: boolean;
  setAutoScale: (v: boolean) => void;
  scaleDown: boolean;
  setScaleDown: (v: boolean) => void;
  scaleNvme: boolean;
  setScaleNvme: (v: boolean) => void;
  minTier: string;
  setMinTier: (v: string) => void;
  maxTier: string;
  setMaxTier: (v: string) => void;
}

export function TierExpandedPanel({
  tier,
  tierClass,
  autoScale,
  setAutoScale,
  scaleDown,
  setScaleDown,
  scaleNvme,
  setScaleNvme,
  minTier,
  setMinTier,
  maxTier,
  setMaxTier,
}: TierExpandedPanelProps) {
  const isNvme = tierClass === "Local NVMe SSD";

  return (
    <div className="tierExpandedPanel">
      {/* Selected tier row */}
      <div className="tierExpandedPanel-summaryRow">
        <div className="tierExpandedPanel-summaryName">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Icon glyph="CheckmarkWithCircle" fill={palette.green.dark1} size={14} />
          {tier.name}
        </div>
        <div className="tierExpandedPanel-summaryCell">{tier.ram}</div>
        <div className="tierExpandedPanel-summaryCell">{isNvme && tier.nvmeStorage ? tier.nvmeStorage : tier.storage}</div>
        <div className="tierExpandedPanel-summaryCell">{tier.vcpu}</div>
        <div className="tierExpandedPanel-summaryPrice">
          <span className="tierExpandedPanel-priceFrom">from </span>
          <span className="tierExpandedPanel-priceValue">{tier.price}</span>
        </div>
      </div>

      <div className="tierExpandedPanel-body">
        {/* Left label column */}
        <div className="tierExpandedPanel-labels">
          {isNvme && <div className="tierExpandedPanel-labelCell">Storage</div>}
          <div className="tierExpandedPanel-labelCell">Auto-scale</div>
          {isNvme && <div className="tierExpandedPanel-labelCell">IOPS</div>}
          {isNvme && (
            <div className="tierExpandedPanel-labelCell">
              Additional
              <br />
              Info
            </div>
          )}
        </div>

        {/* Right content column */}
        <div className="tierExpandedPanel-content">
          {isNvme && (
            <div className="tierExpandedPanel-contentCell">
              <span className="tierExpandedPanel-bold">{tier.nvmeStorage}</span>
              <span className="tierExpandedPanel-italic"> Storage is configured according to the use of Local NVMe SSD.</span>
            </div>
          )}

          {/* Auto-scale */}
          <div className="tierExpandedPanel-autoScaleCell">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Body className="tierExpandedPanel-autoScaleTitle">Compute Auto-Scale</Body>
            <Checkbox
              checked={autoScale}
              onChange={(e) => setAutoScale(e.target.checked)}
              label="Cluster Tier Scaling"
            />
            {autoScale && (
              <>
                <div className="tierExpandedPanel-indent">
                  <Checkbox
                    checked={scaleDown}
                    onChange={(e) => setScaleDown(e.target.checked)}
                    label="Allow cluster to be scaled down"
                  />
                </div>
                <div className="tierExpandedPanel-scaleRange">
                  <div className="tierExpandedPanel-scaleRangeCol">
                    <span className="tierExpandedPanel-scaleRangeLabel">Minimum cluster tier</span>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Select aria-label="Minimum cluster tier" value={minTier} onChange={setMinTier} size="small">
                      {ALL_TIERS.map((t) => (
                        // @ts-ignore - React 19 polymorphic type mismatch
                        <Option key={t.name} value={t.name}>
                          {t.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="tierExpandedPanel-scaleRangeCol">
                    <span className="tierExpandedPanel-scaleRangeLabel">Maximum cluster tier</span>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Select aria-label="Maximum cluster tier" value={maxTier} onChange={setMaxTier} size="small">
                      {ALL_TIERS.map((t) => (
                        // @ts-ignore - React 19 polymorphic type mismatch
                        <Option key={t.name} value={t.name}>
                          {t.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </>
            )}
            {isNvme && (
              <Checkbox
                checked={scaleNvme}
                onChange={(e) => setScaleNvme(e.target.checked)}
                label="Scale NVMe cluster tier when storage is running low"
              />
            )}
            {isNvme && scaleNvme && (
              <Banner variant="warning" className="tierExpandedPanel-nvmeWarning">
                Enabling NVMe storage with co-located search indexes means search indexes must be fully rebuilt during
                maintenance events that require node replacement — which can take hours or days depending on index
                size. For high intensity or mission critical production search workloads, we recommend{" "}
                <span className="tierExpandedPanel-boldUnderline">Dedicated Search Nodes</span>.
              </Banner>
            )}
          </div>

          {isNvme && (
            <div className="tierExpandedPanel-contentCell">
              <span>{tier.iops} 100% </span>
              <span className="tierExpandedPanel-bold">Random Read IOPS</span>
              <span className="tierExpandedPanel-divider">|</span>
              <span>{tier.writeIops}</span>
              <span className="tierExpandedPanel-bold"> Write IOPS</span>
            </div>
          )}

          {isNvme && (
            <div className="tierExpandedPanel-contentCell tierExpandedPanel-contentCell--stacked">
              <p>
                {tier.connections} max connections <span className="tierExpandedPanel-divider">|</span> Up to 10
                Gigabit network performance
              </p>
              <p>Local NVMe clusters have unique durability characteristics</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
