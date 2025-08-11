import { useState } from "react";
import CreateUser from "./CreateUser";
import "./Login.css";  // import the CSS file

export default function Login({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showCreateUser, setShowCreateUser] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: userId,
          password: password
        })
      });

      if (!res.ok) {
        alert("Login failed");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      onLogin(data.access_token);
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <div className="container">
      {showCreateUser ? (
        <CreateUser onCreated={() => setShowCreateUser(false)} />
      ) : (
        <div className="card">
          <h2 className="title">Login</h2>
          <form onSubmit={handleLogin} className="form">
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
            <button type="submit" className="button">Login</button>
          </form>
          <button
            onClick={() => setShowCreateUser(true)}
            className="button"
            style={{ backgroundColor: "#6c63ff" }}  // inline override for this one
          >
            Create User
          </button>
        </div>
      )}
    </div>
  );
}
