import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, remove } from "firebase/database";

export default function Dashboard() {
  const [profiles, setProfiles] = useState([]);
  const [filter, setFilter] = useState("All");

  // ✅ Get logged-in user from localStorage
  const savedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const profilesRef = ref(db, "profiles");

    onValue(profilesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfiles(Object.values(data));
      } else {
        setProfiles([]);
      }
    });
  }, []);

  const filteredProfiles =
    filter === "All"
      ? profiles
      : profiles.filter((p) => p.status === filter);

  // ✅ Function to pick background color based on status
  const getBoxColor = (status) => {
    switch (status) {
      case "Available 🟢":
        return "#d4edda"; // light green
      case "Claimed 🟡":
        return "#fff3cd"; // light yellow
      case "AFK ⚫":
        return "#e2e3e5"; // light gray
      case "Unavailable 🔴":
        return "#f8d7da"; // light red
      default:
        return "#f0f0f0"; // default light gray
    }
  };

  // ✅ Remove profile from Firebase (only if owner)
  const handleRemove = async (robloxUser) => {
    try {
      await remove(ref(db, "profiles/" + robloxUser));
      alert("Profile removed successfully!");
    } catch (err) {
      alert("Error removing profile: " + err.message);
    }
  };

  return (
    <div>
      <h2>Supervisor Dashboard</h2>

      <label>Filter by Status: </label>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Available 🟢">Available 🟢</option>
        <option value="Claimed 🟡">Claimed 🟡</option>
        <option value="AFK ⚫">AFK ⚫</option>
        <option value="Unavailable 🔴">Unavailable 🔴</option>
      </select>

      <br /><br />

      {filteredProfiles.length === 0 ? (
        <p>No profiles match this filter.</p>
      ) : (
        filteredProfiles.map((p, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: getBoxColor(p.status),
              borderRadius: "6px",
            }}
          >
            <strong>Roblox:</strong> {p.robloxUser || "Unknown"} <br />
            <strong>Discord:</strong> {p.discordUser || "Not provided"} <br />
            <strong>Supervise:</strong>{" "}
            {(p.superviseOptions || []).join(", ") || "None"} <br />
            <strong>Status:</strong> {p.status || "Unknown"}{" "}
            {p.status === "Claimed 🟡" && `| Claimed By: ${p.claimedBy || "?"}`} <br />
            <strong>Note:</strong> {p.note || "None"} <br />
            
            {/* ✅ Show Remove button only if this profile belongs to logged-in user */}
            {savedUser?.robloxUser === p.robloxUser && (
              <button
                onClick={() => handleRemove(p.robloxUser)}
                style={{
                  marginTop: "8px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Remove My Profile
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
