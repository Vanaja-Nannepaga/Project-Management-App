const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createProject, updateProject, deleteProject, listProjects, addTeamMember, removeTeamMember } = require('../controllers/projectController');

// Protect all routes with authMiddleware
router.use(authMiddleware);

router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.get('/', listProjects);
router.post('/:id/members', addTeamMember);
router.delete('/:id/members/:userId', removeTeamMember);

module.exports = router;
