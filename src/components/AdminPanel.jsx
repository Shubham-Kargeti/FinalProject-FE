import React, { useState } from "react";
import {
  getClaimsByUserId,
  getUserById,
  deleteUserById,
  updateUserById,
} from "../api/adminapi";
import "../CSS/AdminPanel.css"

const AdminPanel = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [claims, setClaims] = useState([]);
  const [editData, setEditData] = useState({ username: "", email: "", password: "" });

  const handleGetUser = async () => {
    try {
      const data = await getUserById(userId);
      setUserData(data);
      setEditData({ username: data.username, email: data.email, password: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to fetch user");
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUserById(userId, editData);
      alert("User updated!");
      handleGetUser();
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUserById(userId);
      alert("User deleted!");
      setUserData(null);
      setClaims([]);
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  const handleGetClaims = async () => {
    try {
      const data = await getClaimsByUserId(userId);
      setClaims(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch claims");
    }
  };

  return (
    <div className="admin-panel-container">
      <h2>Admin Panel</h2>

      <div>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleGetUser}>Get User</button>
      </div>

      {userData && (
        <div className="user-details">
          <h3>User Details</h3>
          <p>ID: {userData.id}</p>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>

          <h4>Edit User</h4>
          <input
            type="text"
            placeholder="Username"
            value={editData.username}
            onChange={(e) => setEditData({ ...editData, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={editData.password}
            onChange={(e) => setEditData({ ...editData, password: e.target.value })}
          />
          <button onClick={handleUpdateUser}>Update User</button>
          <button onClick={handleDeleteUser} className="delete-button">
            Delete User
          </button>

          <h4>Claims</h4>
          <button onClick={handleGetClaims}>Get Claims</button>
          <ul>
            {claims.map((claim) => (
              <li key={claim.id} className="claim-item">
                <strong>Type:</strong> {claim.type} <br />
                <strong>Description:</strong> {claim.description} <br />
                <strong>Requested Amount:</strong> {claim.requested_amount} <br />
                <strong>Approved Amount:</strong> {claim.approved_amount} <br />
                <strong>Status:</strong> {claim.status} <br />
                <strong>User ID:</strong> {claim.user_id}
                <br />
                <strong>Claim ID:</strong> {claim.id}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
