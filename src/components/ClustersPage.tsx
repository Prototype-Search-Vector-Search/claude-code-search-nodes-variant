import { useState } from "react";
import Icon from "@leafygreen-ui/icon";
import { Badge } from "@leafygreen-ui/badge";
import { Button } from "@leafygreen-ui/button";
import { IconButton } from "@leafygreen-ui/icon-button";
import { Card } from "@leafygreen-ui/card";
import { Menu, MenuItem, MenuSeparator } from "@leafygreen-ui/menu";
import { SearchInput } from "@leafygreen-ui/search-input";
import { TopNav } from "./TopNav";
import { SideNavFlyout } from "./SideNavFlyout";
import { Sparkline } from "./Sparkline";
import { ConnectModal } from "./ConnectModal";
import "./ClustersPage.css";

export interface ClustersPageProps {
  onBackToProjectOverview: () => void;
  onOpenSearchIndexes: () => void;
  onOpenClusterBuilder: (mode: "create" | "edit") => void;
  onOpenMetrics: () => void;
  onOpenClusterOverview: () => void;
  onOpenProjectSettings: () => void;
}

const ORANGE = "#c0341d";
const BLUE = "#016bf8";

function wave(length: number, base: number, amplitude: number, seed: number): number[] {
  return Array.from(
    { length },
    (_, i) => base + amplitude * Math.sin(i * seed) + amplitude * 0.4 * Math.sin(i * seed * 2.7),
  );
}

const READ_WRITE_POINTS = [wave(40, 1.3, 0.3, 0.4), wave(40, 0.2, 0.08, 0.6)];
const CONNECTIONS_POINTS = [wave(40, 30, 3, 0.5)];
const NETWORK_POINTS = [wave(40, 4.9, 1.5, 0.45), wave(40, 16.5, 3, 0.55)];
const DATA_SIZE_POINTS = [wave(30, 8, 1, 0.3).map((v, i) => v + i * 0.15)];

