// import { useState } from "react";

// export default function CreateUser({ onCreated }) {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     email: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:8000/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, role: "user" }) // fixed role
//       });

//       if (!res.ok) {
//         alert("Failed to create user");
//         return;
//       }

//       alert("User created successfully!");
//       onCreated(); // back to login
//     } catch (err) {
//       console.error(err);
//       alert("Error creating user");
//     }
//   };

//   return (
//     <div>
//       <h2>Create User</h2>
//       <form onSubmit={handleCreate}>
//         <input
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <button type="submit">Create</button>
//       </form>
//       <br />
//       <button onClick={onCreated}>Back to Login</button>
//     </div>
//   );
// }

import { useState } from "react";

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
      <style>{`
        .create-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          font-family: Arial, sans-serif;
        }
        .create-container h2 {
          color: white;
          margin-bottom: 20px;
        }
        .create-container form {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          width: 300px;
        }
        .create-container input,
        .create-container select {
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }
        .create-container button {
          padding: 10px;
          background: #2575fc;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.3s ease;
        }
        .create-container button:hover {
          background: #1b5ed9;
        }
        .create-container .back-btn {
          margin-top: 10px;
          background: transparent;
          border: 2px solid white;
          color: white;
        }
        .create-container .back-btn:hover {
          background: white;
          color: #2575fc;
        }
      `}</style>

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
      <button className="back-btn" onClick={onCreated}>Back to Login</button>
    </div>
  );
}
