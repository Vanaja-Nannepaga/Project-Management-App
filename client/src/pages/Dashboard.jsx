import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateProjectForm from './CreateProjectForm';
import { UserContext } from '../context/UserContext';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(res.data);
      } catch (err) {
        console.error('Failed to load projects:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
      <CreateProjectForm onProjectCreated={setProjects} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded shadow hover:shadow-lg">
            <h2 className="font-bold text-lg">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

