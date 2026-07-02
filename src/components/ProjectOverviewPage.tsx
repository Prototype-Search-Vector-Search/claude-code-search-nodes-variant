import { useState } from "react";
import Icon from "@leafygreen-ui/icon";
import { Badge } from "@leafygreen-ui/badge";
import { Button } from "@leafygreen-ui/button";
import { IconButton } from "@leafygreen-ui/icon-button";
import { Card } from "@leafygreen-ui/card";
import { Link } from "@leafygreen-ui/typography";
import { Menu, MenuItem } from "@leafygreen-ui/menu";
import { Tabs, Tab } from "@leafygreen-ui/tabs";
import { SegmentedControl, SegmentedControlOption } from "@leafygreen-ui/segmented-control";
import { TopNav } from "./TopNav";
import { SideNavFlyout } from "./SideNavFlyout";
import { PreferencesModal } from "./PreferencesModal";
import { ConnectModal } from "./ConnectModal";
import "./ProjectOverviewPage.css";

export interface ProjectOverviewPageProps {
  onOpenClusterBuilder: (mode: "create" | "edit") => void;
  onOpenMetrics: () => void;
  onOpenSearchIndexes: () => void;
  onOpenClusters: () => void;
  onOpenProjectSettings: () => void;
}

const CLUSTER_TABS = ["Cluster0"];

const DEV_TILES = [
  { icon: "MagnifyingGlass" as const, title: "Search" },
  { icon: "Diagram" as const, title: "Vector Search" },
  { icon: "Code" as const, title: "Query & Aggregation" },
  { icon: "Charts" as const, title: "Data Visualization" },
];

const TOOLBAR_ROWS = [
  { label: "Performance", count: 1 },
  { label: "Cost", count: 0 },
  { label: "Resilience", count: 0 },
];

