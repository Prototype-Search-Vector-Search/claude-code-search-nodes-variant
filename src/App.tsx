import { useState } from 'react'
import { CreateClusterPage } from './components/CreateClusterPage'
import { ProjectOverviewPage } from './components/ProjectOverviewPage'
import { ProjectSettingsPage } from './components/ProjectSettingsPage'
import { ClustersPage } from './components/ClustersPage'
import { ClusterOverviewPage } from './components/ClusterOverviewPage'
import { SearchIndexesPage } from './components/SearchIndexesPage'
import { IndexOverviewPage } from './components/IndexOverviewPage'
import { StatusDetailsPage } from './components/StatusDetailsPage'
import { SearchTesterPage } from './components/SearchTesterPage'
import { AutoEmbeddingUsagePage } from './components/AutoEmbeddingUsagePage'
import { AutoEmbeddingRateLimitsPage } from './components/AutoEmbeddingRateLimitsPage'
import { RerankingUsagePage } from './components/RerankingUsagePage'
import { RerankingRateLimitsPage } from './components/RerankingRateLimitsPage'
import { ProfileInfoPage } from './components/ProfileInfoPage'
import { AllProjectsPage } from './components/AllProjectsPage'
import { OrganizationsPage } from './components/OrganizationsPage'
import { OrgSettingsPage } from './components/OrgSettingsPage'
import { ClusterMetricsPage } from './components/ClusterMetricsPage'

type View =
  | 'create-cluster'
  | 'project-overview'
  | 'project-settings'
  | 'clusters'
  | 'cluster-overview'
  | 'search-indexes'
  | 'index-overview'
  | 'status-details'
  | 'search-tester'
  | 'auto-embedding-usage'
  | 'auto-embedding-rate-limits'
  | 'reranking-usage'
  | 'reranking-rate-limits'
  | 'account-profile'
  | 'all-projects'
  | 'organizations'
  | 'org-settings'
  | 'cluster-metrics'

