import { useState } from "react";
import api from "../api/api";

export function CreateTodo({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await api.post("/create-todos", { title, description });
      setTitle("");
      setDescription("");
      setMessage("Task created successfully!");
      onCreated(); // refresh todos list
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to create task");
      setTimeout(() => setMessage(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "30px auto",
        padding: "25px 30px",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2575fc" }}>
        Create Todo
      </h3>

      {message && (
        <p
          style={{
            textAlign: "center",
            padding: "10px",
            borderRadius: "6px",
            backgroundColor: message.includes("success") ? "#dff0d8" : "#f44336",
            color: message.includes("success") ? "#3c763d" : "#fff",
            marginBottom: "15px",
          }}
        >
          {message}
        </p>
      )}

      <form style={{ display: "flex", flexDirection: "column", gap: "15px" }} onSubmit={submit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
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
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={4}
          style={{
            padding: "12px 15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            outline: "none",
            resize: "vertical",
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
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}
