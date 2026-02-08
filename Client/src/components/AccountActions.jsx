import api from "../api/api";

export function AccountActions() {
  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.clear();
      location.reload();
    }
  };

  const deleteProfile = async () => {
    if (!window.confirm("Delete profile permanently?")) return;
    try {
      await api.delete("/delete-profile");
      localStorage.clear();
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        margin: "20px 0",
      }}
    >
      <button
        onClick={logout}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#2575fc",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <button
        onClick={deleteProfile}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#f44336",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Delete Profile
      </button>
    </div>
  );
}
