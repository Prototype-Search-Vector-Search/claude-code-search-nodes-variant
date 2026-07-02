import { useState } from "react";
import type { ReactNode } from "react";
import Icon from "@leafygreen-ui/icon";
import { Badge } from "@leafygreen-ui/badge";
import { Banner } from "@leafygreen-ui/banner";
import { Button } from "@leafygreen-ui/button";
import { IconButton } from "@leafygreen-ui/icon-button";
import { Select, Option } from "@leafygreen-ui/select";
import { Tabs, Tab } from "@leafygreen-ui/tabs";
import { Toggle } from "@leafygreen-ui/toggle";
import { Link } from "@leafygreen-ui/typography";
import { TopNav } from "./TopNav";
import { SideNavFlyout } from "./SideNavFlyout";
import "./ProjectSettingsPage.css";

export interface ProjectSettingsPageProps {
  onBackToProjectOverview: () => void;
  onOpenSearchIndexes: () => void;
  onOpenClusters: () => void;
}

interface ToggleCardProps {
  title: ReactNode;
  description?: ReactNode;
  checked: boolean;
  onChange: () => void;
  banner?: ReactNode;
}

function ToggleCard({ title, description, checked, onChange, banner }: ToggleCardProps) {
  return (
    <div className="projectSettingsPage-card">
      <div className="projectSettingsPage-row">
        <span className="projectSettingsPage-rowTitle">{title}</span>
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Toggle size="small" checked={checked} onChange={onChange} aria-label="Toggle setting" />
      </div>
      {description && <p className="projectSettingsPage-description">{description}</p>}
      {banner}
    </div>
  );
}

interface SubToggleRowProps {
  title: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
  badge?: string;
}

function SubToggleRow({ title, description, checked, onChange, badge }: SubToggleRowProps) {
  return (
    <div className="projectSettingsPage-subRow">
      <div className="projectSettingsPage-subRowText">
        <span className="projectSettingsPage-subRowTitle">
          {title}
          {badge && (
            // @ts-ignore - React 19 polymorphic type mismatch
            <Badge variant="blue">{badge}</Badge>
          )}
        </span>
        {description && <span className="projectSettingsPage-subRowDescription">{description}</span>}
      </div>
      {/* @ts-ignore - React 19 polymorphic type mismatch */}
      <Toggle size="small" checked={checked} onChange={onChange} aria-label={title} />
    </div>
  );
}

const MONITORING_TOOLS = [
  { key: "realTimePerf", title: "Real Time Performance Panel", description: "See real time metrics for your MongoDB database" },
  { key: "perfAdvisor", title: "Performance Advisor and Profiler", description: "Analyze database logs and recommend performance improvements" },
  { key: "schemaAdvisor", title: "Schema Advisor", description: "Customized recommendations to optimize your data model and enhance performance" },
  { key: "managedSlowOps", title: "Managed Slow Operations", description: "Management of the slow operation threshold for your cluster" },
  { key: "queryShapeInsights", title: "Query Shape Insights", description: "Visualize operation-level telemetry to identify performance issues and optimize queries" },
];

