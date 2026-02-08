import { useState } from "react";
import api from "../api/api";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // toggle between login/register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("access_token", res.data.acess_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      alert("Login successful");
      location.reload();
    } catch (err) {
      setMessage(err.response?.status === 401 ? "Invalid credentials" : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await api.post("/register", { username, email, password });
      setMessage("Registration successful! You can now login.");
      setUsername("");
      setEmail("");
      setPassword("");
      setIsLogin(true); // switch to login after successful registration
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage("Email or username already exists");
      } else {
        setMessage("Registration failed");
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
        {/* Tabs */}
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px 0 0 8px",
              border: "none",
              backgroundColor: isLogin ? "#2575fc" : "#eee",
              color: isLogin ? "#fff" : "#333",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "0 8px 8px 0",
              border: "none",
              backgroundColor: !isLogin ? "#2575fc" : "#eee",
              color: !isLogin ? "#fff" : "#333",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Register
          </button>
        </div>

        {/* Message */}
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

        {/* Form */}
        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          {!isLogin && (
            <input
              type="text"
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
          )}
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
            {loading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
