import { useEffect, useState } from "react";
import api from "../api/api";

export function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/fetch-user-info")
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!user)
    return (
      <p
        style={{
          textAlign: "center",
          fontSize: "16px",
          color: "#555",
          marginTop: "50px",
        }}
      >
        Loading user...
      </p>
    );

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "25px 30px",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#2575fc",
        }}
      >
        User Profile
      </h3>

      <div style={{ lineHeight: "1.8", fontSize: "16px", color: "#333" }}>
        <p>
          <b>Username:</b> {user.username}
        </p>
        <p>
          <b>Email:</b> {user.email}
        </p>
        <p>
          <b>Joined:</b> {new Date(user.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
