import { useState } from "react";
import Icon from "@leafygreen-ui/icon";
import { IconButton } from "@leafygreen-ui/icon-button";
import { TopNav } from "./TopNav";
import { OrgSideNav } from "./OrgSideNav";
import "./AllProjectsPage.css";

interface ProjectRow {
  name: string;
  clusters: number;
  users: number;
  teams: number;
  alerts: number;
}

const PROJECTS: ProjectRow[] = [
  { name: "Greenery", clusters: 1, users: 2, teams: 0, alerts: 0 },
];

export function AllProjectsPage() {
  const [query, setQuery] = useState("");
  const filtered = PROJECTS.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="allProjectsPage">
      <TopNav
        showAtlasLockup
        breadcrumbSegments={[{ label: "Organization", value: "MongoDB-Products-Team", withCaret: true }]}
      />

      <div className="allProjectsPage-body">
        <OrgSideNav activeItem="All Projects" />

        <div className="allProjectsPage-mainArea">
          <h1 className="allProjectsPage-heading">All Projects</h1>

          <div className="allProjectsPage-search">
            <input
              type="text"
              className="allProjectsPage-searchInput"
              placeholder="Find a project..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="MagnifyingGlass" size={16} fill="#889397" />
          </div>

          <table className="allProjectsPage-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Clusters</th>
                <th>Tags</th>
                <th>Users</th>
                <th>Teams</th>
                <th>Alerts</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.name}>
                  <td>
                    <a href={`${import.meta.env.BASE_URL}?view=project-overview`} className="allProjectsPage-link">
                      {p.name}
                    </a>
                  </td>
                  <td>
                    {p.clusters} Cluster{p.clusters === 1 ? "" : "s"}
                  </td>
                  <td>
                    <a href="#" className="allProjectsPage-link">
                      + Add Tags
                    </a>
                  </td>
                  <td>
                    <a href="#" className="allProjectsPage-link">
                      {p.users} User{p.users === 1 ? "" : "s"}
                    </a>
                  </td>
                  <td>
                    <a href="#" className="allProjectsPage-link">
                      {p.teams} Teams
                    </a>
                  </td>
                  <td>
                    {p.alerts > 0 ? (
                      <span className="allProjectsPage-alert">
                        {/* @ts-ignore - React 19 polymorphic type mismatch */}
                        <Icon glyph="Warning" size={14} fill="#db3030" />
                        {p.alerts} Alerts
                      </span>
                    ) : (
                      <a href="#" className="allProjectsPage-link">
                        0 Alerts
                      </a>
                    )}
                  </td>
                  <td>
                    <div className="allProjectsPage-actions">
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <IconButton aria-label="More actions">
                        {/* @ts-ignore - React 19 polymorphic type mismatch */}
                        <Icon glyph="Ellipsis" />
                      </IconButton>
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <IconButton aria-label="Delete project">
                        {/* @ts-ignore - React 19 polymorphic type mismatch */}
                        <Icon glyph="Trash" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="allProjectsPage-pagination">
            <div className="allProjectsPage-perPage">
              Items per page: <span className="allProjectsPage-pageChip">25 ▾</span>
            </div>
            <div className="allProjectsPage-count">1 - 1 of 1 items</div>
            <div className="allProjectsPage-pager">
              <span className="allProjectsPage-pageChip">1 ▾</span> of 1
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="ChevronLeft" size={16} fill="#c1c7c6" />
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="ChevronRight" size={16} fill="#5c6c75" />
            </div>
          </div>

          <div className="allProjectsPage-footer">
            <div className="allProjectsPage-footerRow">
              <span>
                Alert System Status: <span className="allProjectsPage-footerGood">All Good</span>
              </span>
              <span>Last Login: 104.30.164.7</span>
              <span>Version: b19e508dc6@v20260617</span>
            </div>
            <div className="allProjectsPage-footerRow">
              <span>Atlas Plan: NDS</span>
              <span>Effective Plan: NDS</span>
              <span>Central URL: https://cloud.mongodb.com</span>
              <span>Organization Name: MongoDB-Products-Team</span>
            </div>
            <div className="allProjectsPage-footerRow">
              <span>©2026 MongoDB, Inc.</span>
              <a href="#" className="allProjectsPage-link">Status</a>
              <a href="#" className="allProjectsPage-link">Terms</a>
              <a href="#" className="allProjectsPage-link">Privacy</a>
              <a href="#" className="allProjectsPage-link">Atlas Blog</a>
              <a href="#" className="allProjectsPage-link">Contact Sales</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
