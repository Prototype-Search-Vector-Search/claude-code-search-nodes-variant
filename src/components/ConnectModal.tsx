import type { ReactNode } from "react";
import Modal from "@leafygreen-ui/modal";
import { Badge } from "@leafygreen-ui/badge";
import { Button } from "@leafygreen-ui/button";
import Icon from "@leafygreen-ui/icon";
import type { GlyphName } from "@leafygreen-ui/icon";
import { Link } from "@leafygreen-ui/typography";
import "./ConnectModal.css";

export interface ConnectModalProps {
  clusterName: string;
  onClose: () => void;
}

interface ConnectOption {
  icon: GlyphName;
  title: string;
  description: ReactNode;
  disabled?: boolean;
  badge?: string;
}

const APPLICATION_OPTIONS: ConnectOption[] = [
  {
    icon: "Code",
    title: "Drivers and Client Libraries",
    description: "Connect using MongoDB drivers (e.g. Node.js, Go) or popular libraries (e.g. Mongoose, Prisma)",
  },
];

const TOOL_OPTIONS: ConnectOption[] = [
  {
    icon: "Diagram",
    title: "Compass",
    description: "Explore, modify, and visualize your data with MongoDB's GUI",
  },
  {
    icon: "Shell",
    title: "Shell",
    description: "Quickly add & update data using MongoDB's Javascript command-line interface",
  },
  {
    icon: "Diagram2",
    title: "MongoDB for VS Code",
    description: "Work with your data in MongoDB directly from your VS Code environment",
  },
  {
    icon: "Diagram3",
    title: "BI Connector",
    description: "Get connection settings for Business Intelligence tools and visualize your data",
    disabled: true,
    badge: "DEPRECATING SEPTEMBER 2026",
  },
  {
    icon: "Database",
    title: "Atlas SQL",
    description: "Easily connect SQL tools to Atlas for data analysis and visualization",
  },
];

function ConnectOptionRow({ option }: { option: ConnectOption }) {
  return (
    <button type="button" className="connectModal-option" disabled={option.disabled}>
      <span className={`connectModal-optionIcon ${option.disabled ? "connectModal-optionIcon--disabled" : ""}`}>
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Icon glyph={option.icon} size={24} fill={option.disabled ? "#889397" : "#00a35c"} />
      </span>
      <span className="connectModal-optionBody">
        <span className="connectModal-optionTitleRow">
          <span className="connectModal-optionTitle">{option.title}</span>
          {option.disabled && (
            // @ts-ignore - React 19 polymorphic type mismatch
            <Link href="#" className="connectModal-optionEnableLink">
              (Enable the BI Connector)
            </Link>
          )}
          {option.badge && (
            // @ts-ignore - React 19 polymorphic type mismatch
            <Badge variant="yellow">{option.badge}</Badge>
          )}
        </span>
        <span className="connectModal-optionDescription">{option.description}</span>
      </span>
      {/* @ts-ignore - React 19 polymorphic type mismatch */}
      <Icon glyph="ChevronRight" size={16} fill="#889397" />
    </button>
  );
}

export function ConnectModal({ clusterName, onClose }: ConnectModalProps) {
  return (
    <Modal
      open
      setOpen={(next) => {
        if (!next) onClose();
      }}
      size="large"
    >
      <div className="connectModal">
        <p className="connectModal-title">Connect to {clusterName}</p>

        <div className="connectModal-steps">
          <div className="connectModal-step">
            <span className="connectModal-stepCircle connectModal-stepCircle--done">
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="Checkmark" size={14} fill="#ffffff" />
            </span>
            <span className="connectModal-stepLabel connectModal-stepLabel--done">Set up connection security</span>
          </div>
          <span className="connectModal-stepLine connectModal-stepLine--done" />
          <div className="connectModal-step">
            <span className="connectModal-stepCircle connectModal-stepCircle--active">2</span>
            <span className="connectModal-stepLabel connectModal-stepLabel--active">Choose a connection method</span>
          </div>
          <span className="connectModal-stepLine" />
          <div className="connectModal-step">
            <span className="connectModal-stepCircle">3</span>
            <span className="connectModal-stepLabel">Connect</span>
          </div>
        </div>

        <p className="connectModal-sectionTitle">Connect to your application</p>
        <div className="connectModal-optionList">
          {APPLICATION_OPTIONS.map((option) => (
            <ConnectOptionRow option={option} key={option.title} />
          ))}
        </div>

        <p className="connectModal-sectionTitle">Access your data through tools</p>
        <div className="connectModal-optionList">
          {TOOL_OPTIONS.map((option) => (
            <ConnectOptionRow option={option} key={option.title} />
          ))}
        </div>

        <div className="connectModal-actions">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Button variant="default" onClick={onClose}>
            Go Back
          </Button>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Button variant="default" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
