import { useState } from "react";
import { Card } from "@leafygreen-ui/card";
import { Tabs, Tab } from "@leafygreen-ui/tabs";
import { Select, Option } from "@leafygreen-ui/select";
import { Link } from "@leafygreen-ui/typography";
import Icon from "@leafygreen-ui/icon";
import { TopNav } from "./TopNav";
import { PersistentSideNav } from "./PersistentSideNav";
import { SearchNavPanel } from "./SearchNavPanel";
import { MiniBarChart, LegendSwatch, type BarDatum } from "./MiniBarChart";
import "./AutoEmbeddingUsagePage.css";

export interface AutoEmbeddingUsagePageProps {
  onBackToProjectOverview: () => void;
  onOpenSearchIndexes: () => void;
  onOpenClusters: () => void;
  onOpenProjectSettings: () => void;
  onOpenIndexOverview: () => void;
  onOpenStatusDetails: () => void;
  onOpenSearchTester: () => void;
  onOpenRerankingUsage: () => void;
  onOpenAutoEmbeddingRateLimits: () => void;
  onOpenRerankingRateLimits: () => void;
}

const FREE_COLOR = "#00a35c";
const PAID_COLOR = "#016bf8";
const REQUEST_COLOR = "#0d7169";

function tokenUsageBars(length: number, freeCount: number): BarDatum[] {
  return Array.from({ length }, (_, i) => ({
    value: i === length - 1 ? 26 : 8 + ((i * 7) % 8),
    color: i < freeCount ? FREE_COLOR : PAID_COLOR,
  }));
}

function requestBars(length: number): BarDatum[] {
  return Array.from({ length }, (_, i) => ({
    value: i === length - 1 ? 25 : 8 + ((i * 5) % 10),
    color: REQUEST_COLOR,
  }));
}

const TOTAL_TOKEN_USAGE = tokenUsageBars(30, 4);

const VOYAGE_4 = {
  name: "voyage-4",
  queryTokens: "516,910.00",
  queryTokenBars: tokenUsageBars(30, 3),
  queryRequests: "30",
  queryRequestBars: requestBars(30),
  indexTokens: "714,919.00",
  indexTokenBars: tokenUsageBars(30, 3),
  indexRequests: "30",
  indexRequestBars: requestBars(30),
};

const VOYAGE_3_LITE = {
  name: "voyage-3-lite",
  indexTokens: "623,753.00",
  indexTokenBars: tokenUsageBars(30, 3),
  queryTokens: "823,461.00",
  queryTokenBars: tokenUsageBars(30, 3),
};

interface FreeUsageModel {
  name: string;
  availableLabel: string;
  totalLabel: string;
  usedPercent: number;
  usedLabel: string;
  depleted?: boolean;
}

const FREE_USAGE_MODELS: FreeUsageModel[] = [
  {
    name: "voyage-4",
    availableLabel: "40",
    totalLabel: "100",
    usedPercent: 60,
    usedLabel: "Your organization has used 60 free tokens (60%)",
  },
  {
    name: "voyage-4-large",
    availableLabel: "100",
    totalLabel: "100",
    usedPercent: 0,
    usedLabel: "Your organization has used 0 free tokens (0%)",
  },
  {
    name: "voyage-4-lite",
    availableLabel: "0",
    totalLabel: "100",
    usedPercent: 100,
    usedLabel: "Your organization has used all 100 free tokens for this model.",
    depleted: true,
  },
  {
    name: "voyage-code-3",
    availableLabel: "0",
    totalLabel: "100",
    usedPercent: 100,
    usedLabel: "Your organization has used all 100 free tokens for this model.",
    depleted: true,
  },
];

