import { useEffect, useRef } from "react";
import Icon from "@leafygreen-ui/icon";
import { Button } from "@leafygreen-ui/button";
import { Banner } from "@leafygreen-ui/banner";
import { Link } from "@leafygreen-ui/typography";
import type { NodeState } from "./types";
import "./NodeRow.css";

interface CountInputProps {
  count: number;
  onCountChange: (delta: number) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

function CountInput({ count, onCountChange, inputRef }: CountInputProps) {
  return (
    <div className="nodeRow-countInput nodeRow-countInput--stepper">
      <input
        ref={inputRef}
        type="number"
        min={1}
        aria-label="Node count"
        value={count}
        onChange={(e) => onCountChange(parseInt(e.target.value, 10) - count)}
        className="nodeRow-countInputField"
      />
      <div className="nodeRow-countInputArrows">
        <button
          type="button"
          aria-label="Increase node count"
          onClick={() => onCountChange(1)}
          className="nodeRow-countInputArrow"
        >
          <svg width="7" height="5" viewBox="0 0 8 5" fill="none">
            <path d="M1 4l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Decrease node count"
          disabled={count <= 1}
          onClick={() => onCountChange(-1)}
          className="nodeRow-countInputArrow"
        >
          <svg width="7" height="5" viewBox="0 0 8 5" fill="none">
            <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export interface NodeRowProps {
  label: string;
  description: string;
  state: NodeState;
  onAdd: () => void;
  onCountChange: (delta: number) => void;
  onDelete: () => void;
  showInfo?: boolean;
  learnMore?: boolean;
  nodeType?: "readOnly" | "analytics" | "search";
  onClusterTierLink?: () => void;
}

export function NodeRow({
  label,
  description,
  state,
  onAdd,
  onCountChange,
  onDelete,
  showInfo,
  learnMore,
  nodeType,
  onClusterTierLink,
}: NodeRowProps) {
  const boldPart = label.split(" for ")[0];
  const restPart = label.includes(" for ") ? ` for ${label.split(" for ")[1]}` : "";
  const isSearch = nodeType === "search";
  const workloadLabel = boldPart.split(" ")[0].toLowerCase();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.enabled) {
      inputRef.current?.focus();
    }
  }, [state.enabled]);

  return (
    <div className="nodeRow">
      <div className="nodeRow-grid">
        {/* Node type column */}
        <div className="nodeRow-labelCol">
          <p className="nodeRow-label">
            <span className="nodeRow-labelBold">{boldPart}</span>
            {restPart}
          </p>
          <p className="nodeRow-description">{description}</p>
          {learnMore && (
            // @ts-ignore - React 19 polymorphic type mismatch
            <Link arrowAppearance="persist" hideExternalIcon className="nodeRow-learnMore">
              Learn more
            </Link>
          )}
        </div>

        {/* Nodes column */}
        <div className="nodeRow-nodesCol">
          {state.enabled ? (
            <CountInput count={state.count} onCountChange={onCountChange} inputRef={inputRef} />
          ) : (
            <span className="nodeRow-zero">0</span>
          )}
        </div>

        {/* Actions column */}
        <div className="nodeRow-actionsCol">
          {state.enabled ? (
            // @ts-ignore - React 19 polymorphic type mismatch
            <Button size="xsmall" aria-label="Delete" onClick={onDelete}>
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <Icon glyph="Trash" />
            </Button>
          ) : (
            // @ts-ignore - React 19 polymorphic type mismatch
            <Button size="xsmall" leftGlyph={<Icon glyph="Plus" />} onClick={onAdd}>
              ADD
            </Button>
          )}
        </div>
      </div>

      {/* Info box — not shown for readOnly */}
      {state.enabled && showInfo && nodeType !== "readOnly" && (
        <Banner variant="info" className="nodeRow-infoBanner">
          Continue to{" "}
          {isSearch ? (
            // @ts-ignore - React 19 polymorphic type mismatch
            <Link as="button" onClick={onClusterTierLink} hideExternalIcon className="nodeRow-infoBannerLink">
              Cluster Tier
            </Link>
          ) : (
            <span className="nodeRow-infoBannerLink">Cluster Tier</span>
          )}{" "}
          to select an appropriate tier for your {workloadLabel} workload.
        </Banner>
      )}
    </div>
  );
}
