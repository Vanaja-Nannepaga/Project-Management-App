// Example: src/components/ProjectList.js
import React, { useEffect, useState } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(setProjects);
  }, []);

  return (
    <ul>
      {projects.map(p => (
        <li key={p._id}>{p.title} — {p.description}</li>
      ))}
    </ul>
  );
}
export default ProjectList;
