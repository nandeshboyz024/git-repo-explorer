export default function RepoList({ repos }) {
  return (
    <div style={{ padding: "10px" }}>
      {repos.map((repo) => (
        <div
          key={repo.id}
          style={{
            padding: 15,
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: 8,
            background: "#FFFFF0",
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>{repo.name}</h3>
            <span>⭐ {repo.stargazers_count}</span>
          </div>

          <p style={{ margin: "5px 0" }}>{repo.description || "No description available"}</p>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9em", color: "#555" }}>
            <span>Language: {repo.language || "N/A"}</span>
            <span>🕒 Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
