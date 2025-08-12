import { useState } from "react";
import "../CSS/CreateUser.css";

export default function CreateUser({ onCreated }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "user"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        alert("Failed to create user");
        return;
      }

      alert("User created successfully!");
      onCreated();
    } catch (err) {
      console.error(err);
      alert("Error creating user");
    }
  };

  return (
    <div className="create-container">
      <h2>Create User</h2>
      <form onSubmit={handleCreate}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Create</button>
      </form>
      <button className="back-btn" onClick={onCreated}>
        Back to Login
      </button>
    </div>
  );
}
