import React, { useState } from "react";
import { db } from "../firebase";
import { ref, set } from "firebase/database";

export default function PlayerProfile() {
  const savedUser = JSON.parse(localStorage.getItem("user"));

  const [superviseOptions, setSuperviseOptions] = useState([]);
  const [status, setStatus] = useState("Available 🟢");
  const [claimedBy, setClaimedBy] = useState("");
  const [note, setNote] = useState("");

  const handleSuperviseChange = (option) => {
    if (option === "Everything") {
      if (superviseOptions.includes("Everything")) {
        setSuperviseOptions([]);
      } else {
        setSuperviseOptions(["Everything"]);
      }
    } else {
      let updatedOptions = superviseOptions.filter((o) => o !== "Everything");

      if (updatedOptions.includes(option)) {
        updatedOptions = updatedOptions.filter((o) => o !== option);
      } else {
        updatedOptions.push(option);
      }

      setSuperviseOptions(updatedOptions);
    }
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    if (newStatus !== "Claimed 🟡") {
      setClaimedBy("");
    }
  };

  const handleSave = async () => {
    const data = {
      robloxUser: savedUser?.robloxUser,
      discordUser: savedUser?.discordUser,
      superviseOptions,
      status,
      claimedBy,
      note,
    };

    try {
      await set(ref(db, "profiles/" + savedUser.robloxUser), data);
      alert("Profile saved to Firebase!");
    } catch (err) {
      alert("Error saving: " + err.message);
    }
  };

  return (
    <div>
      <h2>Roblox Username: {savedUser?.robloxUser}</h2>
      <h3>Discord Username: {savedUser?.discordUser || "Not provided"}</h3>

      <p>I can supervise:</p>
      <div>
        {["Shift", "Training", "Evac", "RPC", "Everything"].map((option) => (
          <label key={option} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={superviseOptions.includes(option)}
              onChange={() => handleSuperviseChange(option)}
            />
            {option}
          </label>
        ))}
      </div>

      <p>
        Status:{" "}
        <select value={status} onChange={handleStatusChange}>
          <option value="Available 🟢">Available 🟢</option>
          <option value="Claimed 🟡">Claimed 🟡</option>
          <option value="AFK ⚫">AFK ⚫</option>
          <option value="Unavailable 🔴">Unavailable 🔴</option>
        </select>
        {status === "Claimed 🟡" && (
          <>
            {" "} | Claimed By:{" "}
            <input
              type="text"
              value={claimedBy}
              onChange={(e) => setClaimedBy(e.target.value)}
              placeholder="Enter host username"
            />
          </>
        )}
      </p>

      <p>
        Note:{" "}
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Extra note by the player"
        />
      </p>

      <hr />
      <h3>Preview:</h3>
      <p>
        Roblox Username: {savedUser?.robloxUser} <br />
        Discord Username: {savedUser?.discordUser || "Not provided"} <br />
        Supervise: {(superviseOptions || []).join(", ") || "None"} <br />
        Status: {status}{" "}
        {status === "Claimed 🟡" && `| Claimed By: ${claimedBy}`} <br />
        Note: {note || "None"}
      </p>

      <button onClick={handleSave}>Save to Dashboard</button>
    </div>
  );
}
