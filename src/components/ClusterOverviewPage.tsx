import { useState } from "react";
import Icon from "@leafygreen-ui/icon";
import { Badge } from "@leafygreen-ui/badge";
import { Button } from "@leafygreen-ui/button";
import { IconButton } from "@leafygreen-ui/icon-button";
import { Menu, MenuItem, MenuSeparator } from "@leafygreen-ui/menu";
import { Link } from "@leafygreen-ui/typography";
import { TopNav } from "./TopNav";
import { PersistentSideNav } from "./PersistentSideNav";
import { ClusterNavPanel } from "./ClusterNavPanel";
import { Sparkline } from "./Sparkline";
import { ConnectModal } from "./ConnectModal";
import "./ClusterOverviewPage.css";

export interface ClusterOverviewPageProps {
  onBackToProjectOverview: () => void;
  onBackToClusters: () => void;
  onOpenSearchIndexes: () => void;
  onOpenClusters: () => void;
  onOpenProjectSettings: () => void;
  onOpenClusterBuilder: () => void;
}

const ORANGE = "#c0341d";
const BLUE = "#016bf8";

function wave(length: number, base: number, amplitude: number, seed: number): number[] {
  return Array.from(
    { length },
    (_, i) => base + amplitude * Math.sin(i * seed) + amplitude * 0.4 * Math.sin(i * seed * 2.7),
  );
}

const OPERATIONS_POINTS = [wave(40, 8.3, 1.5, 0.4), wave(40, 1.2, 0.3, 0.6)];
const DISK_USAGE_POINTS = [wave(30, 2.7, 0.2, 0.3)];
const CONNECTIONS_POINTS = [wave(40, 69, 5, 0.5)];
const DISK_IOPS_POINTS = [wave(40, 8.4, 1.2, 0.45)];

const NODES = [
  { name: "clu...shard-00-01.3...", role: "PRIMARY" as const },
  { name: "clu...shard-00-3...", role: "STANDBY" as const },
];

