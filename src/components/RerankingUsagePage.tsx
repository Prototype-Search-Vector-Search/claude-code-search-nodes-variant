import { useState } from "react";
import Icon from "@leafygreen-ui/icon";
import { Card } from "@leafygreen-ui/card";
import { Tabs, Tab } from "@leafygreen-ui/tabs";
import { Select, Option } from "@leafygreen-ui/select";
import { Link } from "@leafygreen-ui/typography";
import { TopNav } from "./TopNav";
import { PersistentSideNav } from "./PersistentSideNav";
import { SearchNavPanel } from "./SearchNavPanel";
import { MiniBarChart, LegendSwatch, type BarDatum } from "./MiniBarChart";
import "./RerankingUsagePage.css";

export interface RerankingUsagePageProps {
  onBackToProjectOverview: () => void;
  onOpenSearchIndexes: () => void;
  onOpenClusters: () => void;
  onOpenProjectSettings: () => void;
  onOpenIndexOverview: () => void;
  onOpenStatusDetails: () => void;
  onOpenSearchTester: () => void;
  onOpenAutoEmbeddingUsage: () => void;
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

const MODELS = [
  {
    name: "rerank-2.5",
    tokens: "516,910.00",
    requests: "30",
    tokenBars: tokenUsageBars(30, 3),
    requestBars: requestBars(30),
  },
  {
    name: "rerank-2.5-lite",
    tokens: "516,910.00",
    requests: "30",
    tokenBars: tokenUsageBars(30, 3),
    requestBars: requestBars(30),
  },
];

interface FreeUsageModel {
  name: string;
  availableLabel: string;
  totalLabel: string;
  usedPercent: number;
  usedLabel: string;
  depleted?: boolean;
  depletedMessage?: string;
}

const FREE_USAGE_MODELS: FreeUsageModel[] = [
  {
    name: "rerank-2.5-lite",
    availableLabel: "200 million",
    totalLabel: "200 million",
    usedPercent: 0,
    usedLabel: "You have used 0 free tokens (0%)",
  },
  {
    name: "rerank-2.5",
    availableLabel: "0",
    totalLabel: "100",
    usedPercent: 100,
    usedLabel: "You have used all 100 free tokens for this model.",
    depleted: true,
  },
];

export function RerankingUsagePage({
  onBackToProjectOverview,
  onOpenSearchIndexes,
  onOpenClusters,
  onOpenProjectSettings,
  onOpenIndexOverview,
  onOpenStatusDetails,
  onOpenSearchTester,
  onOpenAutoEmbeddingUsage,
  onOpenAutoEmbeddingRateLimits,
  onOpenRerankingRateLimits,
}: RerankingUsagePageProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [usagePeriod, setUsagePeriod] = useState("Jan 1, 2026 - Jan 31, 2026 (UTC)");
  const [modelFilter, setModelFilter] = useState("All models");

  return (
    <div className="rerankingUsagePage">
      <div className="rerankingUsagePage-body">
        <PersistentSideNav
          activeSection="database"
          activeItem="Search & Vector Search"
          onNavigateProjectOverview={onBackToProjectOverview}
          onOpenSearchIndexes={onOpenSearchIndexes}
          onOpenClusters={onOpenClusters}
          onOpenProjectSettings={onOpenProjectSettings}
        >
          <SearchNavPanel
            activeItem="Reranking Usage"
            onSelectSearchIndexes={onOpenSearchIndexes}
            onSelectIndexOverview={onOpenIndexOverview}
            onSelectStatusDetails={onOpenStatusDetails}
            onSelectSearchTester={onOpenSearchTester}
            onSelectRerankingUsage={() => {}}
            onSelectAutoEmbeddingUsage={onOpenAutoEmbeddingUsage}
            onSelectAutoEmbeddingRateLimits={onOpenAutoEmbeddingRateLimits}
            onSelectRerankingRateLimits={onOpenRerankingRateLimits}
          />
        </PersistentSideNav>

        <div className="rerankingUsagePage-mainColumn">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <TopNav organization="Leafy Green" project="Greenery" clusterName="Cluster0" showLogo={false} />

          <div className="rerankingUsagePage-mainArea">
            <p className="rerankingUsagePage-heading">Native Reranking Usage</p>

            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Tabs
              className="rerankingUsagePage-tabs"
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
                <p className="rerankingUsagePage-description">
                  Visit the{" "}
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Link href="#">cost explorer</Link> and filter by model to understand how usage translates to
                  cost.{" "}
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Link href="#">Add payment method</Link> to continue using the service with models where free
                  tokens ran out. See more granular query metrics in{" "}
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Link href="#">Query Insights</Link>.
                </p>

                <div className="rerankingUsagePage-filters">
                  <div className="rerankingUsagePage-filter">
                    <span className="rerankingUsagePage-filterLabel">Usage Period</span>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Select aria-label="Usage Period" value={usagePeriod} onChange={setUsagePeriod} size="small">
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="Jan 1, 2026 - Jan 31, 2026 (UTC)">Jan 1, 2026 - Jan 31, 2026 (UTC)</Option>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="Dec 1, 2025 - Dec 31, 2025 (UTC)">Dec 1, 2025 - Dec 31, 2025 (UTC)</Option>
                    </Select>
                  </div>
                  <div className="rerankingUsagePage-filter">
                    <span className="rerankingUsagePage-filterLabel">Models</span>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Select aria-label="Models" value={modelFilter} onChange={setModelFilter} size="small">
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="All models">All models</Option>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="rerank-2.5">rerank-2.5</Option>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="rerank-2.5-lite">rerank-2.5-lite</Option>
                    </Select>
                  </div>
                </div>

                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Card className="rerankingUsagePage-card">
                  <span className="rerankingUsagePage-cardTitle">Total Token Usage for Cluster0</span>
                  <div className="rerankingUsagePage-statLabel">Total Tokens</div>
                  <div className="rerankingUsagePage-statValue">714,919.00</div>
                  <MiniBarChart data={TOTAL_TOKEN_USAGE} startLabel="Jan 1" endLabel="Jan 30" />
                  <div className="rerankingUsagePage-legendRow">
                    <LegendSwatch color={FREE_COLOR} label="Free usage" />
                    <LegendSwatch color={PAID_COLOR} label="Paid usage" />
                  </div>
                </Card>

                {MODELS.map((model) => (
                  // @ts-ignore - React 19 polymorphic type mismatch
                  <Card className="rerankingUsagePage-card" key={model.name}>
                    <span className="rerankingUsagePage-cardTitle">{model.name}</span>
                    <div className="rerankingUsagePage-chartsRow">
                      <div className="rerankingUsagePage-chartCol">
                        <div className="rerankingUsagePage-statLabel">Tokens</div>
                        <div className="rerankingUsagePage-statValue">{model.tokens}</div>
                        <MiniBarChart data={model.tokenBars} startLabel="Sep 1" endLabel="Sep 30" />
                        <div className="rerankingUsagePage-legendRow">
                          <LegendSwatch color={FREE_COLOR} label="Free usage" />
                          <LegendSwatch color={PAID_COLOR} label="Paid usage" />
                        </div>
                      </div>
                      <div className="rerankingUsagePage-chartCol">
                        <div className="rerankingUsagePage-statLabel">$rerank Requests</div>
                        <div className="rerankingUsagePage-statValue">{model.requests}</div>
                        <MiniBarChart data={model.requestBars} startLabel="Sep 1" endLabel="Sep 30" />
                        <div className="rerankingUsagePage-legendRow">
                          <LegendSwatch color={REQUEST_COLOR} label="$rerank Requests" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            ) : (
              <>
                <p className="rerankingUsagePage-subheading">Free Token Usage for Leafy Green Organization</p>

                <p className="rerankingUsagePage-description">
                  We offer a limited free usage allowance for reranker models. After all free tokens are used, they
                  will not renew. See details on the free usage for each organization on our{" "}
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Link href="#">docs page</Link>. Free usage isn't reflected in billing.{" "}
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Link href="#">Add payment method</Link> to continue using the service with models where free
                  tokens run out.
                </p>

                <div className="rerankingUsagePage-filters">
                  <div className="rerankingUsagePage-filter">
                    <span className="rerankingUsagePage-filterLabel">Models</span>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Select aria-label="Models" value={modelFilter} onChange={setModelFilter} size="small">
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="All models">All models</Option>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="rerank-2.5">rerank-2.5</Option>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Option value="rerank-2.5-lite">rerank-2.5-lite</Option>
                    </Select>
                  </div>
                </div>

                <div className="rerankingUsagePage-freeUsageRow">
                  {FREE_USAGE_MODELS.map((model) => (
                    // @ts-ignore - React 19 polymorphic type mismatch
                    <Card className="rerankingUsagePage-card rerankingUsagePage-freeUsageCard" key={model.name}>
                      <span className="rerankingUsagePage-cardTitle">{model.name}</span>
                      {model.depleted ? (
                        <div className="rerankingUsagePage-freeUsageDepleted">
                          {/* @ts-ignore - React 19 polymorphic type mismatch */}
                          <Icon glyph="InfoWithCircle" size={16} fill="#016bf8" />
                          <span>{model.usedLabel}</span>
                        </div>
                      ) : (
                        <div className="rerankingUsagePage-freeUsageProgress">
                          <div className="rerankingUsagePage-freeUsageProgressHeader">
                            <span className="rerankingUsagePage-freeUsageProgressLabel">Tokens</span>
                            <span className="rerankingUsagePage-freeUsageProgressValue">
                              <strong>Available</strong>: {model.availableLabel}/{model.totalLabel}
                            </span>
                          </div>
                          <div className="rerankingUsagePage-freeUsageBarTrack">
                            <div
                              className="rerankingUsagePage-freeUsageBarFill"
                              style={{ width: `${model.usedPercent}%` }}
                            />
                          </div>
                          <span className="rerankingUsagePage-freeUsageCaption">{model.usedLabel}</span>
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
