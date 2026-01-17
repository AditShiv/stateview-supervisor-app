import React, { useState, useEffect } from "react";

export default function PlayerStatus() {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [status, setStatus] = useState("Available 🟢");
  const [claimedBy, setClaimedBy] = useState("");

  // Save status changes globally
  useEffect(() => {
    const data = { status, claimedBy };
    localStorage.setItem("playerStatus", JSON.stringify(data));
  }, [status, claimedBy]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    if (newStatus !== "Claimed 🟡") {
      setClaimedBy(""); // clear host if not claimed
    }
  };

  return (
    <div>
      <h2>{savedUser?.robloxUser}</h2>
      <p>
        Status: {status}{" "}
        {status === "Claimed 🟡" && (
          <>
            | Claimed By:{" "}
            <input
              type="text"
              value={claimedBy}
              onChange={(e) => setClaimedBy(e.target.value)}
              placeholder="Enter host username"
            />
          </>
        )}
      </p>

      <select value={status} onChange={handleStatusChange}>
        <option>Available 🟢</option>
        <option>Claimed 🟡</option>
        <option>AFK ⚫</option>
        <option>Unavailable 🔴</option>
      </select>
    </div>
  );
}
