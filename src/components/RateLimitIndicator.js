export default function RateLimitIndicator({ rate }) {
  if (!rate) return null;

  const percent = (rate.remaining / rate.limit) * 100;

  return (
    <div style={{ background: "#222", padding: "6px", borderRadius: "6px", color: "white" }}>
      <div style={{ width: "100%", background: "#444", borderRadius: "4px" }}>
        <div
          style={{
            width: `${percent}%`,
            height: "6px",
            background: percent < 20 ? "red" : "limegreen",
            borderRadius: "4px"
          }}
        />
      </div>

      <p style={{ marginTop: "4px", fontSize: "12px" }}>
        Requests Left: {rate.remaining} / {rate.limit}
      </p>
    </div>
  );
}
