const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Create
router.post('/', async (req, res) => {
  const { title, description, teamMembers } = req.body;
  const exists = await Project.findOne({ title });
  if (exists) return res.status(400).json({ error: 'Project with title exists' });
  const project = new Project({ title, description, teamMembers });
  await project.save();
  res.status(201).json(project);
});

// List
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update
router.put('/:id', async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Add member
router.post('/:id/add-member', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    // Check if this member already exists
    if (project.teamMembers.some(m => m.email === email)) {
      return res.status(400).json({ error: "Member already exists" });
    }

    project.teamMembers.push({ name, email });
    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Remove member
router.post('/:id/remove-member', async (req, res) => {
  const { email } = req.body;
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { $pull: { teamMembers: { email } } }, // Fix to pull by object property
    { new: true }
  );
  res.json(project);
});

module.exports = router;
