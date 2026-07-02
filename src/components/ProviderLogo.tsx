import imgAws from "../assets/aws.png";
import imgGoogleCloud from "../assets/gcp.png";
import imgAzureIcon from "../assets/azure.png";
import type { CloudProvider } from "./types";
import "./ProviderLogo.css";

export interface ProviderLogoProps {
  provider: CloudProvider;
  size?: "sm" | "lg";
}

export function ProviderLogo({ provider, size = "sm" }: ProviderLogoProps) {
  const sizeClass = size === "lg" ? "providerLogo--lg" : "providerLogo--sm";
  if (provider === "aws") {
    return <img src={imgAws} alt="AWS" className={`providerLogo providerLogo-aws ${sizeClass}`} />;
  }
  if (provider === "gcp") {
    return <img src={imgGoogleCloud} alt="GCP" className={`providerLogo providerLogo-gcp ${sizeClass}`} />;
  }
  return <img src={imgAzureIcon} alt="Azure" className={`providerLogo providerLogo-azure ${sizeClass}`} />;
}
