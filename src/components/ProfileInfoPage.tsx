import { useState } from "react";
import { Button } from "@leafygreen-ui/button";
import { Banner } from "@leafygreen-ui/banner";
import { TextInput } from "@leafygreen-ui/text-input";
import { Select, Option } from "@leafygreen-ui/select";
import { AccountLayout } from "./AccountLayout";
import "./ProfileInfoPage.css";

const POSITIONS = [
  "Software Engineer",
  "Engineering Manager",
  "Product Manager",
  "Designer",
  "Data Scientist",
  "DevOps / SRE",
  "Executive",
  "Student",
  "Other",
];

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "India",
  "Australia",
  "Brazil",
  "Japan",
  "Other",
];

export function ProfileInfoPage() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <AccountLayout activeItem="Profile Info">
      <div className="profileInfo-content">
        <h1 className="profileInfo-title">Profile Info</h1>

        {/* @ts-ignore - React 19 polymorphic type mismatch */}
        <Banner variant="info" className="profileInfo-banner">
          <strong>Your Login Info and Personal Info are managed by your company's identity provider.</strong> Please
          contact your company's administrator to request changes.
        </Banner>

        {/* Email card */}
        <div className="profileInfo-card">
          <p className="profileInfo-cardTitle">Email Address</p>
          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <TextInput aria-label="Email Address" value="michael.waltzer@mongodb.com" disabled onChange={() => {}} />
        </div>

        {/* Profile card */}
        <div className="profileInfo-card">
          <p className="profileInfo-cardTitle">Profile</p>

          <div className="profileInfo-nameRow">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <TextInput label="First Name" aria-label="First Name" value="Michael" disabled onChange={() => {}} />
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <TextInput label="Last Name" aria-label="Last Name" value="Waltzer" disabled onChange={() => {}} />
          </div>

          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <TextInput
            label="Company (optional)"
            aria-label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="profileInfo-field"
          />

          <div className="profileInfo-field">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Select
              label="Position (optional)"
              aria-label="Position"
              placeholder="Select Position"
              value={position}
              onChange={setPosition}
            >
              {POSITIONS.map((p) => (
                // @ts-ignore - React 19 polymorphic type mismatch
                <Option key={p} value={p}>
                  {p}
                </Option>
              ))}
            </Select>
          </div>

          <div className="profileInfo-field">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Select
              label="Country (optional)"
              aria-label="Country"
              placeholder="Select Country"
              value={country}
              onChange={setCountry}
            >
              {COUNTRIES.map((c) => (
                // @ts-ignore - React 19 polymorphic type mismatch
                <Option key={c} value={c}>
                  {c}
                </Option>
              ))}
            </Select>
          </div>

          {/* @ts-ignore - React 19 polymorphic type mismatch */}
          <TextInput
            label="Phone Number (optional)"
            aria-label="Phone Number"
            placeholder="+#(###)###-#### or ###-###-####"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="profileInfo-field"
          />

          <div className="profileInfo-saveRow">
            {/* @ts-ignore - React 19 polymorphic type mismatch */}
            <Button disabled>Save Changes</Button>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
