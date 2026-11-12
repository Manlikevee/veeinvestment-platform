export function RiskMeter({ level = 2, label = "Moderate" }) {
  return (
    <span className="risk-tag" title={`Risk classification: ${label}`}>
      <span className="risk-dots" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((index) => (
          <i key={index} className={index <= level ? "is-on" : ""} />
        ))}
      </span>
      {label} risk
    </span>
  );
}
