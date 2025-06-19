
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
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((project) => {
        console.log("Project data:", project);
        setProjectName(project.title || "Unnamed Project");
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
        setProjectName("Unnamed Project");
      });
  }, [projectId, token]);

  return (
    <div
      style={{
        padding: "2rem",
        backgroundImage: "url('https://example.com/background-image.jpg')", // Replace with a valid URL or local path
        backgroundSize: "cover",
        backgroundColor: "#e6f0fa", // Fallback color
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#333",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
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
