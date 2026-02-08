import { useState } from "react";
import api from "../api/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await api.post("/register", { username, email, password });
      setMessage("Registration successful. Please login.");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage("Email or username already exists");
      } else {
        setMessage("Registration failed. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px 25px",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>
          Register
        </h2>

        {message && (
          <p
            style={{
              color: message.includes("successful") ? "#3c763d" : "#fff",
              backgroundColor: message.includes("successful") ? "#dff0d8" : "#f44336",
              padding: "10px",
              borderRadius: "6px",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              outline: "none",
              transition: "all 0.2s",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              outline: "none",
              transition: "all 0.2s",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              outline: "none",
              transition: "all 0.2s",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#2575fc",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px", color: "#555", fontSize: "14px" }}>
          Already have an account? <a href="/login" style={{ color: "#2575fc", textDecoration: "none" }}>Login</a>
        </p>
      </div>
    </div>
  );
}
