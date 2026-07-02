import type { ReactNode } from "react";
import Icon from "@leafygreen-ui/icon";
import { palette } from "@leafygreen-ui/palette";
import { Link, Body } from "@leafygreen-ui/typography";
import "./SupportPlanContent.css";

export interface SupportPlanContentProps {
  plan: "basic" | "developer";
  setPlan: (p: "basic" | "developer") => void;
}

interface PlanCardProps {
  selected: boolean;
  onClick: () => void;
  name: string;
  price: string;
  sub?: string;
  description: string;
  features: ReactNode[];
}

function PlanCard({ selected, onClick, name, price, sub, description, features }: PlanCardProps) {
  return (
    <button type="button" onClick={onClick} className={`planCard ${selected ? "planCard--selected" : "planCard--unselected"}`}>
      <div className="planCard-header">
        <span className={`planCard-name ${selected ? "planCard-name--selected" : "planCard-name--unselected"}`}>{name}</span>
        <div className="planCard-priceCol">
          <span className="planCard-price">{price}</span>
          {sub && <span className="planCard-sub">{sub}</span>}
        </div>
      </div>
      <p className={`planCard-description ${selected ? "planCard-description--selected" : "planCard-description--unselected"}`}>
        {description}
      </p>
      <div className={`planCard-divider ${selected ? "planCard-divider--selected" : "planCard-divider--unselected"}`} />
      <div className="planCard-features">
        {features.map((f, i) => (
          <div key={i} className="planCard-feature">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Icon
              glyph="Checkmark"
              size={16}
              fill={selected ? palette.black : palette.gray.light1}
              className="planCard-featureIcon"
            />
            <span className={`planCard-featureText ${selected ? "planCard-featureText--selected" : "planCard-featureText--unselected"}`}>
              {f}
            </span>
          </div>
        ))}
      </div>
    </button>
  );
}

export function SupportPlanContent({ plan, setPlan }: SupportPlanContentProps) {
  return (
    <div className="supportPlan">
      {/* @ts-ignore - React 19 polymorphic type mismatch */}
      <Body className="supportPlan-intro">
        When you enable Support, all clusters and projects in MongoDB-Products-Team are covered and billed under a
        single plan. Your team gets direct access to MongoDB engineers for deeper technical support and faster SLAs
        across issues of all severity levels.
        <br />
        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Link as="button" hideExternalIcon>
          Learn about Support Plans.
        </Link>
      </Body>
      <div className="supportPlan-cards">
        <PlanCard
          selected={plan === "basic"}
          onClick={() => setPlan("basic")}
          name="Basic"
          price="Included"
          sub="Free"
          description="Recommended for early-stage applications or smaller projects that need essential support without advanced production response times."
          features={["Chat support (Monday-Friday)", "Online training at MongoDB University", "Docs, FAQ, Community Forums"]}
        />
        <PlanCard
          selected={plan === "developer"}
          onClick={() => setPlan("developer")}
          name="Developer"
          price="$49/month"
          description="Recommended for production workloads that require deeper technical support, faster SLAs, and 24/7 expert coverage."
          features={[
            "24/7 end-to-end database support and issue analysis via Case Portal",
            "Advice on database schemas, indexes, and performance optimization",
            <>
              First response within <span className="supportPlan-bold">8 hours</span>
            </>,
            "In-app Support (Monday-Friday)",
          ]}
        />
      </div>
    </div>
  );
}
