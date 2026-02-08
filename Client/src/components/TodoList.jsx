import { useEffect, useState } from "react";
import api from "../api/api";

export function TodoList() {
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [loadingPending, setLoadingPending] = useState(true);
  const [loadingCompleted, setLoadingCompleted] = useState(true);
  const [actionMsg, setActionMsg] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  //Load pending todos
  const loadPending = async () => {
    setLoadingPending(true);
    try {
      const res = await api.get("/fetch-todos-info?status=false");
      setPendingTodos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch pending todos", err);
      setPendingTodos([]);
    } finally {
      setLoadingPending(false);
    }
  };

  // Load completed todos
  const loadCompleted = async () => {
    setLoadingCompleted(true);
    try {
      const res = await api.get("/fetch-todos-info?status=true");
      setCompletedTodos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch completed todos", err);
      setCompletedTodos([]);
    } finally {
      setLoadingCompleted(false);
    }
  };

  // Load all on mount
  useEffect(() => {
    loadPending();
    loadCompleted();
  }, []);

  // Toggle completion
  const toggleTodo = async (id) => {
    try {
      const res = await api.post("/mark-todo-complete", { todo_id: id });
      setActionMsg(res.data.message);
      loadPending();
      loadCompleted();
      setTimeout(() => setActionMsg(""), 2000);
    } catch (err) {
      console.error("Failed to toggle todo", err);
      setActionMsg("Failed to update todo");
      setTimeout(() => setActionMsg(""), 2000);
    }
  };

  // Start editing a todo
  const startEdit = (todo) => {
    setEditingTodo(todo.id);
    setEditTitle(todo.title);
    setEditDesc(todo.description);
    setEditStatus(todo.status);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTodo(null);
    setEditTitle("");
    setEditDesc("");
    setEditStatus(false);
  };

  // Submit updated todo
  const submitEdit = async () => {
    try {
      await api.put("/todos/update", {
        id: editingTodo,
        title: editTitle,
        description: editDesc,
        status: editStatus,
      });
      setActionMsg("Todo updated successfully");
      cancelEdit();
      loadPending();
      loadCompleted();
      setTimeout(() => setActionMsg(""), 2000);
    } catch (err) {
      console.error("Failed to update todo", err);
      setActionMsg("Failed to update todo");
      setTimeout(() => setActionMsg(""), 2000);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete("/todos/delete", { data: { id } });
      setActionMsg("Todo deleted successfully");
      loadPending();
      loadCompleted();
      setTimeout(() => setActionMsg(""), 2000);
    } catch (err) {
      console.error("Failed to delete todo", err);
      setActionMsg("Failed to delete todo");
      setTimeout(() => setActionMsg(""), 2000);
    }
  };

  // Render todo list
  const renderTodos = (list) =>
    list.map((t) => (
      <li
        key={t.id}
        style={{
          marginBottom: "12px",
          padding: "12px",
          borderRadius: "8px",
          backgroundColor: t.status ? "#f0f0f0" : "#fff",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {editingTodo === t.id ? (
          <div>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            />
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Description"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginBottom: "8px",
              }}
            />
            <label style={{ display: "block", marginBottom: "8px" }}>
              <input
                type="checkbox"
                checked={editStatus}
                onChange={(e) => setEditStatus(e.target.checked)}
                style={{ marginRight: "6px" }}
              />
              Completed
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={submitEdit}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: "16px" }}>{t.title}</b>
              <p style={{ margin: "4px 0" }}>{t.description}</p>
              <small style={{ color: "#555" }}>
                Created: {new Date(t.created_at).toLocaleString()}
              </small>
              <p
                style={{
                  fontWeight: "bold",
                  color: t.status ? "#4caf50" : "#ff9800",
                }}
              >
                {t.status ? "Completed" : "Pending"}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <button
                onClick={() => toggleTodo(t.id)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: t.status ? "#ff9800" : "#4caf50",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                {t.status ? "Uncomplete" : "Complete"}
              </button>
              <button
                onClick={() => startEdit(t)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#2196f3",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(t.id)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </li>
    ));

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        backgroundColor: "#fafafa",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Todo List
      </h2>

      {actionMsg && (
        <p
          style={{
            backgroundColor: "#dff0d8",
            color: "#3c763d",
            padding: "10px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          {actionMsg}
        </p>
      )}

      <h3 style={{ marginBottom: "12px", color: "#ff9800" }}>Pending Todos</h3>
      {loadingPending ? <p>Loading pending tasks...</p> : pendingTodos.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>{renderTodos(pendingTodos)}</ul>
      ) : (
        <p>No pending tasks</p>
      )}

      <h3 style={{ marginTop: "30px", marginBottom: "12px", color: "#4caf50" }}>
        Completed Todos
      </h3>
      {loadingCompleted ? <p>Loading completed tasks...</p> : completedTodos.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>{renderTodos(completedTodos)}</ul>
      ) : (
        <p>No completed tasks</p>
      )}
    </div>
  );
}
