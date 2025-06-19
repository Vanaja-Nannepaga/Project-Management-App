import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KanbanBoard from "../components/Kanban/KanbanBoard";

export default function KanbanBoardPage() {
  const { projectId } = useParams();
  const token = localStorage.getItem("token");
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    if (!projectId) return;

    fetch(`/api/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((project) => {
        setProjectName(project.title || "Unnamed Project");
        console.log("Project data:", project);
      })
      .catch(() => {
        setProjectName("Unnamed Project");
      });
  }, [projectId, token]);

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#e6f0fa",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#333",
          backgroundColor: "rgba(255,255,255,0.8)",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        Kanban Board - {projectName}
      </h1>
      {projectId && <KanbanBoard projectId={projectId} token={token} />}
    </div>
  );
}

