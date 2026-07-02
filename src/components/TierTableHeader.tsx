import "./TierTable.css";

export function TierTableHeader() {
  const headers = ["Tier", "RAM", "Storage", "vCPU", "Base Price"];
  return (
    <div className="tierTable-header">
      {headers.map((h, i) => (
        <div key={h} className={i === 0 ? "tierTable-headerCell-left" : "tierTable-headerCell-right"}>
          {h}
        </div>
      ))}
    </div>
  );
}
