import { useState } from "react";
import Icon from "@leafygreen-ui/icon";
import { palette } from "@leafygreen-ui/palette";
import { Toggle } from "@leafygreen-ui/toggle";
import { Select, Option } from "@leafygreen-ui/select";
import { NumberInput } from "@leafygreen-ui/number-input";
import { Link } from "@leafygreen-ui/typography";
import { SettingRow } from "./SettingRow";
import { ConfigPair, ConfigOption } from "./ConfigPair";
import "./AdditionalSettingsContent.css";

export interface AdditionalSettingsContentProps {
  mongoVersion: string;
  setMongoVersion: (v: string) => void;
  cloudBackup: boolean;
  setCloudBackup: (v: boolean) => void;
}

const MONGO_VERSIONS = ["MongoDB 5.0", "MongoDB 6.0", "MongoDB 7.0", "MongoDB 8.0"];
const TLS_VERSIONS = ["TLS 1.0 and above", "TLS 1.1 and above", "TLS 1.2 and above", "TLS 1.3 and above"];
const WRITE_CONCERNS = ["1", "2", "Majority"];

export function AdditionalSettingsContent({
  mongoVersion,
  setMongoVersion,
  cloudBackup,
  setCloudBackup,
}: AdditionalSettingsContentProps) {
  const [continuousBackup, setContinuousBackup] = useState(false);
  const [termination, setTermination] = useState(false);
  const [sharding, setSharding] = useState(false);
  const [biConnector, setBiConnector] = useState(false);
  const [encryptionKeys, setEncryptionKeys] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [oplogWindow, setOplogWindow] = useState("24");
  const [tlsVersion, setTlsVersion] = useState("TLS 1.2 and above");
  const [requireIndexes, setRequireIndexes] = useState(false);
  const [serverSideJs, setServerSideJs] = useState(false);
  const [writeConcern, setWriteConcern] = useState("Majority");
  const [maxTxnLifetime, setMaxTxnLifetime] = useState("60");
  const [fastDiskPrewarm, setFastDiskPrewarm] = useState(false);

  return (
    <div className="additionalSettings">
      {/* Version */}
      <div className="additionalSettings-versionRow">
        <div className="additionalSettings-versionText">
          <p className="additionalSettings-versionTitle">Select a Version</p>
          <p className="additionalSettings-versionDesc">All clusters launch with the WiredTiger™ storage engine.</p>
        </div>
        <div className="additionalSettings-versionControl">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Select aria-label="MongoDB Version" value={mongoVersion} onChange={setMongoVersion} size="small">
            {MONGO_VERSIONS.map((v) => (
              // @ts-ignore - React 19 polymorphic type mismatch
              <Option key={v} value={v}>
                {v}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Cloud Backup */}
      <SettingRow
        label="Turn on Cloud Backup"
        badge="(M2 and up)"
        description={
          <>
            Snapshots are taken automatically and stored according to your backup and retention policy. Meets
            recovery point objective (RPO) of 6 hours by default, configurable down to 1 hour. You can disable
            backups at any time.{" "}
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Link as="button" hideExternalIcon>
              Learn more about backup options.
            </Link>
            <br />
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Link as="button" hideExternalIcon>
              Pricing Varies
            </Link>
          </>
        }
      >
        <Toggle checked={cloudBackup} onChange={setCloudBackup} aria-label="Turn on Cloud Backup" />
      </SettingRow>

      {cloudBackup && (
        <div className="additionalSettings-continuousBackup">
          <div className="additionalSettings-continuousBackupText">
            <p className="additionalSettings-continuousBackupTitle">Continuous Cloud Backup</p>
            <p className="additionalSettings-continuousBackupDesc">
              This additional option also records the full oplog for a configured window, permitting a restore to
              any{" "}
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Link as="button" hideExternalIcon>
                point in time
              </Link>{" "}
              within that window. Meets recovery point objective (RPO) of 1 minute.
            </p>
          </div>
          <div className="additionalSettings-continuousBackupControl">
            <Toggle
              checked={continuousBackup}
              onChange={setContinuousBackup}
              aria-label="Continuous Cloud Backup"
            />
          </div>
        </div>
      )}

      {/* Termination Protection */}
      <SettingRow
        label="Termination Protection"
        description={
          <>
            When enabled, prevent any user from accidentally deleting this cluster. Termination protection will need
            to be disabled before this cluster can be deleted.{" "}
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Link as="button" hideExternalIcon>
              Learn more.
            </Link>
          </>
        }
      >
        <Toggle checked={termination} onChange={setTermination} aria-label="Termination Protection" />
      </SettingRow>

      {/* Advanced Settings divider */}
      <div className="additionalSettings-advancedDivider">
        <p className="additionalSettings-advancedLabel">Advanced Settings</p>
      </div>

      {/* Sharding */}
      <SettingRow
        label="Shard your cluster"
        badge="(M30 and up)"
        topBorder={false}
        description={
          <>
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Link as="button" hideExternalIcon>
              Sharding
            </Link>{" "}
            supports high throughput and large datasets, and can be increased as data requirements grow. Sharded
            clusters cannot be converted to{" "}
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Link as="button" hideExternalIcon>
              replica sets
            </Link>
            .
          </>
        }
      >
        <Toggle checked={sharding} onChange={setSharding} aria-label="Shard your cluster" />
      </SettingRow>

      {/* BI Connector */}
      <SettingRow
        label="Enable Business Intelligence Connector"
        badge="(M10 and up)"
        description={
          <>
            The{" "}
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Link as="button" hideExternalIcon>
              BI Connector
            </Link>{" "}
            allows you to visualize your data on relational business intelligence tools (e.g. Tableau, MicroStrategy,
            Qlik).
            <br />
            <span className="additionalSettings-biPricing">BI Connector pricing for M30 &nbsp; $3.82</span>
            <span className="additionalSettings-biPricingSub">
              /day for sustained monthly usage or $10.82/day, up to $116.28/month
            </span>
          </>
        }
      >
        <Toggle checked={biConnector} onChange={setBiConnector} aria-label="Enable Business Intelligence Connector" />
      </SettingRow>

      {/* Encryption */}
      <SettingRow
        label="Manage your own encryption keys"
        badge="(M10 and up)"
        description={
          <>
            By default, all MongoDB Atlas cluster storage and backups are encrypted at rest.{" "}
            <span className="additionalSettings-bold">
              Enable this feature to configure an{" "}
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Link as="button" hideExternalIcon>
                additional layer of encryption
              </Link>{" "}
              using your configured AWS KMS, Azure Key Vault, or Google Cloud KMS.
            </span>
          </>
        }
      >
        <Toggle checked={encryptionKeys} onChange={setEncryptionKeys} aria-label="Manage your own encryption keys" />
      </SettingRow>

      {/* More Configuration Options */}
      <div className="additionalSettings-more">
        <button type="button" onClick={() => setMoreOpen((v) => !v)} className="additionalSettings-moreToggle">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Icon glyph={moreOpen ? "ChevronUp" : "ChevronDown"} fill={palette.gray.dark1} />
          More Configuration Options
        </button>

        {moreOpen && (
          <div className="additionalSettings-morePanel">
            <ConfigPair>
              <ConfigOption
                title="Set Minimum Oplog Window"
                description={
                  <>
                    Set the minimum window of this cluster's oplog.
                    <br />
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Link as="button" hideExternalIcon>
                      View documentation.
                    </Link>
                  </>
                }
              >
                <div className="additionalSettings-numberInput">
                  <NumberInput
                    aria-label="Set Minimum Oplog Window"
                    unit="Hours"
                    value={oplogWindow}
                    onChange={(e) => setOplogWindow(e.target.value)}
                  />
                </div>
                <p className="additionalSettings-oplogHelp">
                  Atlas automatically adjusts the oplog size of your cluster to ensure optimal performance and cost
                  based on MongoDB best practices.{" "}
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Link as="button" hideExternalIcon>
                    Read more about oplog configuration.
                  </Link>
                </p>
              </ConfigOption>
              <ConfigOption
                title="Set Minimum TLS Protocol Version"
                divider={false}
                description={
                  <>
                    Configure this cluster to only accept connections using selected protocols below.{" "}
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Link as="button" hideExternalIcon>
                      View documentation.
                    </Link>
                  </>
                }
              >
                <div className="additionalSettings-selectWrap">
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Select aria-label="Set Minimum TLS Protocol Version" value={tlsVersion} onChange={setTlsVersion} size="small">
                    {TLS_VERSIONS.map((v) => (
                      // @ts-ignore - React 19 polymorphic type mismatch
                      <Option key={v} value={v}>
                        {v}
                      </Option>
                    ))}
                  </Select>
                </div>
              </ConfigOption>
            </ConfigPair>

            <ConfigPair>
              <ConfigOption
                title="Require Indexes for All Queries"
                description={
                  <>
                    Do not run queries that require a collection scan; return an error instead.{" "}
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Link as="button" hideExternalIcon>
                      View documentation.
                    </Link>
                  </>
                }
              >
                <Toggle checked={requireIndexes} onChange={setRequireIndexes} aria-label="Require Indexes for All Queries" />
              </ConfigOption>
              <ConfigOption
                title="Allow Server-Side JavaScript"
                divider={false}
                description={
                  <>
                    Operations that perform server-side execution of JavaScript are allowed (e.g.{" "}
                    <code className="additionalSettings-code">$where</code> query operator,{" "}
                    <code className="additionalSettings-code">mapReduce</code>, etc.).{" "}
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Link as="button" hideExternalIcon>
                      View documentation.
                    </Link>
                  </>
                }
              >
                <Toggle checked={serverSideJs} onChange={setServerSideJs} aria-label="Allow Server-Side JavaScript" />
              </ConfigOption>
            </ConfigPair>

            <ConfigPair>
              <ConfigOption
                title="Default Write Concern"
                description={
                  <>
                    Set the default write concern of this cluster. Starting in MongoDB 5.0, the global default write
                    concern defaults to "majority".{" "}
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Link as="button" hideExternalIcon>
                      View documentation.
                    </Link>
                  </>
                }
              >
                <div className="additionalSettings-selectWrap additionalSettings-selectWrap--wide">
                  {/* @ts-ignore - React 19 polymorphic type mismatch */}
                  <Select aria-label="Default Write Concern" value={writeConcern} onChange={setWriteConcern} size="small">
                    {WRITE_CONCERNS.map((v) => (
                      // @ts-ignore - React 19 polymorphic type mismatch
                      <Option key={v} value={v}>
                        {v}
                      </Option>
                    ))}
                  </Select>
                </div>
              </ConfigOption>
              <ConfigOption
                title="Maximum Transaction Lifetime"
                divider={false}
                description={
                  <>
                    Specify the maximum lifetime of multi-document transactions.{" "}
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Link as="button" hideExternalIcon>
                      View documentation.
                    </Link>
                  </>
                }
              >
                <div className="additionalSettings-numberInput">
                  <NumberInput
                    aria-label="Maximum Transaction Lifetime"
                    unit="Seconds"
                    value={maxTxnLifetime}
                    onChange={(e) => setMaxTxnLifetime(e.target.value)}
                  />
                </div>
              </ConfigOption>
            </ConfigPair>

            <div className="additionalSettings-halfWidth">
              <ConfigOption
                title="Fast Disk Pre-Warming"
                divider={false}
                description={
                  <>
                    Disk pre-warming occurs when nodes are added to the cluster or replaced (e.g. following routine
                    maintenance). Enabling fast disk pre-warming may prevent secondary reads from nodes experiencing
                    disk pre-warming.{" "}
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Link as="button" hideExternalIcon>
                      View documentation.
                    </Link>
                  </>
                }
              >
                <Toggle checked={fastDiskPrewarm} onChange={setFastDiskPrewarm} aria-label="Fast Disk Pre-Warming" />
              </ConfigOption>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
