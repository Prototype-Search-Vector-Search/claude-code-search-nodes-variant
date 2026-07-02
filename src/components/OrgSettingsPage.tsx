import { useState } from "react";
import Icon from "@leafygreen-ui/icon";
import { IconButton } from "@leafygreen-ui/icon-button";
import { Button } from "@leafygreen-ui/button";
import { Badge } from "@leafygreen-ui/badge";
import { Banner } from "@leafygreen-ui/banner";
import { Toggle } from "@leafygreen-ui/toggle";
import { TopNav } from "./TopNav";
import { OrgSideNav } from "./OrgSideNav";
import "./OrgSettingsPage.css";

const TABS = ["General Settings", "Beta Features", "Integrations"];

function EditButton() {
  return (
    // @ts-ignore - React 19 polymorphic type mismatch
    <IconButton aria-label="Edit">
      {/* @ts-ignore - React 19 polymorphic type mismatch */}
      <Icon glyph="Edit" />
    </IconButton>
  );
}

export function OrgSettingsPage() {
  const [activeTab, setActiveTab] = useState("General Settings");
  const [mfa, setMfa] = useState(false);
  const [ipAccessList, setIpAccessList] = useState(false);
  const [blockSupport, setBlockSupport] = useState(false);
  const [streamProcessing, setStreamProcessing] = useState(false);
  const [genAI, setGenAI] = useState(true);

  return (
    <div className="orgSettingsPage">
      <TopNav showAtlasLockup breadcrumbSegments={[{ label: "Organization", value: "Leafy Green", withCaret: true }]} />

      <div className="orgSettingsPage-body">
        <OrgSideNav activeItem="Organization Settings" />

        <div className="orgSettingsPage-mainArea">
          <h1 className="orgSettingsPage-heading">Organization Settings</h1>

          <div className="orgSettingsPage-tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`orgSettingsPage-tab ${tab === activeTab ? "orgSettingsPage-tab--active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Top summary cards */}
          <div className="orgSettingsPage-summaryRow">
            <div className="orgSettingsPage-summaryCard">
              <div className="orgSettingsPage-summaryHeader">
                <span className="orgSettingsPage-summaryTitle">Organization ID</span>
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <IconButton aria-label="Copy Organization ID">
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Icon glyph="Copy" />
                </IconButton>
              </div>
              <span className="orgSettingsPage-summaryValue">5ec546a4af2ebb7ced1f5b29</span>
            </div>
            <div className="orgSettingsPage-summaryCard">
              <div className="orgSettingsPage-summaryHeader">
                <span className="orgSettingsPage-summaryTitle">Organization Name</span>
                <EditButton />
              </div>
              <span className="orgSettingsPage-summaryValue">Leafy Green</span>
            </div>
            <div className="orgSettingsPage-summaryCard">
              <div className="orgSettingsPage-summaryHeader">
                <span className="orgSettingsPage-summaryTitle">Created On</span>
              </div>
              <span className="orgSettingsPage-summaryValue">05/20/20 - 03:03:00 PM</span>
            </div>
          </div>

          {/* MFA */}
          <div className="orgSettingsPage-card">
            <div className="orgSettingsPage-cardHead">
              <span className="orgSettingsPage-cardTitle">Require Multi-Factor Authentication (MFA)</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Toggle aria-label="Require MFA" size="small" checked={mfa} onChange={setMfa} />
            </div>
            <p className="orgSettingsPage-cardDesc">
              This will require users to set up MFA before accessing your organization. We will not prompt users to set up
              MFA in this organization if they login with Google, GitHub, or use{" "}
              <a href="#" className="orgSettingsPage-link">Single-Sign-On</a> through federated authentication.
            </p>
          </div>

          {/* Session Timeout */}
          <div className="orgSettingsPage-card">
            <div className="orgSettingsPage-cardHead">
              <span className="orgSettingsPage-cardTitle">
                Configure Session Timeout{" "}
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Badge variant="blue">PREVIEW</Badge>
              </span>
              <EditButton />
            </div>
            <p className="orgSettingsPage-cardDesc">
              Configure the absolute duration and the maximum idle (inactive) time allowed before requiring
              re-authentication within the Atlas UI. Updated timeouts will be reflected on a user's next login.{" "}
              <strong>
                If a user belongs to more than one organization, the session timeout policy from the organization with
                the strictest settings will be applied for each duration.
              </strong>
              <br />
              Note: Session timeout settings are not enforced across all MongoDB services.{" "}
              <a href="#" className="orgSettingsPage-link">Learn More</a>
            </p>
            <p className="orgSettingsPage-cardDetail">
              <strong>Absolute Session Timeout:</strong> 12 hours
            </p>
            <p className="orgSettingsPage-cardDetail">
              <strong>Idle Session Timeout:</strong> None
            </p>
          </div>

          {/* Security Contact */}
          <div className="orgSettingsPage-card">
            <div className="orgSettingsPage-cardHead">
              <span className="orgSettingsPage-cardTitle">
                Atlas Security Contact Information{" "}
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Badge variant="yellow">INCOMPLETE</Badge>
              </span>
              <EditButton />
            </div>
            <p className="orgSettingsPage-cardDesc">
              The designated Atlas security contact will receive security-related notifications, including notifications
              from the MongoDB Security Team. Note that this contact point is for notifications only and is not authorized
              for security decisions or approvals. <a href="#" className="orgSettingsPage-link">Learn More</a>
            </p>
            <div className="orgSettingsPage-disabledInput">No security contact email added</div>
          </div>

          {/* Service Accounts */}
          <div className="orgSettingsPage-card">
            <div className="orgSettingsPage-cardHead">
              <span className="orgSettingsPage-cardTitle">Service Accounts Client Secret Maximum Expiration Time</span>
              <EditButton />
            </div>
            <p className="orgSettingsPage-cardDesc">
              Manage the maximum allowed expiration for client secrets created for Atlas service accounts. You can still
              change individual client secret expiration time when managing the service account.
            </p>
          </div>

          {/* IP Access List */}
          <div className="orgSettingsPage-card">
            <div className="orgSettingsPage-cardHead">
              <span className="orgSettingsPage-cardTitle">Require IP Access List for the Atlas Administration API</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Toggle aria-label="Require IP Access List" size="small" checked={ipAccessList} onChange={setIpAccessList} />
            </div>
            <p className="orgSettingsPage-cardDesc">
              This will force all Atlas Administration API operations for your organization to originate from an IP
              Address added to your Access List by the API Key or Service Account.{" "}
              <a href="#" className="orgSettingsPage-link">Docs</a>
            </p>
          </div>

          {/* Block Support */}
          <div className="orgSettingsPage-card">
            <div className="orgSettingsPage-cardHead">
              <span className="orgSettingsPage-cardTitle">
                Block MongoDB Support Access to Atlas Cluster Infrastructure and Logs
              </span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Toggle aria-label="Block MongoDB Support Access" size="small" checked={blockSupport} onChange={setBlockSupport} />
            </div>
            <p className="orgSettingsPage-cardDesc">
              This will block MongoDB Support from accessing any cluster in this organization, their underlying
              infrastructure, and any logs without your explicit permission. Once this setting is turned on, you can grant
              MongoDB Support a 24-hour bypass at the cluster level for the cluster infrastructure or database logs to
              resolve any support issues. You can revoke this 24-hour bypass at any time.
            </p>
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Banner variant="info" className="orgSettingsPage-banner">
              Note that blocking infrastructure and logs access from MongoDB Support may negatively impact cluster
              availability and increase support issue resolution time. <a href="#" className="orgSettingsPage-link">Docs</a>
            </Banner>
          </div>

          {/* Stream Processing */}
          <div className="orgSettingsPage-card">
            <div className="orgSettingsPage-cardHead">
              <span className="orgSettingsPage-cardTitle">Enable Atlas Stream Processing Across Projects</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Toggle aria-label="Enable Stream Processing" size="small" checked={streamProcessing} onChange={setStreamProcessing} />
            </div>
            <p className="orgSettingsPage-cardDesc">
              This will allow Atlas Stream Processors to create connections to clusters in other projects within this
              organization.
            </p>
          </div>

          {/* Gen AI */}
          <div className="orgSettingsPage-card">
            <div className="orgSettingsPage-cardHead">
              <span className="orgSettingsPage-cardTitle">Enable Atlas features that use generative AI</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Toggle aria-label="Enable generative AI features" size="small" checked={genAI} onChange={setGenAI} />
            </div>
            <p className="orgSettingsPage-cardDesc">
              This will allow Atlas features using generative AI to be enabled in all projects. When this setting is
              turned on, Project Owners may be able to enable or disable individual AI features at the project level.
              Please see our <a href="#" className="orgSettingsPage-link">FAQ</a> for more information.
            </p>
          </div>

          {/* Delete Org */}
          <div className="orgSettingsPage-card">
            <div className="orgSettingsPage-cardHead">
              <span className="orgSettingsPage-cardTitle">Delete Organization</span>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Button variant="dangerOutline" disabled>
                Delete Organization
              </Button>
            </div>
            <p className="orgSettingsPage-cardDesc">
              Before deleting this organization, you must delete all its projects and integrations. This action cannot be
              undone.
            </p>
          </div>

          <div className="orgSettingsPage-footer">
            <div className="orgSettingsPage-footerRow">
              <span>
                Alert System Status: <span className="orgSettingsPage-footerGood">All Good</span>
              </span>
              <span>Last Login: 104.30.164.7</span>
              <span>Version: b19e508dc6@v20260617</span>
            </div>
            <div className="orgSettingsPage-footerRow">
              <span>Atlas Plan: NDS</span>
              <span>Effective Plan: NDS</span>
              <span>Plan Start Date: 2020-05-01T00:00:00Z</span>
              <span>Central URL: https://cloud.mongodb.com</span>
              <span>Organization Name: Leafy Green</span>
            </div>
            <div className="orgSettingsPage-footerRow">
              <span>©2026 MongoDB, Inc.</span>
              <a href="#" className="orgSettingsPage-link">Status</a>
              <a href="#" className="orgSettingsPage-link">Terms</a>
              <a href="#" className="orgSettingsPage-link">Privacy</a>
              <a href="#" className="orgSettingsPage-link">Atlas Blog</a>
              <a href="#" className="orgSettingsPage-link">Contact Sales</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
