import Icon from "@leafygreen-ui/icon";
import { Button } from "@leafygreen-ui/button";
import { AccountLayout } from "./AccountLayout";
import "./OrganizationsPage.css";

interface OrgRow {
  name: string;
  plan: string;
  role: "Organization Member" | "Organization Owner";
}

const ORGS: OrgRow[] = [
  { name: "Leafy Green", plan: "Atlas", role: "Organization Owner" },
];

export function OrganizationsPage() {
  return (
    <AccountLayout activeItem="Organizations">
      <div className="organizationsPage-content">
        <div className="organizationsPage-header">
          <h1 className="organizationsPage-title">Organizations</h1>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Button variant="primary">Create New Organization</Button>
        </div>

        <div className="organizationsPage-card">
          <table className="organizationsPage-table">
            <thead>
              <tr>
                <th>
                  <span className="organizationsPage-thSortable">
                    Organization Name
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Icon glyph="SortAscending" size={14} fill="#889397" />
                  </span>
                </th>
                <th>Plan Type</th>
                <th>Roles</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ORGS.map((org) => (
                <tr key={org.name}>
                  <td>
                    <a href={`${import.meta.env.BASE_URL}?view=all-projects`} className="organizationsPage-orgLink">
                      {org.name}
                    </a>
                  </td>
                  <td>{org.plan}</td>
                  <td>{org.role}</td>
                  <td>
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Button size="xsmall" disabled={org.role === "Organization Owner"}>
                      LEAVE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="organizationsPage-pagination">
            <div className="organizationsPage-perPage">
              Items per page:
              <span className="organizationsPage-perPageValue">25 ▾</span>
            </div>
            <div className="organizationsPage-count">1 - 1 of 1 items</div>
            <div className="organizationsPage-pager">
              <span className="organizationsPage-pageValue">1 ▾</span>
              of 1
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="ChevronLeft" size={16} fill="#c1c7c6" />
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="ChevronRight" size={16} fill="#c1c7c6" />
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
