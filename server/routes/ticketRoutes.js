const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const auth = require('../middleware/auth');

// Create Ticket
router.post('/', auth, async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List Tickets by Project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ projectId: req.params.projectId });
    res.json(tickets);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Ticket
router.put('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Ticket
router.delete('/:id', auth, async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Assign Ticket (just update assignee)
router.post('/:id/assign', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignee: req.body.assignee },
      { new: true }
    );
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
