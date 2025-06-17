import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ProjectTickets from '../components/ProjectTickets';
import axios from 'axios';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProject(res.data);
      } catch (err) {
        setProject(null);
      }
      setLoading(false);
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return <div>Loading project...</div>;
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
      <p className="mb-4">{project.description}</p>
      <hr className="mb-6" />
      <ProjectTickets projectId={id} token={localStorage.getItem('token')} />
    </div>
  );
}

export default ProjectDetail;