export function ClusterOverviewPage({
  onBackToProjectOverview,
  onBackToClusters,
  onOpenSearchIndexes,
  onOpenClusters,
  onOpenProjectSettings,
  onOpenClusterBuilder,
}: ClusterOverviewPageProps) {
  const [showConnect, setShowConnect] = useState(false);
  return (
    <div className="clusterOverviewPage">
      <div className="clusterOverviewPage-body">
        <PersistentSideNav
          activeSection="database"
          activeItem="Clusters"
          onNavigateProjectOverview={onBackToProjectOverview}
          onOpenSearchIndexes={onOpenSearchIndexes}
          onOpenClusters={onOpenClusters}
          onOpenProjectSettings={onOpenProjectSettings}
        >
          <ClusterNavPanel activeItem="Overview" onOpenSearchIndexes={onOpenSearchIndexes} />
        </PersistentSideNav>

        <div className="clusterOverviewPage-mainColumn">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <TopNav organization="Leafy Green" project="Greenery" clusterName="Cluster0" showLogo={false} />

          <div className="clusterOverviewPage-mainArea">
            <button type="button" className="clusterOverviewPage-backLink" onClick={onBackToClusters}>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="ArrowLeft" size={12} fill="#016bf8" />
              <span>Back to Clusters</span>
            </button>

            <div className="clusterOverviewPage-headerRow">
              <div>
                <p className="clusterOverviewPage-heading">Overview</p>
                <div className="clusterOverviewPage-subtitle">
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Icon glyph="Person" size={14} fill="#5c6c75" />
                  <span>Cluster0</span>
                </div>
              </div>

              <div className="clusterOverviewPage-metaRow">
                <div className="clusterOverviewPage-metaCol">
                  <span className="clusterOverviewPage-metaLabel">VERSION</span>
                  <span className="clusterOverviewPage-metaValue">9.0</span>
                </div>
                <div className="clusterOverviewPage-metaCol">
                  <span className="clusterOverviewPage-metaLabel">REGION</span>
                  <span className="clusterOverviewPage-metaValue">AWS N. Virginia (us-east-1)</span>
                </div>
                <div className="clusterOverviewPage-metaCol">
                  <span className="clusterOverviewPage-metaLabel">CLUSTER TIER</span>
                  <span className="clusterOverviewPage-metaValue">M40 (General)</span>
                </div>
                <div className="clusterOverviewPage-metaCol">
                  <span className="clusterOverviewPage-metaLabel">ENCRYPTED STORAGE</span>
                  <span className="clusterOverviewPage-metaValue">True</span>
                </div>
              </div>
            </div>

            <div className="clusterOverviewPage-statusRow">
              <div className="clusterOverviewPage-statusLeft">
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Badge variant="darkgray">2 Nodes</Badge>
                <span className="clusterOverviewPage-statusText">Replica Set</span>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Icon glyph="Refresh" size={14} fill="#5c6c75" />
                <span className="clusterOverviewPage-statusText">
                  Backup: <span className="clusterOverviewPage-statusActive">Active</span>
                </span>
              </div>
              <div className="clusterOverviewPage-statusActions">
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Button variant="default" size="small" onClick={() => setShowConnect(true)}>
                  Connect
                </Button>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Button variant="default" size="small" onClick={onOpenClusterBuilder}>
                  Configuration
                </Button>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Menu
                  renderDarkMenu={false}
                  trigger={
                    // @ts-ignore - React 19 polymorphic type mismatch
                    <IconButton aria-label="More cluster actions" className="clusterOverviewPage-ellipsisButton">
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Icon glyph="Ellipsis" />
                    </IconButton>
                  }
                >
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuItem>Migrate Data to this Cluster</MenuItem>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuItem>Load Sample Dataset</MenuItem>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuItem>View Database Access History</MenuItem>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuItem>Download Logs</MenuItem>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuItem>Test Resilience</MenuItem>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuItem>Take Snapshot Now</MenuItem>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuSeparator />
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuItem>Pause Cluster</MenuItem>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuItem>Terminate</MenuItem>
                </Menu>
              </div>
            </div>

            <div className="clusterOverviewPage-tagsSection">
              <span className="clusterOverviewPage-tagsLabel">Tags</span>
              <div className="clusterOverviewPage-tagsBox">
                <p className="clusterOverviewPage-tagsText">
                  Use tags to efficiently label and categorize your clusters. Any tags you apply will display
                  here.
                  <br />
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Link href="#">Learn more about tagging.</Link>
                </p>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Button variant="default" size="small">
                  Add Tag
                </Button>
              </div>
            </div>

            <div className="clusterOverviewPage-content">
              <div className="clusterOverviewPage-regionCol">
                <span className="clusterOverviewPage-regionLabel">
                  Region <strong>N. Virginia (us-east-1)</strong>
                </span>
                <div className="clusterOverviewPage-nodeCard">
                  {NODES.map((node) => (
                    <div className="clusterOverviewPage-nodeRow" key={node.name}>
                      <span className="clusterOverviewPage-nodeStatusDot" />
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Link href="#" hideExternalIcon className="clusterOverviewPage-nodeName">
                        {node.name}
                      </Link>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Badge variant="lightgray">{node.role}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="clusterOverviewPage-metricsGrid">
                <div className="clusterOverviewPage-metricCard">
                  <div className="clusterOverviewPage-metricHeader">
                    <span className="clusterOverviewPage-metricTitle">Operations</span>
                    <span className="clusterOverviewPage-metricStat">R: 8.3&nbsp;&nbsp;W: 1.2</span>
                  </div>
                  <Sparkline
                    series={[
                      { color: ORANGE, points: OPERATIONS_POINTS[0] },
                      { color: BLUE, points: OPERATIONS_POINTS[1] },
                    ]}
                  />
                  <span className="clusterOverviewPage-metricRange">Last 6 Hours</span>
                </div>

                <div className="clusterOverviewPage-metricCard">
                  <div className="clusterOverviewPage-metricHeader">
                    <span className="clusterOverviewPage-metricTitle">Disk Usage</span>
                    <span className="clusterOverviewPage-metricStat">2.7 GB</span>
                  </div>
                  <Sparkline series={[{ color: BLUE, points: DISK_USAGE_POINTS[0] }]} />
                  <span className="clusterOverviewPage-metricRange">Last 30 Days</span>
                </div>

                <div className="clusterOverviewPage-metricCard">
                  <div className="clusterOverviewPage-metricHeader">
                    <span className="clusterOverviewPage-metricTitle">Connections</span>
                    <span className="clusterOverviewPage-metricStat">69</span>
                  </div>
                  <Sparkline series={[{ color: BLUE, points: CONNECTIONS_POINTS[0] }]} />
                  <span className="clusterOverviewPage-metricRange">Last 6 Hours</span>
                </div>

                <div className="clusterOverviewPage-metricCard">
                  <div className="clusterOverviewPage-metricHeader">
                    <span className="clusterOverviewPage-metricTitle">Disk IOPS</span>
                    <span className="clusterOverviewPage-metricStat">8.4</span>
                  </div>
                  <Sparkline series={[{ color: BLUE, points: DISK_IOPS_POINTS[0] }]} />
                  <span className="clusterOverviewPage-metricRange">Last 6 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConnect && <ConnectModal clusterName="Cluster0" onClose={() => setShowConnect(false)} />}
    </div>
  );
}