export function ClustersPage({
  onBackToProjectOverview,
  onOpenSearchIndexes,
  onOpenClusterBuilder,
  onOpenClusterOverview,
  onOpenProjectSettings,
  onOpenMetrics,
}: ClustersPageProps) {
  const [showConnect, setShowConnect] = useState(false);

  return (
    <div className="clustersPage">
      {/* @ts-ignore - React 19 polymorphic type mismatch */}
      <TopNav organization="Leafy Green" project="Greenery" showAtlasLockup />

      <div className="clustersPage-body">
        <div className="clustersPage-sideNav">
          <SideNavFlyout
            activeItem="Clusters"
            onNavigateProjectOverview={onBackToProjectOverview}
            onOpenSearchIndexes={onOpenSearchIndexes}
            onOpenClusters={() => {}}
            onOpenProjectSettings={onOpenProjectSettings}
          />
        </div>

        <div className="clustersPage-mainArea">
          <p className="clustersPage-heading">Clusters</p>

          <div className="clustersPage-toolbar">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <SearchInput
              aria-label="Find a database deployment"
              placeholder="Find a database deployment..."
              className="clustersPage-search"
            />
            <div className="clustersPage-toolbarActions">
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Menu
                renderDarkMenu={false}
                trigger={
                  // @ts-ignore - React 19 polymorphic type mismatch
                  <Button
                    variant="default"
                    size="small"
                    leftGlyph={<Icon glyph="Database" />}
                    rightGlyph={<Icon glyph="CaretDown" />}
                  >
                    Edit Config
                  </Button>
                }
              >
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <MenuItem onClick={() => onOpenClusterBuilder("edit")}>
                  <span className="clustersPage-editConfigItem">
                    Cluster0
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Badge variant="blue">Dedicated</Badge>
                  </span>
                </MenuItem>
              </Menu>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Button variant="primary" size="small" leftGlyph={<Icon glyph="Plus" />} onClick={() => onOpenClusterBuilder("create")}>
                Create
              </Button>
            </div>
          </div>

          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Card className="clustersPage-card">
            <div className="clustersPage-cardHeader">
              <div className="clustersPage-cardHeaderLeft">
                <span className="clustersPage-statusDot" />
                <button type="button" className="clustersPage-clusterName" onClick={onOpenClusterOverview}>
                  Cluster0
                </button>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Button variant="default" size="small" onClick={() => setShowConnect(true)}>
                  Connect
                </Button>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Button variant="default" size="small" onClick={onOpenMetrics}>
                  View Monitoring
                </Button>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Button variant="default" size="small">
                  Browse Collections
                </Button>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Menu
                  renderDarkMenu={false}
                  trigger={
                    // @ts-ignore - React 19 polymorphic type mismatch
                    <IconButton aria-label="More cluster actions" className="clustersPage-ellipsisButton">
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Icon glyph="Ellipsis" />
                    </IconButton>
                  }
                >
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuItem onClick={() => onOpenClusterBuilder("edit")}>Edit Configuration</MenuItem>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuItem>Command Line Tools</MenuItem>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuSeparator />
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuItem>Migrate Data to this Cluster</MenuItem>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuItem>Load Sample Dataset</MenuItem>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuItem>View Database Access History</MenuItem>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <MenuItem>Pin Feature Compatibility Version</MenuItem>
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
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Badge variant="blue">Dedicated</Badge>
            </div>

            <div className="clustersPage-metricsRow">
              <div className="clustersPage-metricCol">
                <div className="clustersPage-metricLabels">
                  <div className="clustersPage-metricLabelLine">
                    <span className="clustersPage-dot" style={{ background: ORANGE }} />
                    <span>R 1.3</span>
                  </div>
                  <div className="clustersPage-metricLabelLine">
                    <span className="clustersPage-dot" style={{ background: BLUE }} />
                    <span>W 0.2</span>
                  </div>
                </div>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Icon className="clustersPage-infoIcon" glyph="InfoWithCircle" size={12} fill="#889397" />
                <div className="clustersPage-metricRange">Last 6 hours</div>
                <div className="clustersPage-metricAxis">1.5/s</div>
                <Sparkline
                  series={[
                    { color: ORANGE, points: READ_WRITE_POINTS[0] },
                    { color: BLUE, points: READ_WRITE_POINTS[1] },
                  ]}
                />
              </div>

              <div className="clustersPage-metricCol">
                <div className="clustersPage-metricLabels">
                  <div className="clustersPage-metricLabelLine">
                    <span>Connections</span>
                    <strong>30.0</strong>
                  </div>
                </div>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Icon className="clustersPage-infoIcon" glyph="InfoWithCircle" size={12} fill="#889397" />
                <div className="clustersPage-metricRange">Last 6 hours</div>
                <div className="clustersPage-metricAxis">30.0</div>
                <Sparkline series={[{ color: BLUE, points: CONNECTIONS_POINTS[0] }]} />
              </div>

              <div className="clustersPage-metricCol">
                <div className="clustersPage-metricLabels">
                  <div className="clustersPage-metricLabelLine">
                    <span className="clustersPage-dot" style={{ background: ORANGE }} />
                    <span>In 4.9 KB/s</span>
                  </div>
                  <div className="clustersPage-metricLabelLine">
                    <span className="clustersPage-dot" style={{ background: BLUE }} />
                    <span>Out 16.5 KB/s</span>
                  </div>
                </div>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Icon className="clustersPage-infoIcon" glyph="InfoWithCircle" size={12} fill="#889397" />
                <div className="clustersPage-metricRange">Last 6 hours</div>
                <div className="clustersPage-metricAxis">23.6 KB/s</div>
                <Sparkline
                  series={[
                    { color: ORANGE, points: NETWORK_POINTS[0] },
                    { color: BLUE, points: NETWORK_POINTS[1] },
                  ]}
                />
              </div>

              <div className="clustersPage-metricCol">
                <div className="clustersPage-metricLabels">
                  <div className="clustersPage-metricLabelLine">
                    <span>Data Size</span>
                    <strong>5.8 GB / 128 TB (0.004%)</strong>
                  </div>
                </div>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Icon className="clustersPage-infoIcon" glyph="InfoWithCircle" size={12} fill="#889397" />
                <div className="clustersPage-metricRange">Last 23 days</div>
                <div className="clustersPage-metricAxis">10.0 GB</div>
                <Sparkline series={[{ color: BLUE, points: DATA_SIZE_POINTS[0] }]} />
              </div>
            </div>

            <div className="clustersPage-metaRow">
              <div className="clustersPage-metaCol">
                <span className="clustersPage-metaLabel">VERSION</span>
                <span className="clustersPage-metaValue">9.0.0</span>
              </div>
              <div className="clustersPage-metaCol">
                <span className="clustersPage-metaLabel">REGION</span>
                <span className="clustersPage-metaValue">AWS / N. Virginia (us-east-1)</span>
              </div>
              <div className="clustersPage-metaCol">
                <span className="clustersPage-metaLabel">CLUSTER TIER</span>
                <span className="clustersPage-metaValue">M40 (General)</span>
              </div>
              <div className="clustersPage-metaCol">
                <span className="clustersPage-metaLabel">TYPE</span>
                <span className="clustersPage-metaValue">Replica Set - 2 Nodes</span>
              </div>
              <div className="clustersPage-metaCol">
                <span className="clustersPage-metaLabel">BACKUPS</span>
                <span className="clustersPage-metaValue">Active</span>
              </div>
            </div>

            <button type="button" className="clustersPage-addTagButton">
              + Add tag
            </button>
          </Card>
        </div>
      </div>

      {showConnect && <ConnectModal clusterName="Cluster0" onClose={() => setShowConnect(false)} />}
    </div>
  );
}
