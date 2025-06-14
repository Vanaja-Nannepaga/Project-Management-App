const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();

// Create ticket
router.post('/', async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List tickets by project
router.get('/project/:projectId', async (req, res) => {
  const tickets = await Ticket.find({ projectId: req.params.projectId });
  res.json(tickets);
});

// Update ticket
router.put('/:id', async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ticket);
});

// Delete ticket
router.delete('/:id', async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.json({ message: 'Ticket deleted' });
});

// Assign ticket
router.post('/:id/assign', async (req, res) => {
  const { assignee } = req.body;
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, { assignee }, { new: true });
  res.json(ticket);
});

module.exports = router;
