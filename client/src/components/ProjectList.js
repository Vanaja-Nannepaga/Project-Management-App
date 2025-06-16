import axios from "axios";
import { useEffect, useState } from "react";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function fetchProjects() {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    }
    fetchProjects();
  }, []);
  
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {projects.map(p => (
        <div key={p._id} style={{ border: '1px solid #ddd', padding: 16, width: 300 }}>
          <strong>{p.title}</strong>
          <div>{p.description}</div>
          <div><small>Team: {p.teamMembers && p.teamMembers.join(', ')}</small></div>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
