import React from "react";

export default function LogoutButton({ onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px"
      }}
    >
      Logout
    </button>
  );
}
