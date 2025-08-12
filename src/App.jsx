// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import LogoutButton from "./components/LogoutButton"; 
// import { useState, useEffect } from "react";

// function App() {
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     setToken(localStorage.getItem("token"));
//   }, []);

//   const handleLogin = (newToken) => {
//     setToken(newToken);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//   };

//   return (
//     <Router>
//       <div style={{ position: "relative", minHeight: "100vh" }}>
//         {token && <LogoutButton onLogout={handleLogout} />}
//         <Routes>
//           <Route
//             path="/"
//             element={
//               token ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
//             }
//           />
//           <Route
//             path="/dashboard"
//             element={
//               token ? <Dashboard /> : <Navigate to="/" />
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;






import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import LogoutButton from "./components/LogoutButton";
import Header from "./components/Header";      // Import Header
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Header />        {/* Render Header here */}
        {token && <LogoutButton onLogout={handleLogout} />}
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
