const express = require('express');
const Ticket = require('../models/Ticket');
const auth = require('../middleware/auth');

const router = express.Router();

// Create ticket
router.post('/create', auth, async (req, res) => {
  try {
    const { title, description, priority, assignee, projectId } = req.body;
    const ticket = await Ticket.create({ title, description, priority, assignee, projectId });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List tickets by project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ projectId: req.params.projectId });
    res.json(tickets);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update ticket
router.put('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete ticket
router.delete('/:id', auth, async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Assign ticket
router.post('/:id/assign', auth, async (req, res) => {
  try {
    const { assignee } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { assignee }, { new: true });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
