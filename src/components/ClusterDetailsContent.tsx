import type { Dispatch, SetStateAction } from "react";
import Icon from "@leafygreen-ui/icon";
import { palette } from "@leafygreen-ui/palette";
import { IconButton } from "@leafygreen-ui/icon-button";
import { TextInput } from "@leafygreen-ui/text-input";
import { Badge } from "@leafygreen-ui/badge";
import { Link } from "@leafygreen-ui/typography";
import type { Tag } from "./types";
import "./ClusterDetailsContent.css";

export interface ClusterDetailsContentProps {
  name: string;
  setName: (v: string) => void;
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
  addTag: () => void;
}

export function ClusterDetailsContent({ name, setName, tags, setTags, addTag }: ClusterDetailsContentProps) {
  return (
    <div className="clusterDetails">
      {/* Cluster Name */}
      <div className="clusterDetails-nameRow">
        <div className="clusterDetails-nameLabelCol">
          <p className="clusterDetails-nameLabel">Cluster Name</p>
          <p className="clusterDetails-nameHint">
            One time only: once your cluster is created, you won&rsquo;t be able to change its name.
          </p>
        </div>
        <div className="clusterDetails-nameInputCol">
          <TextInput
            aria-label="Cluster Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="clusterDetails-nameHint">Cluster names can only contain ASCII letters, numbers, and hyphens.</p>
        </div>
      </div>

      {/* Apply Tags heading */}
      <div className="clusterDetails-tagsHeading">
        <div className="clusterDetails-tagsHeadingRow">
          <p className="clusterDetails-tagsTitle">Apply Tags to Cluster</p>
          <Badge variant="green">NEW</Badge>
        </div>
        <p className="clusterDetails-tagsDesc">
          Use tags to efficiently label and categorize your clusters. Reorder the tags to change the order they are
          displayed.{" "}
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Link as="button" hideExternalIcon>
            Learn more.
          </Link>
        </p>
      </div>

      {/* Tag editor table */}
      <div className="clusterDetails-tagTable">
        <div className="clusterDetails-tagTableHeader">
          <div className="clusterDetails-tagTableHeaderCell">
            Key {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="Unsorted" fill={palette.black} size={16} />
          </div>
          <div className="clusterDetails-tagTableHeaderCell clusterDetails-tagTableHeaderCell--bordered">
            Value {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon glyph="Unsorted" fill={palette.black} size={16} />
          </div>
          <div className="clusterDetails-tagTableHeaderCell clusterDetails-tagTableHeaderCell--bordered">Actions</div>
        </div>

        {tags.map((tag) => (
          <div key={tag.id} className="clusterDetails-tagRow">
            <div className="clusterDetails-tagCell">
              <TextInput
                aria-label="Tag key"
                value={tag.key}
                placeholder="Key"
                onChange={(e) =>
                  setTags((rows) => rows.map((r) => (r.id === tag.id ? { ...r, key: e.target.value } : r)))
                }
              />
            </div>
            <div className="clusterDetails-tagCell clusterDetails-tagCell--bordered">
              <TextInput
                aria-label="Tag value"
                value={tag.value}
                placeholder="Value"
                onChange={(e) =>
                  setTags((rows) => rows.map((r) => (r.id === tag.id ? { ...r, value: e.target.value } : r)))
                }
              />
            </div>
            <div className="clusterDetails-tagActionsCell">
              {/* @ts-ignore - React 19 polymorphic type mismatch */}
              <IconButton
                aria-label="Remove tag"
                onClick={() => setTags((rows) => rows.filter((r) => r.id !== tag.id))}
              >
                {/* @ts-ignore - React 19 polymorphic type mismatch */}
                <Icon glyph="Trash" />
              </IconButton>
            </div>
          </div>
        ))}

        <div className="clusterDetails-tagAddRow">
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <Link as="button" onClick={addTag} hideExternalIcon>
            + Add tag
          </Link>
          <div className="clusterDetails-tagAddCellBorder" />
          <div className="clusterDetails-tagAddCellBorder" />
        </div>
      </div>

      <div className="clusterDetails-tagCount">
        {tags.length} Tag{tags.length === 1 ? "" : "s"}
      </div>
    </div>
  );
}
