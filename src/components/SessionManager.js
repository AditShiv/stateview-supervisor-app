import React, { useState } from "react";

export default function SessionManager() {
  const [sessions, setSessions] = useState(
    JSON.parse(localStorage.getItem("sessions")) || []
  );

  const addSession = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const newSession = {
      id: Date.now(),
      host: user?.robloxUser,
      supervisor: null,
    };
    const updated = [...sessions, newSession];
    setSessions(updated);
    localStorage.setItem("sessions", JSON.stringify(updated));
  };

  const assignSupervisor = (id, supervisorName) => {
    const updated = sessions.map((s) =>
      s.id === id ? { ...s, supervisor: supervisorName } : s
    );
    setSessions(updated);
    localStorage.setItem("sessions", JSON.stringify(updated));
  };

  return (
    <div>
      <h2>Session Manager</h2>
      <button onClick={addSession}>Create New Session</button>
      <ul>
        {sessions.map((s) => (
          <li key={s.id}>
            Host: {s.host} | Supervisor: {s.supervisor || "None"}
            <button onClick={() => assignSupervisor(s.id, "Supervisor123")}>
              Assign Supervisor
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