function App() {
  // Some entry points (account tab, "All Clusters" in the account menu) link via
  // a ?view= param, so honor that on load.
  const viewParam = new URLSearchParams(window.location.search).get('view')
  const VIEW_PARAM_MAP: Record<string, View> = {
    account: 'account-profile',
    clusters: 'clusters',
    'cluster-overview': 'cluster-overview',
    'all-projects': 'all-projects',
    organizations: 'organizations',
    'org-settings': 'org-settings',
  }
  const initialView: View = (viewParam && VIEW_PARAM_MAP[viewParam]) || 'project-overview'
  const [view, setView] = useState<View>(initialView)
  const [previousView, setPreviousView] = useState<View>('project-overview')
  const [clusterBuilderMode, setClusterBuilderMode] = useState<'create' | 'edit'>('edit')

  if (view === 'account-profile') {
    return <ProfileInfoPage />
  }

  if (view === 'all-projects') {
    return <AllProjectsPage />
  }

  if (view === 'organizations') {
    return <OrganizationsPage />
  }

  if (view === 'org-settings') {
    return <OrgSettingsPage />
  }

  const openClusterBuilder = (mode: 'create' | 'edit' = 'edit') => {
    setClusterBuilderMode(mode)
    setPreviousView(view)
    setView('create-cluster')
  }

  const openProjectSettings = () => setView('project-settings')
  const openMetrics = () => setView('cluster-metrics')

  if (view === 'cluster-metrics') {
    return (
      <ClusterMetricsPage
        onBackToProjectOverview={() => setView('project-overview')}
        onBackToClusters={() => setView('clusters')}
        onOpenSearchIndexes={() => setView('search-indexes')}
        onOpenClusters={() => setView('clusters')}
        onOpenProjectSettings={openProjectSettings}
        onOpenClusterOverview={() => setView('cluster-overview')}
      />
    )
  }

  if (view === 'project-settings') {
    return (
      <ProjectSettingsPage
        onBackToProjectOverview={() => setView('project-overview')}
        onOpenSearchIndexes={() => setView('search-indexes')}
        onOpenClusters={() => setView('clusters')}
      />
    )
  }

  if (view === 'cluster-overview') {
    return (
      <ClusterOverviewPage
        onBackToProjectOverview={() => setView('project-overview')}
        onBackToClusters={() => setView('clusters')}
        onOpenSearchIndexes={() => setView('search-indexes')}
        onOpenClusters={() => setView('clusters')}
        onOpenClusterBuilder={openClusterBuilder}
        onOpenProjectSettings={openProjectSettings}
        onOpenMetrics={openMetrics}
      />
    )
  }

  if (view === 'clusters') {
    return (
      <ClustersPage
        onBackToProjectOverview={() => setView('project-overview')}
        onOpenSearchIndexes={() => setView('search-indexes')}
        onOpenClusterBuilder={openClusterBuilder}
        onOpenClusterOverview={() => setView('cluster-overview')}
        onOpenProjectSettings={openProjectSettings}
        onOpenMetrics={openMetrics}
      />
    )
  }

  if (view === 'auto-embedding-rate-limits') {
    return (
      <AutoEmbeddingRateLimitsPage
        onBackToProjectOverview={() => setView('project-overview')}
        onOpenSearchIndexes={() => setView('search-indexes')}
        onOpenIndexOverview={() => setView('index-overview')}
        onOpenStatusDetails={() => setView('status-details')}
        onOpenSearchTester={() => setView('search-tester')}
        onOpenAutoEmbeddingUsage={() => setView('auto-embedding-usage')}
        onOpenRerankingUsage={() => setView('reranking-usage')}
        onOpenRerankingRateLimits={() => setView('reranking-rate-limits')}
        onOpenClusters={() => setView('clusters')}
        onOpenProjectSettings={openProjectSettings}
      />
    )
  }

  if (view === 'auto-embedding-usage') {
    return (
      <AutoEmbeddingUsagePage
        onBackToProjectOverview={() => setView('project-overview')}
        onOpenSearchIndexes={() => setView('search-indexes')}
        onOpenIndexOverview={() => setView('index-overview')}
        onOpenStatusDetails={() => setView('status-details')}
        onOpenSearchTester={() => setView('search-tester')}
        onOpenAutoEmbeddingRateLimits={() => setView('auto-embedding-rate-limits')}
        onOpenRerankingUsage={() => setView('reranking-usage')}
        onOpenRerankingRateLimits={() => setView('reranking-rate-limits')}
        onOpenClusters={() => setView('clusters')}
        onOpenProjectSettings={openProjectSettings}
      />
    )
  }

  if (view === 'reranking-rate-limits') {
    return (
      <RerankingRateLimitsPage
        onBackToProjectOverview={() => setView('project-overview')}
        onOpenSearchIndexes={() => setView('search-indexes')}
        onOpenIndexOverview={() => setView('index-overview')}
        onOpenStatusDetails={() => setView('status-details')}
        onOpenSearchTester={() => setView('search-tester')}
        onOpenAutoEmbeddingUsage={() => setView('auto-embedding-usage')}
        onOpenAutoEmbeddingRateLimits={() => setView('auto-embedding-rate-limits')}
        onOpenRerankingUsage={() => setView('reranking-usage')}
        onOpenClusters={() => setView('clusters')}
        onOpenProjectSettings={openProjectSettings}
      />
    )
  }

  if (view === 'reranking-usage') {
    return (
      <RerankingUsagePage
        onBackToProjectOverview={() => setView('project-overview')}
        onOpenSearchIndexes={() => setView('search-indexes')}
        onOpenIndexOverview={() => setView('index-overview')}
        onOpenStatusDetails={() => setView('status-details')}
        onOpenSearchTester={() => setView('search-tester')}
        onOpenAutoEmbeddingUsage={() => setView('auto-embedding-usage')}
        onOpenAutoEmbeddingRateLimits={() => setView('auto-embedding-rate-limits')}
        onOpenRerankingRateLimits={() => setView('reranking-rate-limits')}
        onOpenClusters={() => setView('clusters')}
        onOpenProjectSettings={openProjectSettings}
      />
    )
  }

  if (view === 'index-overview') {
    return (
      <IndexOverviewPage
        onBackToProjectOverview={() => setView('project-overview')}
        onSelectSearchIndexes={() => setView('search-indexes')}
        onSelectStatusDetails={() => setView('status-details')}
        onSelectSearchTester={() => setView('search-tester')}
        onSelectAutoEmbeddingUsage={() => setView('auto-embedding-usage')}
        onSelectAutoEmbeddingRateLimits={() => setView('auto-embedding-rate-limits')}
        onSelectRerankingUsage={() => setView('reranking-usage')}
        onSelectRerankingRateLimits={() => setView('reranking-rate-limits')}
        onOpenClusters={() => setView('clusters')}
        onOpenProjectSettings={openProjectSettings}
      />
    )
  }

  if (view === 'status-details') {
    return (
      <StatusDetailsPage
        onBackToProjectOverview={() => setView('project-overview')}
        onSelectSearchIndexes={() => setView('search-indexes')}
        onSelectIndexOverview={() => setView('index-overview')}
        onSelectSearchTester={() => setView('search-tester')}
        onSelectAutoEmbeddingUsage={() => setView('auto-embedding-usage')}
        onSelectAutoEmbeddingRateLimits={() => setView('auto-embedding-rate-limits')}
        onSelectRerankingUsage={() => setView('reranking-usage')}
        onSelectRerankingRateLimits={() => setView('reranking-rate-limits')}
        onOpenClusters={() => setView('clusters')}
        onOpenProjectSettings={openProjectSettings}
      />
    )
  }

  if (view === 'search-tester') {
    return (
      <SearchTesterPage
        onBackToProjectOverview={() => setView('project-overview')}
        onSelectSearchIndexes={() => setView('search-indexes')}
        onSelectIndexOverview={() => setView('index-overview')}
        onSelectStatusDetails={() => setView('status-details')}
        onSelectAutoEmbeddingUsage={() => setView('auto-embedding-usage')}
        onSelectAutoEmbeddingRateLimits={() => setView('auto-embedding-rate-limits')}
        onSelectRerankingUsage={() => setView('reranking-usage')}
        onSelectRerankingRateLimits={() => setView('reranking-rate-limits')}
        onOpenClusters={() => setView('clusters')}
        onOpenProjectSettings={openProjectSettings}
      />
    )
  }

  if (view === 'search-indexes') {
    return (
      <SearchIndexesPage
        onBackToProjectOverview={() => setView('project-overview')}
        onOpenIndexOverview={() => setView('index-overview')}
        onOpenStatusDetails={() => setView('status-details')}
        onOpenSearchTester={() => setView('search-tester')}
        onOpenAutoEmbeddingUsage={() => setView('auto-embedding-usage')}
        onOpenAutoEmbeddingRateLimits={() => setView('auto-embedding-rate-limits')}
        onOpenRerankingUsage={() => setView('reranking-usage')}
        onOpenRerankingRateLimits={() => setView('reranking-rate-limits')}
        onOpenClusters={() => setView('clusters')}
        onOpenProjectSettings={openProjectSettings}
      />
    )
  }

  if (view === 'project-overview') {
    return (
      <ProjectOverviewPage
        onOpenClusterBuilder={openClusterBuilder}
        onOpenSearchIndexes={() => setView('search-indexes')}
        onOpenClusters={() => setView('clusters')}
        onOpenProjectSettings={openProjectSettings}
        onOpenMetrics={openMetrics}
      />
    )
  }

  return <CreateClusterPage mode={clusterBuilderMode} onCancel={() => setView(previousView)} />
}

export default App
