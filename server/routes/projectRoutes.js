const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Create
router.post('/', async (req, res) => {
  const { title, description, teamMembers } = req.body;
  // Prevent duplicate titles (optional)
  const exists = await Project.findOne({ title });
  if (exists) return res.status(400).json({ error: 'Project with title exists' });
  const project = new Project({ title, description, teamMembers });
  await project.save();
  res.status(201).json(project);
});

// List
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
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
  const { email } = req.body;
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { teamMembers: email } }, // prevents duplicates
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
