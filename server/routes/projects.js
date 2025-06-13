const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// server/routes/projects.js
router.post('/create', authMiddleware, async (req, res) => {
  const { title, description, teamEmails } = req.body;
  const teamUsers = await User.find({ email: { $in: teamEmails } });
  const project = await Project.create({
    title,
    description,
    teamMembers: teamUsers.map(u => u._id),
  });
  res.json(project);
});
module.exports = router;

