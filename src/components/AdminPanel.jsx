import React, { useState } from "react";
import { getClaimsByUserId, getUserById, deleteUserById, updateUserById} from "../api/adminapi";

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

//   return (
//     <div className="card" style={{ marginTop: "1rem" }}>
//       <h2>Admin Panel</h2>

//       <div>
//         <input
//           type="text"
//           placeholder="Enter User ID"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//         />
//         <button onClick={handleGetUser}>Get User</button>
//       </div>

//       {userData && (
//         <div style={{ marginTop: "1rem" }}>
//           <h3>User Details</h3>
//           <p>ID: {userData.id}</p>
//           <p>Username: {userData.username}</p>
//           <p>Email: {userData.email}</p>

//           <h4>Edit User</h4>
//           <input
//             type="text"
//             placeholder="Username"
//             value={editData.username}
//             onChange={(e) => setEditData({ ...editData, username: e.target.value })}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={editData.email}
//             onChange={(e) => setEditData({ ...editData, email: e.target.value })}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={editData.password}
//             onChange={(e) => setEditData({ ...editData, password: e.target.value })}
//           />
//           <button onClick={handleUpdateUser}>Update User</button>
//           <button onClick={handleDeleteUser} style={{ marginLeft: "1rem", color: "red" }}>
//             Delete User
//           </button>

//           <h4>Claims</h4>
//           <button onClick={handleGetClaims}>Get Claims</button>
//           <ul>
//             {claims.map((claim) => (
//               <li key={claim.id}>{claim.description}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPanel;




  return (
    <div style={{ border: "1px solid gray", 
        padding: "1rem", 
        marginTop: "1rem", 
        backgroundColor: "white", 
        maxWidth: "870px",
    marginLeft: "auto",
    marginRight: "auto", borderRadius: "10px"}}>

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
        <div style={{ marginTop: "1rem" }}>
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
          <button onClick={handleDeleteUser} style={{ marginLeft: "1rem", color: "red" }}>
            Delete User
          </button>

          <h4>Claims</h4>
          <button onClick={handleGetClaims}>Get Claims</button>
          <ul>
            {claims.map((claim) => (
              <li key={claim.id}>{claim.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;