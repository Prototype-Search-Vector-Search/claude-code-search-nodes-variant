import Modal from "@leafygreen-ui/modal";
import { Button } from "@leafygreen-ui/button";
import { H3, Body } from "@leafygreen-ui/typography";
import { regionByCode } from "./regionData";
import "./RemoveRegionsModal.css";

export interface RemoveRegionsModalProps {
  electableRegion: string;
  nodeTypes: string[];
  onCancel: () => void;
  onConfirm: () => void;
}

export function RemoveRegionsModal({ electableRegion, nodeTypes, onCancel, onConfirm }: RemoveRegionsModalProps) {
  const r = regionByCode(electableRegion);
  return (
    <Modal
      open
      setOpen={(next) => {
        if (!next) onCancel();
      }}
      size="small"
    >
      <div className="removeRegionsModal">
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <H3>Remove additional regions?</H3>
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Body className="removeRegionsModal-desc">
          If you apply this change, only the highest priority electable node region,{" "}
          <span className="removeRegionsModal-bold">{r?.name ?? electableRegion}</span>, will remain and be applied
          to <span className="removeRegionsModal-bold">{nodeTypes.join(", ").toUpperCase()}</span>.
        </Body>
        <div className="removeRegionsModal-actions">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Button variant="default" onClick={onCancel}>
            Cancel
          </Button>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Button variant="primary" onClick={onConfirm}>
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
}