export function AutoEmbeddingUsagePage({
  onBackToProjectOverview,
  onOpenSearchIndexes,
  onOpenClusters,
  onOpenProjectSettings,
  onOpenIndexOverview,
  onOpenStatusDetails,
  onOpenSearchTester,
  onOpenRerankingUsage,
  onOpenAutoEmbeddingRateLimits,
  onOpenRerankingRateLimits,
}: AutoEmbeddingUsagePageProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [usagePeriod, setUsagePeriod] = useState("Sep 1, 2025 - Oct 1, 2025 (UTC)");
  const [modelFilter, setModelFilter] = useState("All models with usage");

  return (
    <div className="autoEmbeddingUsagePage">
      <div className="autoEmbeddingUsagePage-body">
        <PersistentSideNav
          activeSection="database"
          activeItem="Search & Vector Search"
          onNavigateProjectOverview={onBackToProjectOverview}
          onOpenSearchIndexes={onOpenSearchIndexes}
          onOpenClusters={onOpenClusters}
          onOpenProjectSettings={onOpenProjectSettings}
        >
          <SearchNavPanel
            activeItem="Auto-Embedding Usage"
            onSelectSearchIndexes={onOpenSearchIndexes}
            onSelectIndexOverview={onOpenIndexOverview}
            onSelectStatusDetails={onOpenStatusDetails}
            onSelectSearchTester={onOpenSearchTester}
            onSelectAutoEmbeddingUsage={() => {}}
            onSelectAutoEmbeddingRateLimits={onOpenAutoEmbeddingRateLimits}
            onSelectRerankingUsage={onOpenRerankingUsage}
            onSelectRerankingRateLimits={onOpenRerankingRateLimits}
          />
        </PersistentSideNav>

        <div className="autoEmbeddingUsagePage-mainColumn">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <TopNav organization="Leafy Green" project="Greenery" clusterName="Cluster0" showLogo={false} />

          <div className="autoEmbeddingUsagePage-mainArea">
            <p className="autoEmbeddingUsagePage-heading">Automated Embedding Usage</p>

            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Tabs
              className="autoEmbeddingUsagePage-tabs"
              aria-label="Usage"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Tab name="Usage Activity" index={0} />
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Tab name="Free Usage" index={1} />
            </Tabs>

            {activeTab === 0 ? (
              <>
                <p className="autoEmbeddingUsagePage-subheading">Token Usage for Cluster0</p>

                <p className="autoEmbeddingUsagePage-description">
                  View aggregated token usage for Automated Embedding service over the selected time period. Visit
                  the{" "}
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Link href="#">cost explorer</Link> and filter by model to understand how usage translates to
                  cost.
                </p>

                <div className="autoEmbeddingUsagePage-filters">
                  <div className="autoEmbeddingUsagePage-filter">
                    <span className="autoEmbeddingUsagePage-filterLabel">Usage Period</span>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Select aria-label="Usage Period" value={usagePeriod} onChange={setUsagePeriod} size="small">
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="Sep 1, 2025 - Oct 1, 2025 (UTC)">Sep 1, 2025 - Oct 1, 2025 (UTC)</Option>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="Aug 1, 2025 - Sep 1, 2025 (UTC)">Aug 1, 2025 - Sep 1, 2025 (UTC)</Option>
                    </Select>
                  </div>
                  <div className="autoEmbeddingUsagePage-filter">
                    <span className="autoEmbeddingUsagePage-filterLabel">Models</span>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Select aria-label="Models" value={modelFilter} onChange={setModelFilter} size="small">
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="All models with usage">All models with usage</Option>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="voyage-4">voyage-4</Option>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="voyage-3-lite">voyage-3-lite</Option>
                    </Select>
                  </div>
                </div>

                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Card className="autoEmbeddingUsagePage-card">
                  <span className="autoEmbeddingUsagePage-cardTitle">Total Token Usage for Cluster0</span>
                  <div className="autoEmbeddingUsagePage-statLabel">Total Tokens</div>
                  <div className="autoEmbeddingUsagePage-statValue">714,919.00</div>
                  <MiniBarChart data={TOTAL_TOKEN_USAGE} startLabel="Sep 1" endLabel="Sep 30" />
                  <div className="autoEmbeddingUsagePage-legendRow">
                    <LegendSwatch color={FREE_COLOR} label="Free usage" />
                    <LegendSwatch color={PAID_COLOR} label="Paid usage" />
                  </div>
                </Card>

                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Card className="autoEmbeddingUsagePage-card">
                  <span className="autoEmbeddingUsagePage-cardTitle">{VOYAGE_4.name}</span>

                  <div className="autoEmbeddingUsagePage-subsection">
                    <span className="autoEmbeddingUsagePage-subsectionTitle">Query</span>
                    <p className="autoEmbeddingUsagePage-subsectionDescription">
                      Query tokens and embedding requests generated when <strong>{VOYAGE_4.name}</strong> is used
                      to process search queries during the selected time period.
                    </p>
                    <div className="autoEmbeddingUsagePage-chartsRow">
                      <div className="autoEmbeddingUsagePage-chartCol">
                        <div className="autoEmbeddingUsagePage-statLabelRow">
                          <span className="autoEmbeddingUsagePage-statLabel">Query tokens</span>
                          {/* @ts-ignore - React 19 polymorphic type mismatch */}
                          <Icon glyph="InfoWithCircle" size={12} fill="#889397" />
                        </div>
                        <div className="autoEmbeddingUsagePage-statValue">{VOYAGE_4.queryTokens}</div>
                        <MiniBarChart data={VOYAGE_4.queryTokenBars} startLabel="Sep 1" endLabel="Sep 30" />
                        <div className="autoEmbeddingUsagePage-legendRow">
                          <LegendSwatch color={FREE_COLOR} label="Free usage" />
                          <LegendSwatch color={PAID_COLOR} label="Paid usage" />
                        </div>
                      </div>
                      <div className="autoEmbeddingUsagePage-chartCol">
                        <div className="autoEmbeddingUsagePage-statLabelRow">
                          <span className="autoEmbeddingUsagePage-statLabel">Query Embedding Requests</span>
                          {/* @ts-ignore - React 19 polymorphic type mismatch */}
                          <Icon glyph="InfoWithCircle" size={12} fill="#889397" />
                        </div>
                        <div className="autoEmbeddingUsagePage-statValue">{VOYAGE_4.queryRequests}</div>
                        <MiniBarChart data={VOYAGE_4.queryRequestBars} startLabel="Sep 1" endLabel="Sep 30" />
                        <div className="autoEmbeddingUsagePage-legendRow">
                          <LegendSwatch color={REQUEST_COLOR} label="Query API Requests" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="autoEmbeddingUsagePage-subsection">
                    <span className="autoEmbeddingUsagePage-subsectionTitle">Index</span>
                    <p className="autoEmbeddingUsagePage-subsectionDescription">
                      Index tokens and embeddings requests used by <strong>{VOYAGE_4.name}</strong> to generate and
                      update embeddings during the selected time period.
                    </p>
                    <div className="autoEmbeddingUsagePage-chartsRow">
                      <div className="autoEmbeddingUsagePage-chartCol">
                        <div className="autoEmbeddingUsagePage-statLabelRow">
                          <span className="autoEmbeddingUsagePage-statLabel">Index tokens</span>
                          {/* @ts-ignore - React 19 polymorphic type mismatch */}
                          <Icon glyph="InfoWithCircle" size={12} fill="#889397" />
                        </div>
                        <div className="autoEmbeddingUsagePage-statValue">{VOYAGE_4.indexTokens}</div>
                        <MiniBarChart data={VOYAGE_4.indexTokenBars} startLabel="Sep 1" endLabel="Sep 30" />
                        <div className="autoEmbeddingUsagePage-legendRow">
                          <LegendSwatch color={FREE_COLOR} label="Free usage" />
                          <LegendSwatch color={PAID_COLOR} label="Paid usage" />
                        </div>
                      </div>
                      <div className="autoEmbeddingUsagePage-chartCol">
                        <div className="autoEmbeddingUsagePage-statLabelRow">
                          <span className="autoEmbeddingUsagePage-statLabel">Index Embedding Requests</span>
                          {/* @ts-ignore - React 19 polymorphic type mismatch */}
                          <Icon glyph="InfoWithCircle" size={12} fill="#889397" />
                        </div>
                        <div className="autoEmbeddingUsagePage-statValue">{VOYAGE_4.indexRequests}</div>
                        <MiniBarChart data={VOYAGE_4.indexRequestBars} startLabel="Sep 1" endLabel="Sep 30" />
                        <div className="autoEmbeddingUsagePage-legendRow">
                          <LegendSwatch color={REQUEST_COLOR} label="Index API Requests" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Card className="autoEmbeddingUsagePage-card">
                  <span className="autoEmbeddingUsagePage-cardTitle">{VOYAGE_3_LITE.name}</span>
                  <div className="autoEmbeddingUsagePage-chartsRow">
                    <div className="autoEmbeddingUsagePage-chartCol">
                      <div className="autoEmbeddingUsagePage-statLabel">Index tokens</div>
                      <div className="autoEmbeddingUsagePage-statValue">{VOYAGE_3_LITE.indexTokens}</div>
                      <MiniBarChart data={VOYAGE_3_LITE.indexTokenBars} startLabel="Sep 1" endLabel="Sep 30" />
                      <div className="autoEmbeddingUsagePage-legendRow">
                        <LegendSwatch color={FREE_COLOR} label="Free usage" />
                        <LegendSwatch color={PAID_COLOR} label="Paid usage" />
                      </div>
                    </div>
                    <div className="autoEmbeddingUsagePage-chartCol">
                      <div className="autoEmbeddingUsagePage-statLabel">Query tokens</div>
                      <div className="autoEmbeddingUsagePage-statValue">{VOYAGE_3_LITE.queryTokens}</div>
                      <MiniBarChart data={VOYAGE_3_LITE.queryTokenBars} startLabel="Sep 1" endLabel="Sep 30" />
                      <div className="autoEmbeddingUsagePage-legendRow">
                        <LegendSwatch color={FREE_COLOR} label="Free usage" />
                        <LegendSwatch color={PAID_COLOR} label="Paid usage" />
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <>
                <p className="autoEmbeddingUsagePage-description">
                  Your organization has a one-time allocation of free tokens for Automated Embedding. These tokens
                  apply at the organization level and are only used for the Automated Embedding service. Free
                  tokens do not renew and usage covered by them is not shown in billing.
                </p>

                <div className="autoEmbeddingUsagePage-filters">
                  <div className="autoEmbeddingUsagePage-filter">
                    <span className="autoEmbeddingUsagePage-filterLabel">Model(s)</span>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Select aria-label="Model(s)" value={modelFilter} onChange={setModelFilter} size="small">
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="All models">All models</Option>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="voyage-4">voyage-4</Option>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="voyage-4-large">voyage-4-large</Option>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="voyage-4-lite">voyage-4-lite</Option>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="voyage-code-3">voyage-code-3</Option>
                    </Select>
                  </div>
                </div>

                <div className="autoEmbeddingUsagePage-freeUsageGrid">
                  {FREE_USAGE_MODELS.map((model) => (
                    // @ts-ignore - React 19 polymorphic type mismatch
                    <Card className="autoEmbeddingUsagePage-card autoEmbeddingUsagePage-freeUsageCard" key={model.name}>
                      <span className="autoEmbeddingUsagePage-cardTitle">{model.name}</span>
                      {model.depleted ? (
                        <div className="autoEmbeddingUsagePage-freeUsageDepleted">
                          {/* @ts-ignore - React 19 polymorphic type mismatch */}
                          <Icon glyph="InfoWithCircle" size={16} fill="#016bf8" />
                          <span>{model.usedLabel}</span>
                        </div>
                      ) : (
                        <div className="autoEmbeddingUsagePage-freeUsageProgress">
                          <div className="autoEmbeddingUsagePage-freeUsageProgressHeader">
                            <span className="autoEmbeddingUsagePage-freeUsageProgressLabel">Tokens</span>
                            <span className="autoEmbeddingUsagePage-freeUsageProgressValue">
                              <strong>Available</strong>: {model.availableLabel}/{model.totalLabel}
                            </span>
                          </div>
                          <div className="autoEmbeddingUsagePage-freeUsageBarTrack">
                            <div
                              className="autoEmbeddingUsagePage-freeUsageBarFill"
                              style={{ width: `${model.usedPercent}%` }}
                            />
                          </div>
                          <span className="autoEmbeddingUsagePage-freeUsageCaption">{model.usedLabel}</span>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
