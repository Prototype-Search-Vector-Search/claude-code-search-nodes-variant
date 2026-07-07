import Icon from "@leafygreen-ui/icon";
import { palette } from "@leafygreen-ui/palette";
import { RadioBoxGroup, RadioBox } from "@leafygreen-ui/radio-box-group";
import { Body, Link } from "@leafygreen-ui/typography";
import type { SearchTierClass } from "./tierData";
import { SEARCH_TIERS } from "./tierData";
import "./SearchTierActiveContent.css";

const SEARCH_CLASSES: SearchTierClass[] = ["Low-CPU", "High-CPU", "Storage-Optimized"];

export interface SearchTierActiveContentProps {
  searchClass: SearchTierClass;
  setSearchClass: (c: SearchTierClass) => void;
  selectedSearchTier: string;
  setSelectedSearchTier: (t: string) => void;
}

export function SearchTierActiveContent({
  searchClass,
  setSearchClass,
  selectedSearchTier,
  setSelectedSearchTier,
}: SearchTierActiveContentProps) {
  return (
    <div className="searchTierActive">
      {/* @ts-ignore - React 19 polymorphic type mismatch */}
      <Body>
        Hourly price is for <span className="searchTierActive-bold">1 Search Node</span> and may change depending on
        the number of Search Nodes configured.
      </Body>

      {/* Class selector */}
      <RadioBoxGroup
        className="searchTierActive-classRow"
        value={searchClass}
        onChange={(e) => setSearchClass(e.target.value as SearchTierClass)}
      >
        {SEARCH_CLASSES.map((cls) => (
          <RadioBox key={cls} value={cls}>
            {cls}
          </RadioBox>
        ))}
      </RadioBoxGroup>

      {/* Tier table */}
      <div className="searchTierActive-table">
        <div className="searchTierActive-header">
          {["Tier", "RAM", "Storage", "vCPU", "Price"].map((h, i) => (
            <div key={h} className={i === 0 ? "searchTierActive-headerCell-left" : "searchTierActive-headerCell-right"}>
              {h}
            </div>
          ))}
        </div>

        {SEARCH_TIERS.map((t) => {
          if (t.name === selectedSearchTier) {
            return (
              <div key={t.name} className="searchTierActive-expanded">
                <div className="searchTierActive-summaryRow">
                  <div className="searchTierActive-summaryName">
                    {/* @ts-ignore - React 19 polymorphic type mismatch */}
                    <Icon glyph="CheckmarkWithCircle" fill={palette.green.dark1} size={14} />
                    {t.name}
                  </div>
                  <div className="searchTierActive-summaryCell">{t.ram}</div>
                  <div className="searchTierActive-summaryCell">{t.storage}</div>
                  <div className="searchTierActive-summaryCell">{t.vcpu}</div>
                  <div className="searchTierActive-summaryPrice">
                    <span className="searchTierActive-priceFrom">from </span>
                    <span className="searchTierActive-priceValue">{t.price}</span>
                  </div>
                </div>
                <div className="searchTierActive-details">
                  <div className="searchTierActive-detailsLabels">
                    <div className="searchTierActive-detailsLabelCell">Search Optimized Disk</div>
                    <div className="searchTierActive-detailsLabelCell">Additional Info</div>
                  </div>
                  <div className="searchTierActive-detailsContent">
                    <div className="searchTierActive-detailsContentCell">
                      {t.readIops} Read IOPS
                      <br />
                      {t.writeIops} Write IOPS
                    </div>
                    <div className="searchTierActive-detailsContentCell">
                      Up to 10 Gigabit network performance
                      <br />
                      {/* @ts-ignore - React 19 polymorphic type mismatch */}
                      <Link as="button" hideExternalIcon arrowAppearance="persist">
                        Learn more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <button
              type="button"
              key={t.name}
              onClick={() => setSelectedSearchTier(t.name)}
              className="searchTierActive-row"
            >
              <div className="searchTierActive-rowName">{t.name}</div>
              <div className="searchTierActive-summaryCell">{t.ram}</div>
              <div className="searchTierActive-summaryCell">{t.storage}</div>
              <div className="searchTierActive-summaryCell">{t.vcpu}</div>
              <div className="searchTierActive-summaryPrice">
                <span className="searchTierActive-priceFrom">from </span>
                <span className="searchTierActive-priceValue">{t.price}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
