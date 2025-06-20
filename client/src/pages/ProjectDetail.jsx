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
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl"
        style={{ background: 'linear-gradient(to bottom, #a1e9ff, #2a7a8c, #1a1a1a)' }}
      >
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl"
        style={{ background: 'linear-gradient(to bottom, #a1e9ff, #2a7a8c, #1a1a1a)' }}
      >
        Project not found.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col font-sans"
      style={{
        background: 'linear-gradient(to bottom, #a1e9ff, #2a7a8c, #1a1a1a)',
        paddingBottom: '2rem',
      }}
    >
      <div className="max-w-5xl w-full mx-auto px-4 py-10">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-10 mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 mb-2">{project.title}</h1>
          <p className="text-gray-700 text-base sm:text-lg">{project.description}</p>
        </div>

        <ProjectTickets projectId={id} token={localStorage.getItem('token')} />
      </div>
    </div>
  );
}

export default ProjectDetail;

