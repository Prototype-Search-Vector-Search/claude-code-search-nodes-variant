import Modal from "@leafygreen-ui/modal";
import { Button } from "@leafygreen-ui/button";
import { H3, Body } from "@leafygreen-ui/typography";
import type { DeleteTarget } from "./types";
import "./DeleteModal.css";

export interface DeleteModalProps {
  target: DeleteTarget;
  onCancel: () => void;
  onConfirm: () => void;
}

const DESCRIPTIONS: Record<DeleteTarget, string> = {
  readOnly: "Deleting all Read-only Nodes will remove your read-only tier configuration as well.",
  analytics: "Deleting all Analytics Nodes will remove your analytics tier configuration as well.",
  search: "Deleting all Search Nodes will remove your search tier configuration as well.",
};

export function DeleteModal({ target, onCancel, onConfirm }: DeleteModalProps) {
  return (
    <Modal
      open
      setOpen={(next) => {
        if (!next) onCancel();
      }}
      size="small"
    >
      <div className="deleteModal">
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <H3>Are you sure you want to delete?</H3>
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Body className="deleteModal-desc">{DESCRIPTIONS[target]}</Body>
        <div className="deleteModal-actions">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Button variant="default" onClick={onCancel}>
            Cancel
          </Button>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