export function ProjectOverviewPage({
  onOpenClusterBuilder,
  onOpenSearchIndexes,
  onOpenClusters,
  onOpenProjectSettings,
  onOpenMetrics,
}: ProjectOverviewPageProps) {
  const [activeClusterTab, setActiveClusterTab] = useState(0);
  const [toolbarTab, setToolbarTab] = useState<"resources" | "tips">("tips");
  const [showPreferences, setShowPreferences] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [openToolbarRows, setOpenToolbarRows] = useState<Record<string, boolean>>({
    Performance: true,
    Cost: true,
    Resilience: true,
  });

  const toggleToolbarRow = (label: string) =>
    setOpenToolbarRows((rows) => ({ ...rows, [label]: !rows[label] }));

  return (
    <div className="projectOverviewPage">
      <TopNav
        organization="Leafy Green"
        project="Greenery"
        showAtlasLockup
      />

      <div className="projectOverviewPage-body">
        <div className="projectOverviewPage-sideNav">
          <SideNavFlyout
            activeItem="Project Overview"
            onNavigateProjectOverview={() => {}}
            onOpenSearchIndexes={onOpenSearchIndexes}
            onOpenClusters={onOpenClusters}
            onOpenProjectSettings={onOpenProjectSettings}
          />
        </div>

        <div className="projectOverviewPage-mainArea">
          <p className="projectOverviewPage-heading">Greenery Overview</p>

          <div className="projectOverviewPage-content">
          <div className="projectOverviewPage-main">
            {/* Clusters card */}
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Card className="projectOverviewPage-card projectOverviewPage-clustersCard">
              <div className="projectOverviewPage-cardHeader">
                <span className="projectOverviewPage-cardTitle">Clusters</span>
                <div className="projectOverviewPage-cardHeaderActions">
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Button variant="default" size="small" onClick={() => onOpenClusterBuilder("create")}>
                    Create cluster
                  </Button>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Menu
                    darkMode
                    trigger={
                      // @ts-ignore - React 19 polymorphic type mismatch
                      <IconButton aria-label="More cluster actions">
                        {/* @ts-ignore - React 19 polymorphic type mismatch */}
                        <Icon glyph="Ellipsis" />
                      </IconButton>
                    }
                  >
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <MenuItem glyph={<Icon glyph="ArrowRight" />} onClick={onOpenClusters}>
                      View all clusters
                    </MenuItem>
                  </Menu>
                </div>
              </div>

              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Tabs
                className="projectOverviewPage-clusterTabs"
                size="small"
                aria-label="Clusters"
                value={activeClusterTab}
                onValueChange={setActiveClusterTab}
              >
                {CLUSTER_TABS.map((tab, i) => (
                  // @ts-ignore - React 19 polymorphic type mismatch
                  <Tab key={tab} name={tab} index={i} />
                ))}
              </Tabs>

              <div className="projectOverviewPage-clusterActionsRow">
                <div className="projectOverviewPage-clusterActionsLeft">
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Button variant="primaryOutline" size="small" onClick={() => setShowConnect(true)}>
                    Connect
                  </Button>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Button
                    variant="default"
                    size="small"
                    onClick={activeClusterTab === 0 ? () => onOpenClusterBuilder("edit") : undefined}
                  >
                    Edit Configuration
                  </Button>
                </div>
                <span className="projectOverviewPage-dataSize">Disk Usage: 8.69 GB</span>
              </div>

              <div className="projectOverviewPage-productTiles">
                <button type="button" className="projectOverviewPage-productTile">
                  <span className="projectOverviewPage-productTileIcon">
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Icon glyph="Table" size={20} fill="#00a35c" />
                  </span>
                  <span className="projectOverviewPage-productTileLabel">Browse collections</span>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Icon glyph="ArrowRight" size={12} fill="#5c6c75" />
                </button>
                <button type="button" className="projectOverviewPage-productTile" onClick={onOpenMetrics}>
                  <span className="projectOverviewPage-productTileIcon">
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Icon glyph="Charts" size={20} fill="#00a35c" />
                  </span>
                  <span className="projectOverviewPage-productTileLabel">View monitoring</span>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Icon glyph="ArrowRight" size={12} fill="#5c6c75" />
                </button>
              </div>

              <button type="button" className="projectOverviewPage-addTagButton">
                + Add Tag
              </button>
            </Card>

            {/* Application Development card */}
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Card className="projectOverviewPage-card">
              <div className="projectOverviewPage-cardHeader">
                <span className="projectOverviewPage-cardTitle">Application Development</span>
                <div className="projectOverviewPage-cardHeaderActions">
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Button variant="default" size="small" onClick={() => setShowConnect(true)}>
                    Connect new
                  </Button>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Menu
                    darkMode
                    trigger={
                      // @ts-ignore - React 19 polymorphic type mismatch
                      <IconButton aria-label="More application development actions">
                        {/* @ts-ignore - React 19 polymorphic type mismatch */}
                        <Icon glyph="Ellipsis" />
                      </IconButton>
                    }
                  >
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <MenuItem glyph={<Icon glyph="InfoWithCircle" />}>Learn more</MenuItem>
                  </Menu>
                </div>
              </div>

              <div className="projectOverviewPage-driverCard">
                <div className="projectOverviewPage-driverVersionRow">
                  <span className="projectOverviewPage-driverVersion">nodejs | v7.1.1</span>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Icon glyph="InfoWithCircle" size={16} fill="#889397" />
                </div>
                <span className="projectOverviewPage-driverCluster">Cluster0</span>
                <button type="button" className="projectOverviewPage-driverUpdateButton">
                  UPDATE TO 7.3.0
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Icon glyph="OpenNewTab" size={16} />
                </button>
              </div>

              <span className="projectOverviewPage-featuresLabel">
                Features available on your latest driver versions
              </span>

              <div className="projectOverviewPage-tileGrid">
                {DEV_TILES.map((tile) => {
                  const opensSearchIndexes = tile.title === "Search" || tile.title === "Vector Search";
                  return (
                    <button
                      type="button"
                      key={tile.title}
                      className="projectOverviewPage-tile"
                      onClick={opensSearchIndexes ? onOpenSearchIndexes : undefined}
                    >
                      <span className="projectOverviewPage-tileIcon">
                        {/* @ts-ignore - React 19 polymorphic type mismatch */}
                        <Icon glyph={tile.icon} size={20} fill="#00a35c" />
                      </span>
                      <span className="projectOverviewPage-tileTitle">{tile.title}</span>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Icon glyph="ArrowRight" size={12} fill="#889397" />
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Toolbar column */}
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Card className="projectOverviewPage-toolbar">
            <div className="projectOverviewPage-cardHeader">
              <span className="projectOverviewPage-cardTitle">Toolbar</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <IconButton aria-label="More toolbar actions" onClick={() => setShowPreferences(true)}>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Icon glyph="Ellipsis" />
              </IconButton>
            </div>

            <div className="projectOverviewPage-supportPlan">
              <p className="projectOverviewPage-supportPlanText">
                Support Plan: <span className="projectOverviewPage-supportPlanValue">Basic Plan</span>
              </p>
              <div className="projectOverviewPage-supportPlanActions">
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Button
                  className="projectOverviewPage-supportButton"
                  variant="primaryOutline"
                  size="xsmall"
                  leftGlyph={<Icon glyph="Support" />}
                >
                  Chat with Support
                </Button>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Button
                  className="projectOverviewPage-supportButton"
                  variant="default"
                  size="xsmall"
                  leftGlyph={<Icon glyph="OpenNewTab" />}
                >
                  View Support Options
                </Button>
              </div>
            </div>

            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <SegmentedControl
              className="projectOverviewPage-toolbarSegmentedControl"
              size="small"
              name="toolbar-view"
              value={toolbarTab}
              onChange={(value) => setToolbarTab(value as "resources" | "tips")}
            >
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <SegmentedControlOption value="resources">Resources</SegmentedControlOption>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <SegmentedControlOption value="tips">Tips (1)</SegmentedControlOption>
            </SegmentedControl>

            {toolbarTab === "tips" ? (
              <div className="projectOverviewPage-toolbarRows">
                {TOOLBAR_ROWS.map((row) => (
                  <button
                    type="button"
                    key={row.label}
                    className="projectOverviewPage-toolbarRow"
                    onClick={() => toggleToolbarRow(row.label)}
                  >
                    <span className="projectOverviewPage-toolbarRowLeft">
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Icon glyph="Wrench" size={14} fill="#5c6c75" />
                      {row.label} ({row.count})
                    </span>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Icon glyph={openToolbarRows[row.label] ? "CaretUp" : "CaretDown"} size={12} fill="#889397" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="projectOverviewPage-resources">
                <span className="projectOverviewPage-resourcesTitle">Featured Resources</span>

                <div className="projectOverviewPage-resourceItem">
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Badge variant="lightgray">NODEJS</Badge>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Link href="#" className="projectOverviewPage-resourceLink">
                    Aggregations in Node.js
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Icon glyph="OpenNewTab" size={12} />
                  </Link>
                </div>

                <div className="projectOverviewPage-resourceItem">
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Badge variant="lightgray">DEDICATED TIER</Badge>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Link href="#" className="projectOverviewPage-resourceLink" hideExternalIcon>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Icon glyph="Read" size={14} />
                    View Dedicated Features
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Icon glyph="ArrowRight" size={12} />
                  </Link>
                </div>

                <div className="projectOverviewPage-resourcesDivider" />

                <div className="projectOverviewPage-newSectionHeader">
                  <span className="projectOverviewPage-newSectionTitle">New On Atlas</span>
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Icon glyph="ArrowRight" size={14} fill="#889397" />
                </div>
                <p className="projectOverviewPage-newSectionText">
                  Learn about the latest feature enhancements on Atlas.
                </p>
              </div>
            )}
          </Card>
          </div>
        </div>
      </div>

      {showPreferences && (
        <PreferencesModal onCancel={() => setShowPreferences(false)} onSave={() => setShowPreferences(false)} />
      )}
      {showConnect && <ConnectModal clusterName="Cluster0" onClose={() => setShowConnect(false)} />}
    </div>
  );
}
