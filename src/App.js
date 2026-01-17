import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import PlayerProfile from "./components/PlayerProfile";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [mode, setMode] = useState(null); // "supervisor" or "host"

  if (!user) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Stateview Supervisor Tool</h1>
        <LoginForm onLogin={setUser} />
      </div>
    );
  }

  if (!mode) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Stateview Supervisor Tool</h1>
        <p>Choose your role:</p>
        <button onClick={() => setMode("supervisor")}>I am a Supervisor</button>
        <button onClick={() => setMode("host")} style={{ marginLeft: "10px" }}>
          I am a Host (Request Sups)
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Stateview Supervisor Tool</h1>
      {mode === "supervisor" ? (
        <>
          <PlayerProfile />
          <hr />
          <Dashboard />
        </>
      ) : (
        <Dashboard /> // ✅ Host only sees dashboard (read-only)
      )}
    </div>
  );
}

export default App;