export function ProjectSettingsPage({
  onBackToProjectOverview,
  onOpenSearchIndexes,
  onOpenClusters,
}: ProjectSettingsPageProps) {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    collectionStats: true,
    backupCompliance: false,
    multiRegionalEndpoints: false,
    projectOverview: true,
    nativeReranking: false,
    securityQuickstart: true,
    missingIpWarning: true,
    realTimePerf: true,
    perfAdvisor: true,
    schemaAdvisor: true,
    managedSlowOps: true,
    queryShapeInsights: true,
    dataExplorer: true,
    newDataExplorer: true,
    dataExplorerAI: true,
    dataExplorerSampleValues: false,
    extendedStorage: false,
  });

  const toggle = (key: string) => setToggles((t) => ({ ...t, [key]: !t[key] }));

  return (
    <div className="projectSettingsPage">
      {/* @ts-ignore - React 19 polymorphic type mismatch */}
      <TopNav organization="Leafy Green" project="Greenery" showAtlasLockup />

      <div className="projectSettingsPage-body">
        <div className="projectSettingsPage-sideNav">
          <SideNavFlyout
            activeItem="Project Settings"
            onNavigateProjectOverview={onBackToProjectOverview}
            onOpenSearchIndexes={onOpenSearchIndexes}
            onOpenClusters={onOpenClusters}
            onOpenProjectSettings={() => {}}
          />
        </div>

        <div className="projectSettingsPage-mainArea">
          <p className="projectSettingsPage-heading">Project Settings</p>

          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Tabs className="projectSettingsPage-tabs" aria-label="Project Settings" value={0}>
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Tab name="Project Settings" index={0} />
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Tab name="Integrations" index={1} />
          </Tabs>

          <div className="projectSettingsPage-infoRow">
            <div className="projectSettingsPage-card projectSettingsPage-infoCard">
              <span className="projectSettingsPage-infoLabel">Project ID</span>
              <div className="projectSettingsPage-infoValueRow">
                <span className="projectSettingsPage-infoValue">686869f1ae8c89e29625e939</span>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <IconButton aria-label="Copy project ID">
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Icon glyph="Copy" size={14} />
                </IconButton>
              </div>
            </div>
            <div className="projectSettingsPage-card projectSettingsPage-infoCard">
              <span className="projectSettingsPage-infoLabel">Project Name</span>
              <div className="projectSettingsPage-infoValueRow">
                <span className="projectSettingsPage-infoValue">Greenery</span>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <IconButton aria-label="Edit project name">
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Icon glyph="Edit" size={14} />
                </IconButton>
              </div>
            </div>
            <div className="projectSettingsPage-card projectSettingsPage-infoCard">
              <span className="projectSettingsPage-infoLabel">Project Time Zone</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Select aria-label="Project Time Zone" size="small" placeholder="Select time zone">
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Option value="utc">UTC</Option>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Option value="est">Eastern Time (US & Canada)</Option>
              </Select>
            </div>
          </div>

          <div className="projectSettingsPage-card">
            <div className="projectSettingsPage-row">
              <span className="projectSettingsPage-rowTitle">Tags (0)</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Button variant="default" size="small">
                Add Tags
              </Button>
            </div>
            <p className="projectSettingsPage-description">
              Use tags to efficiently label and categorize your projects. You can apply a maximum of 50 tags to a
              project.{" "}
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Link href="#">Learn more</Link>
            </p>
          </div>

          <ToggleCard
            title="Collection Database Specific Statistics"
            description="Normally, this should be enabled. If you have a database with an enormous number of collections, you may want to disable dbstats collection. If you disabled dbstats, you will not see all storage information in your db storage charts."
            checked={toggles.collectionStats}
            onChange={() => toggle("collectionStats")}
          />

          <ToggleCard
            title={
              <span className="projectSettingsPage-titleWithIcon">
                Backup Compliance Policy
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Icon glyph="CheckmarkWithCircle" size={14} fill="#00a35c" />
              </span>
            }
            description="Prevent any user, regardless of role, from modifying or deleting specific cluster configurations and backups. When enabled, the Backup Compliance Policy will be applied as the minimum policy for all clusters and can only be disabled by contacting MongoDB support. Only supported for clusters M10 or higher."
            checked={toggles.backupCompliance}
            onChange={() => toggle("backupCompliance")}
          />

          <ToggleCard
            title="Multiple Regionalized Private Endpoints"
            description={
              <>
                <strong>(Applicable to projects with sharded clusters exclusively)</strong> This setting lifts the
                restriction of limiting to one Private Endpoint per region for a multi-region cluster. As a result,
                you will be able to create multiple Private Endpoints across multiple regions, and connect to
                mongoss in a region via a regionalized private endpoint connection string. Once enabled, you will
                have to configure your application to update any existing connection strings, which may cause
                downtime.
              </>
            }
            checked={toggles.multiRegionalEndpoints}
            onChange={() => toggle("multiRegionalEndpoints")}
          />

          <div className="projectSettingsPage-card">
            <div className="projectSettingsPage-row">
              <span className="projectSettingsPage-rowTitle">Specify your Maintenance Window</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Button variant="default" size="small">
                Set maintenance window
              </Button>
            </div>
            <p className="projectSettingsPage-description">
              Choose the day of the week and time when you would want Atlas to perform automated maintenance on
              your clusters. During maintenance, replica set elections will occur, but no downtime is expected.
            </p>
          </div>

          <ToggleCard
            title="Project Overview"
            description="Sets project landing page to Overview."
            checked={toggles.projectOverview}
            onChange={() => toggle("projectOverview")}
          />

          <ToggleCard
            title={
              <span className="projectSettingsPage-titleWithIcon">
                Native Reranking: $rerank in the Aggregation Pipeline
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Badge variant="blue">Preview</Badge>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Link href="#">Start Free</Link>
              </span>
            }
            description={
              <>
                Enables usage of Voyage AI reranking models within the Aggregation Pipeline to improve retrieval
                accuracy.
                <br />
                Your first 200M tokens per model are free.
              </>
            }
            checked={toggles.nativeReranking}
            onChange={() => toggle("nativeReranking")}
            banner={
              // @ts-ignore - React 19 polymorphic type mismatch
              <Banner className="projectSettingsPage-banner" variant="warning">
                Using $rerank will result in cross-region data transfer.{" "}
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Link href="#">Learn more about $rerank</Link>
              </Banner>
            }
          />

          <ToggleCard
            title="Atlas Security Quickstart"
            description="Once you have completed setting up database and network access for the first cluster in your project, this interface will be disabled. Enabling it again will allow you to revisit these configurations from a consolidated page."
            checked={toggles.securityQuickstart}
            onChange={() => toggle("securityQuickstart")}
          />

          <ToggleCard
            title="Missing IP Address Warning Banner"
            description="Displays a warning banner if the current IP address is not added to the IP Access List."
            checked={toggles.missingIpWarning}
            onChange={() => toggle("missingIpWarning")}
          />

          <div className="projectSettingsPage-card">
            <span className="projectSettingsPage-groupTitle">Database Monitoring Tools</span>
            <div className="projectSettingsPage-subRows">
              {MONITORING_TOOLS.map((tool) => (
                <SubToggleRow
                  key={tool.key}
                  title={tool.title}
                  description={tool.description}
                  checked={toggles[tool.key]}
                  onChange={() => toggle(tool.key)}
                />
              ))}
            </div>
          </div>

          <div className="projectSettingsPage-card">
            <div className="projectSettingsPage-row">
              <span className="projectSettingsPage-rowTitle">Data Explorer</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Toggle
                size="small"
                checked={toggles.dataExplorer}
                onChange={() => toggle("dataExplorer")}
                aria-label="Data Explorer"
              />
            </div>
            <p className="projectSettingsPage-description">Query your database with an easy to use interface</p>
            <div className="projectSettingsPage-subRows">
              <SubToggleRow
                title="New Data Explorer"
                badge="Preview"
                description="Enable the new Data Explorer experience. Not recommended for projects in production."
                checked={toggles.newDataExplorer}
                onChange={() => toggle("newDataExplorer")}
              />
              <SubToggleRow
                title="Enable Data Explorer Generative AI Features"
                description="Allow the use of AI features in Data Explorer which make requests to 3rd party services."
                checked={toggles.dataExplorerAI}
                onChange={() => toggle("dataExplorerAI")}
              />
              <SubToggleRow
                title="Enable Sending Sample Field Values in Data Explorer Generative AI Features"
                description="Enable sending sample field values with AI features in Data Explorer. Supplying sample field values improves the results from the AI."
                checked={toggles.dataExplorerSampleValues}
                onChange={() => toggle("dataExplorerSampleValues")}
              />
            </div>
          </div>

          <ToggleCard
            title="Enable Extended Storage Sizes"
            description={
              <>
                This setting allows M40+ clusters to be configured with storage greater than the standard maximum
                (up to 4TB for M40, 8TB for M50/M60, and 14TB for M80+). Note that initial syncs and cross-project
                snapshot restores will be slow and can reduce high availability. This should only be used as a
                measure of temporary relief, seek sharding if you need more storage.{" "}
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Link href="#">Learn more.</Link>
              </>
            }
            checked={toggles.extendedStorage}
            onChange={() => toggle("extendedStorage")}
          />

          <div className="projectSettingsPage-card">
            <div className="projectSettingsPage-row">
              <span className="projectSettingsPage-rowTitle">Delete Charts</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Button variant="danger" size="small">
                Delete Charts
              </Button>
            </div>
            <p className="projectSettingsPage-description">
              Delete the instance of Charts for this project, along with the dashboards, data sources, and
              metadata.
            </p>
          </div>

          <div className="projectSettingsPage-card">
            <div className="projectSettingsPage-row">
              <span className="projectSettingsPage-rowTitle">Delete Project</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Button variant="danger" size="small">
                Delete Project
              </Button>
            </div>
            <p className="projectSettingsPage-description">
              Users within this project will lose access to all clusters and data. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
