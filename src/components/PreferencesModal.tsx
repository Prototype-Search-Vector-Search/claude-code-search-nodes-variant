import { useState } from "react";
import Modal from "@leafygreen-ui/modal";
import { Button } from "@leafygreen-ui/button";
import { Combobox, ComboboxOption } from "@leafygreen-ui/combobox";
import "./PreferencesModal.css";

export interface PreferencesModalProps {
  onCancel: () => void;
  onSave: () => void;
}

const DATA_TYPES = ["Documents", "Time Series", "Vector", "Geospatial", "Graph"];
const ARCHITECTURAL_MODELS = ["Microservices", "Monolithic", "Serverless", "Event-Driven"];
const PROGRAMMING_LANGUAGES = ["JavaScript / TypeScript", "Python", "Java", "C#", "Go", "Ruby", "PHP", "Rust"];

export function PreferencesModal({ onCancel, onSave }: PreferencesModalProps) {
  const [dataTypes, setDataTypes] = useState<string[]>([]);
  const [architecturalModels, setArchitecturalModels] = useState<string[]>([]);
  const [primaryLanguage, setPrimaryLanguage] = useState<string | null>(null);

  const canSave = dataTypes.length > 0 || architecturalModels.length > 0 || primaryLanguage !== null;

  return (
    <Modal open setOpen={(next) => { if (!next) onCancel(); }} size="large">
      <div className="preferencesModal">
        <p className="preferencesModal-title">Preferences</p>
        <p className="preferencesModal-description">
          To customize tools and resources shown, set your preferences below.
        </p>

        <div className="preferencesModal-field">
          <span className="preferencesModal-label">Data Types</span>
          <span className="preferencesModal-hint">You can choose as many as you want</span>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Combobox
            multiselect
            value={dataTypes}
            onChange={setDataTypes}
            placeholder="Select"
            aria-label="Data Types"
            clearable={false}
          >
            {DATA_TYPES.map((type) => (
              // @ts-ignore - React 19 polymorphic type mismatch
              <ComboboxOption key={type} value={type} displayName={type} />
            ))}
          </Combobox>
        </div>

        <div className="preferencesModal-field">
          <span className="preferencesModal-label">Application Architectural Models</span>
          <span className="preferencesModal-hint">You can choose as many as you want</span>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Combobox
            multiselect
            value={architecturalModels}
            onChange={setArchitecturalModels}
            placeholder="Select"
            aria-label="Application Architectural Models"
            clearable={false}
          >
            {ARCHITECTURAL_MODELS.map((model) => (
              // @ts-ignore - React 19 polymorphic type mismatch
              <ComboboxOption key={model} value={model} displayName={model} />
            ))}
          </Combobox>
        </div>

        <div className="preferencesModal-field">
          <span className="preferencesModal-label">Primary Programming Language</span>
          <span className="preferencesModal-hint">Select the language you are primarily working with</span>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Combobox
            value={primaryLanguage}
            onChange={setPrimaryLanguage}
            placeholder="Select"
            aria-label="Primary Programming Language"
            clearable={false}
          >
            {PROGRAMMING_LANGUAGES.map((language) => (
              // @ts-ignore - React 19 polymorphic type mismatch
              <ComboboxOption key={language} value={language} displayName={language} />
            ))}
          </Combobox>
        </div>

        <div className="preferencesModal-actions">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Button variant="default" onClick={onCancel}>
            Cancel
          </Button>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Button variant="primary" disabled={!canSave} onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
