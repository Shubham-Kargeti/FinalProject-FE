import { useState, useEffect } from "react";
import "./Dashboard.css";
import AdminPanel from "./AdminPanel";


function Dashboard() {
  const [user, setUser] = useState(null);
  const [claims, setClaims] = useState([]);
  const [newClaim, setNewClaim] = useState({ type: "", requested_amount: "", description: "" });
  const [claimId, setClaimId] = useState("");
  const [editClaimId, setEditClaimId] = useState(null);
  const [editClaimData, setEditClaimData] = useState({});
  const token = localStorage.getItem("token");

  const API_BASE = "http://127.0.0.1:8000";

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${API_BASE}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (token) getUser();
  }, [token]);

  const fetchClaims = async () => {
    try {
      const res = await fetch(`${API_BASE}/claims`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch claims");
      const data = await res.json();
      setClaims(data);
    } catch (err) {
      console.error(err);
      setClaims([]);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleSubmitClaim = async () => {
    if (!user) return;
    if (user.role === "admin") {
      alert("Admins cannot submit claims.");
      return;
    }
    try {
      const payload = {
        ...newClaim,
        requested_amount: Number(newClaim.requested_amount),
      };
      const res = await fetch(`${API_BASE}/claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setNewClaim({ type: "", requested_amount: "", description: "" });
      await fetchClaims();
    } catch (err) {
      alert(err.message || "Error submitting claim");
    }
  };

  const handleGetClaimById = async () => {
    if (!claimId) {
      alert("Please enter a claim ID");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/claims/${claimId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setClaims([data]); // Show only this claim in the table
    } catch (err) {
      alert(err.message || "Failed to fetch claim");
    }
  };

  const handleUpdateClaim = async (id) => {
    try {
      let url = `${API_BASE}/claims/${id}`;
      let payload = {};
      
      if (user.role === "admin") {
        // Admin updates only status and approved_amount on admin route
        url = `${API_BASE}/admin/claims/${id}`;
        payload = {
          status: editClaimData.status,
          approved_amount: editClaimData.approved_amount !== undefined
            ? Number(editClaimData.approved_amount)
            : null,
        };
      } else {
        // Normal user updates type, requested_amount, description on user route
        payload = {
          type: editClaimData.type,
          requested_amount: Number(editClaimData.requested_amount),
          description: editClaimData.description,
        };
      }

      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      setEditClaimId(null);
      setEditClaimData({});
      await fetchClaims();
    } catch (err) {
      alert(err.message || "Error updating claim");
    }
  };

  const handleDeleteClaim = async (id) => {
    if (!window.confirm("Are you sure you want to delete this claim?")) return;
    try {
      const res = await fetch(`${API_BASE}/claims/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchClaims();
    } catch (err) {
      alert(err.message || "Error deleting claim");
    }
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {user.username}</h1>

      {/* Show Admin Panel for admins only */}
    {user?.role === "admin" && <AdminPanel />}

      {user.role !== "admin" && (
        <div className="card">
          <h2>Submit a Claim</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Type"
              value={newClaim.type}
              onChange={(e) => setNewClaim({ ...newClaim, type: e.target.value })}
            />
            <input
              type="number"
              placeholder="Requested Amount"
              value={newClaim.requested_amount}
              onChange={(e) => setNewClaim({ ...newClaim, requested_amount: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newClaim.description}
              onChange={(e) => setNewClaim({ ...newClaim, description: e.target.value })}
            />
            <button className="btn primary" onClick={handleSubmitClaim}>
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <h2>Get Claim by ID</h2>
        <div className="form-grid">
          <input
            type="number"
            placeholder="Claim ID"
            value={claimId}
            onChange={(e) => setClaimId(e.target.value)}
          />
          <button className="btn" onClick={handleGetClaimById}>
            Get
          </button>
          <button className="btn secondary" onClick={fetchClaims}>
            Reset Claims
          </button>
        </div>
      </div>

      <div className="card">
        <h2>All Claims</h2>
        <table className="claims-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Requested Amount</th>
              <th>Approved Amount</th>
              <th>Description</th>
              <th>Status</th>
              <th>User ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.length > 0 ? (
              claims.map((claim) => (
                <tr key={claim.id}>
                  <td>{claim.id}</td>
                  <td>
                    {editClaimId === claim.id ? (
                      <input
                        type="text"
                        value={editClaimData.type || ""}
                        onChange={(e) => setEditClaimData({ ...editClaimData, type: e.target.value })}
                      />
                    ) : (
                      claim.type
                    )}
                  </td>
                  <td>
                    {editClaimId === claim.id ? (
                      <input
                        type="number"
                        value={editClaimData.requested_amount || ""}
                        onChange={(e) =>
                          setEditClaimData({ ...editClaimData, requested_amount: e.target.value })
                        }
                      />
                    ) : (
                      claim.requested_amount
                    )}
                  </td>
                  <td>
                    {user.role === "admin" && editClaimId === claim.id ? (
                      <input
                        type="number"
                        value={editClaimData.approved_amount || ""}
                        onChange={(e) =>
                          setEditClaimData({ ...editClaimData, approved_amount: e.target.value })
                        }
                      />
                    ) : (
                      claim.approved_amount ?? ""
                    )}
                  </td>
                  <td>
                    {editClaimId === claim.id ? (
                      <input
                        type="text"
                        value={editClaimData.description || ""}
                        onChange={(e) =>
                          setEditClaimData({ ...editClaimData, description: e.target.value })
                        }
                      />
                    ) : (
                      claim.description
                    )}
                  </td>
                  <td>
                    {user.role === "admin" && editClaimId === claim.id ? (
                      <input
                        type="text"
                        value={editClaimData.status || ""}
                        onChange={(e) =>
                          setEditClaimData({ ...editClaimData, status: e.target.value })
                        }
                      />
                    ) : (
                      claim.status
                    )}
                  </td>
                  <td>{claim.user_id}</td>
                  <td>
                    {editClaimId === claim.id ? (
                      <>
                        <button className="btn primary" onClick={() => handleUpdateClaim(claim.id)}>
                          Save
                        </button>
                        <button
                          className="btn secondary"
                          onClick={() => {
                            setEditClaimId(null);
                            setEditClaimData({});
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn"
                          onClick={() => {
                            setEditClaimId(claim.id);
                            setEditClaimData(claim);
                          }}
                        >
                          Edit
                        </button>
                        <button className="btn danger" onClick={() => handleDeleteClaim(claim.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No claims to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;