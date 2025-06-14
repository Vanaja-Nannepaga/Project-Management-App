const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Create project
router.post('/', async (req, res) => {
  try {
    const { title, description, teamMembers } = req.body;
    const project = await Project.create({ title, description, teamMembers });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List projects
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
});

// Add member
router.post('/:id/add-member', async (req, res) => {
  const { email } = req.body;
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { teamMembers: email } },
    { new: true }
  );
  res.json(project);
});

// Remove member
router.post('/:id/remove-member', async (req, res) => {
  const { email } = req.body;
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { $pull: { teamMembers: email } },
    { new: true }
  );
  res.json(project);
});

module.exports = router;
