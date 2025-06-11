const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, async (req, res) => {
  const { title, description, teamEmails } = req.body;

  try {
    // Find users by email
     const foundUsers = await User.find({ email: { $in: teamEmails } }).select('_id');
    const teamMembers = [...foundUsers.map(u => u._id), req.user.id];

    // Create project including creator's ID
    const project = await Project.create({ title, description, teamMembers });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Project creation failed', details: err.message });
  }
});

module.exports = router;

