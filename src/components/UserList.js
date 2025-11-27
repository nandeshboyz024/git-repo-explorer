import { Link } from "react-router-dom";

export default function UserList({ users }) {
  return (
    <div  style={{ padding:"10px" }}>
      {users.map((user) => (
        <Link
          key={user.id}
          to={`/user/${user.login}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              padding: 10,
              border: "1px solid #ccc",
              margin: "10px 0",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <img
                src={user.avatar_url}
                width={50}
                height={50}
                style={{ borderRadius: "50%" }}
                alt=""
              />
              <h3 style={{ margin: 0 }}>{user.login}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
