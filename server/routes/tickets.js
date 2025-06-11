const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const authMiddleware = require('../middleware/authMiddleware');

// Create ticket
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Error creating ticket' });
  }
});

// Get tickets by project
router.get('/project/:projectId', authMiddleware, async (req, res) => {
  try {
    const tickets = await Ticket.find({ project: req.params.projectId }).populate('assignee');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tickets' });
  }
});

// Update ticket
router.put('/:ticketId', authMiddleware, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.ticketId, req.body, { new: true });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Error updating ticket' });
  }
});

// Delete ticket
router.delete('/:ticketId', authMiddleware, async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.ticketId);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting ticket' });
  }
});

module.exports = router;

