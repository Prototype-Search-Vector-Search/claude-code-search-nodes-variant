import { useState } from "react";
import Icon from "@leafygreen-ui/icon";
import { palette } from "@leafygreen-ui/palette";
import { Toggle } from "@leafygreen-ui/toggle";
import { Badge } from "@leafygreen-ui/badge";
import { Button } from "@leafygreen-ui/button";
import { Link } from "@leafygreen-ui/typography";
import type { CloudProvider } from "./types";
import { ProviderLogo } from "./ProviderLogo";
import "./GlobalClusterConfigContent.css";

export interface GlobalClusterConfigContentProps {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  provider: CloudProvider;
  setProvider: (p: CloudProvider) => void;
  sharding: "atlas" | "self";
  setSharding: (s: "atlas" | "self") => void;
}

interface ShardingCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  badge: string;
  badgeVariant: "blue" | "green";
  desc: string;
}

function ShardingCard({ selected, onClick, title, badge, badgeVariant, desc }: ShardingCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shardingCard ${selected ? "shardingCard--selected" : ""}`}
    >
      <div className="shardingCard-header">
        <span className="shardingCard-title">{title}</span>
        <Badge variant={badgeVariant === "blue" ? "blue" : "green"}>{badge}</Badge>
      </div>
      <p className="shardingCard-desc">{desc}</p>
    </button>
  );
}

function ZoneSummaryCheck({ ok }: { ok: boolean }) {
  return ok ? (
    // @ts-ignore - React 19 polymorphic type mismatch
    <Icon glyph="Checkmark" fill={palette.green.dark1} size={14} className="zoneSummaryCheck" />
  ) : (
    // @ts-ignore - React 19 polymorphic type mismatch
    <Icon glyph="X" fill={palette.gray.light1} size={12} className="zoneSummaryCheck" />
  );
}

export function GlobalClusterConfigContent({
  enabled,
  setEnabled,
  provider,
  setProvider,
  sharding,
  setSharding,
}: GlobalClusterConfigContentProps) {
  const [zoneOpen, setZoneOpen] = useState(false);

  return (
    <div className="globalClusterConfig">
      {/* Enable Global Writes */}
      <div className="globalClusterConfig-header">
        <div className="globalClusterConfig-headerText">
          <p className="globalClusterConfig-title">
            Enable Global Writes <span className="globalClusterConfig-titleBadge">(M30 and up)</span>
          </p>
          <p className="globalClusterConfig-subtitle">
            Low-latency reads and writes from anywhere in the world.{" "}
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Link as="button" hideExternalIcon>
              View documentation
            </Link>
          </p>
          {enabled && (
            <ul className="globalClusterConfig-list">
              <li>Define multiple zones within a single cluster made up of one or more cloud regions.</li>
              <li>
                After deployment, we will show you how to associate data with the nearest zone using location
                attributes.
              </li>
            </ul>
          )}
        </div>
        <Toggle checked={enabled} onChange={setEnabled} aria-label="Enable Global Writes" />
      </div>

      {!enabled ? (
        <div className="globalClusterConfig-mapPlaceholder">
          <span className="globalClusterConfig-mapPlaceholderText">Approximate write latency map</span>
        </div>
      ) : (
        <>
          <div>
            <h3 className="globalClusterConfig-shardingHeading">
              Select <span className="globalClusterConfig-bold">Atlas-Managed Sharding</span> or{" "}
              <span className="globalClusterConfig-bold">Self-Managed Sharding</span>
            </h3>
            <p className="globalClusterConfig-shardingSubtext">
              Decide between simple configuration and maximum flexibility. This setting cannot be changed once the
              cluster is deployed.{" "}
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Link as="button" hideExternalIcon>
                Learn more.
              </Link>
            </p>
          </div>

          <div className="globalClusterConfig-shardingCards">
            <ShardingCard
              selected={sharding === "atlas"}
              onClick={() => setSharding("atlas")}
              title="Atlas-Managed Sharding"
              badge="RECOMMENDED"
              badgeVariant="blue"
              desc="Seamlessly deployed, fully-managed Global Cluster. Designed for applications built for a global audience."
            />
            <ShardingCard
              selected={sharding === "self"}
              onClick={() => setSharding("self")}
              title="Self-Managed Sharding"
              badge="ADVANCED"
              badgeVariant="green"
              desc="Offer maximum configuration flexibility, including custom sharding strategies. Compatible with existing self-managed MongoDB deployments."
            />
          </div>

          <div className="globalClusterConfig-divider" />
          <div className="globalClusterConfig-providerRow">
            {(["aws", "gcp", "azure"] as CloudProvider[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setProvider(p)}
                className={`globalClusterConfig-providerPill ${provider === p ? "globalClusterConfig-providerPill--selected" : ""}`}
              >
                <ProviderLogo provider={p} size="lg" />
              </button>
            ))}
          </div>

          <div className="globalClusterConfig-templatePlaceholder">
            <span className="globalClusterConfig-templatePlaceholderText">Zone templates</span>
          </div>

          <div className="globalClusterConfig-zoneSummary">
            <div className="globalClusterConfig-zoneSummaryHeader">
              <button type="button" onClick={() => setZoneOpen((v) => !v)} className="globalClusterConfig-zoneSummaryToggle">
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Icon glyph={zoneOpen ? "ChevronUp" : "ChevronDown"} fill={palette.gray.dark1} />
                <span className="globalClusterConfig-zoneSummaryTitle">Zone configuration summary</span>
              </button>
              <div className="globalClusterConfig-zoneSummaryActions">
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Button size="xsmall" disabled className="globalClusterConfig-zoneSummaryButton">
                  Configure local reads in all zones
                </Button>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Icon glyph="InfoWithCircle" fill={palette.gray.base} size={12} />
              </div>
            </div>
            {zoneOpen && (
              <div className="globalClusterConfig-zoneSummaryBody">
                <div className="globalClusterConfig-zoneSummaryZone">
                  <span className="globalClusterConfig-zoneDot" />
                  <div>
                    <p className="globalClusterConfig-zoneName">Zone 1</p>
                    <p className="globalClusterConfig-zoneShards">1 shard</p>
                  </div>
                </div>
                <p className="globalClusterConfig-zoneRegion">N. Virginia (us-east-1)</p>
                <div className="globalClusterConfig-zoneChecks">
                  <div className="globalClusterConfig-zoneCheckRow">
                    <ZoneSummaryCheck ok />
                    <span className="globalClusterConfig-zoneCheckText globalClusterConfig-zoneCheckText--ok">
                      Low latency reads and writes in <span className="globalClusterConfig-bold">North America</span>
                    </span>
                  </div>
                  <div className="globalClusterConfig-zoneCheckRow">
                    <ZoneSummaryCheck ok />
                    <span className="globalClusterConfig-zoneCheckText globalClusterConfig-zoneCheckText--ok">
                      Available during partial region outage
                    </span>
                  </div>
                  <div className="globalClusterConfig-zoneCheckRow">
                    <ZoneSummaryCheck ok={false} />
                    <span className="globalClusterConfig-zoneCheckText globalClusterConfig-zoneCheckText--muted">
                      Not available during full region outage
                    </span>
                  </div>
                  <div className="globalClusterConfig-zoneCheckRow">
                    <ZoneSummaryCheck ok={false} />
                    <span className="globalClusterConfig-zoneCheckText globalClusterConfig-zoneCheckText--muted">
                      Not available during a cloud provider outage
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
