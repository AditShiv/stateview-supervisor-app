import React, { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [robloxUser, setRobloxUser] = useState("");
  const [discordUser, setDiscordUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!robloxUser) {
      alert("Roblox username is required!");
      return;
    }
    const userData = { robloxUser, discordUser };
    localStorage.setItem("user", JSON.stringify(userData));
    onLogin(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>Roblox Username:</label>
      <input
        type="text"
        value={robloxUser}
        onChange={(e) => setRobloxUser(e.target.value)}
        required
      />
      <br />
      <label>Discord Username (optional):</label>
      <input
        type="text"
        value={discordUser}
        onChange={(e) => setDiscordUser(e.target.value)}
      />
      <br />
      <button type="submit">Start</button>
    </form>
  );
}
