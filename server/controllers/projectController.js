const Project = require('../models/Project');
const User = require('../models/User');

const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const project = new Project({
      title,
      description,
      teamMembers: [],
      createdBy: req.user.userId,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    project.title = title || project.title;
    project.description = description || project.description;

    await project.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const listProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user.userId },
        { teamMembers: req.user.userId },
      ],
    }).populate('teamMembers', 'name email').populate('createdBy', 'name email');

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (project.teamMembers.includes(user._id)) {
      return res.status(400).json({ message: 'User already in the project' });
    }

    project.teamMembers.push(user._id);
    await project.save();

    const updatedProject = await Project.findById(id)
      .populate('teamMembers', 'name email')
      .populate('createdBy', 'name email');

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removeTeamMember = async (req, res) => {
  try {
    const { id, userId } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (!project.teamMembers.includes(userId)) {
      return res.status(400).json({ message: 'User not in the project' });
    }

    project.teamMembers = project.teamMembers.filter(member => member.toString() !== userId);
    await project.save();

    const updatedProject = await Project.findById(id)
      .populate('teamMembers', 'name email')
      .populate('createdBy', 'name email');

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createProject, updateProject, deleteProject, listProjects, addTeamMember, removeTeamMember };
