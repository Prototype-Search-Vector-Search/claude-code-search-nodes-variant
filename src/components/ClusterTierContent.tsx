import { useState } from "react";
import { Tabs, Tab } from "@leafygreen-ui/tabs";
import { RadioBoxGroup, RadioBox } from "@leafygreen-ui/radio-box-group";
import { Body } from "@leafygreen-ui/typography";
import type { TierClass, SearchTierClass } from "./tierData";
import { DEV_TIERS, DEDICATED_TIERS } from "./tierData";
import { TierTableHeader } from "./TierTableHeader";
import { TierRow } from "./TierRow";
import { TierExpandedPanel } from "./TierExpandedPanel";
import { SearchTierActiveContent } from "./SearchTierActiveContent";
import { SearchTierEmptyState } from "./SearchTierEmptyState";
import "./ClusterTierContent.css";

export interface ClusterTierContentProps {
  selectedTier: string;
  setSelectedTier: (t: string) => void;
  onAddSearchNodes: () => void;
  searchEnabled: boolean;
  tierTab: "base" | "search";
  setTierTab: (t: "base" | "search") => void;
  searchClass: SearchTierClass;
  setSearchClass: (c: SearchTierClass) => void;
  selectedSearchTier: string;
  setSelectedSearchTier: (t: string) => void;
}

const TIER_CLASSES: TierClass[] = ["Low-CPU", "General", "Local NVMe SSD"];

const TAB_NAMES: Record<"base" | "search", string> = {
  base: "Base Tier",
  search: "Search Tier",
};

export function ClusterTierContent({
  selectedTier,
  setSelectedTier,
  onAddSearchNodes,
  searchEnabled,
  tierTab,
  setTierTab,
  searchClass,
  setSearchClass,
  selectedSearchTier,
  setSelectedSearchTier,
}: ClusterTierContentProps) {
  const [tierClass, setTierClass] = useState<TierClass>("General");
  const [autoScale, setAutoScale] = useState(false);
  const [scaleDown, setScaleDown] = useState(false);
  const [scaleNvme, setScaleNvme] = useState(false);
  const [minTier, setMinTier] = useState("M10");
  const [maxTier, setMaxTier] = useState("M80");

  return (
    <div className="clusterTierContent">
      {/* @ts-ignore - React 19 polymorphic type mismatch */}
      <Tabs
        value={TAB_NAMES[tierTab]}
        onValueChange={(v) => setTierTab(v === TAB_NAMES.search ? "search" : "base")}
        className="clusterTierContent-tabs"
        aria-label="Cluster Tier"
      >
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Tab name={TAB_NAMES.base}>
          <div className="clusterTierContent-panel">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Body>
              Hourly price is for a MongoDB replica set with{" "}
              <span className="clusterTierContent-bold">3 data bearing servers.</span>
            </Body>

            {/* Dev/small tiers */}
            <div>
              <p className="clusterTierContent-sectionLabel">
                <span className="clusterTierContent-bold">Dedicated</span> Clusters for development environments and
                low-traffic applications
              </p>
              <div className="clusterTierContent-tableWrap">
                <TierTableHeader />
                {DEV_TIERS.map((t) => (
                  <TierRow key={t.name} tier={t} selected={selectedTier === t.name} onClick={() => setSelectedTier(t.name)} />
                ))}
              </div>
            </div>

            {/* Dedicated high-traffic tiers */}
            <div>
              <p className="clusterTierContent-sectionLabel clusterTierContent-sectionLabel--tight">
                <span className="clusterTierContent-bold">Dedicated</span> Clusters for high-traffic applications and
                large datasets
              </p>
              <p className="clusterTierContent-sectionSubLabel">
                Additional hardware configurations available for specialized workloads
              </p>

              <RadioBoxGroup
                className="clusterTierContent-classRow"
                size="compact"
                value={tierClass}
                onChange={(e) => setTierClass(e.target.value as TierClass)}
              >
                {TIER_CLASSES.map((cls) => (
                  <RadioBox key={cls} value={cls}>
                    {cls}
                  </RadioBox>
                ))}
              </RadioBoxGroup>

              <div className="clusterTierContent-tableWrap">
                <TierTableHeader />
                {DEDICATED_TIERS.map((t) => {
                  if (selectedTier === t.name) {
                    return (
                      <TierExpandedPanel
                        key={t.name}
                        tier={t}
                        tierClass={tierClass}
                        autoScale={autoScale}
                        setAutoScale={setAutoScale}
                        scaleDown={scaleDown}
                        setScaleDown={setScaleDown}
                        scaleNvme={scaleNvme}
                        setScaleNvme={setScaleNvme}
                        minTier={minTier}
                        setMinTier={setMinTier}
                        maxTier={maxTier}
                        setMaxTier={setMaxTier}
                      />
                    );
                  }
                  return <TierRow key={t.name} tier={t} selected={false} onClick={() => setSelectedTier(t.name)} />;
                })}
              </div>
            </div>
          </div>
        </Tab>
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Tab name={TAB_NAMES.search}>
          {searchEnabled ? (
            <SearchTierActiveContent
              searchClass={searchClass}
              setSearchClass={setSearchClass}
              selectedSearchTier={selectedSearchTier}
              setSelectedSearchTier={setSelectedSearchTier}
            />
          ) : (
            <SearchTierEmptyState onAddSearchNodes={onAddSearchNodes} />
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
