const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const auth = require('../middleware/auth');



// Get tickets by project
router.get('/filter', auth, async (req, res) => {
  try {
    const { projectId, status, priority, assignee, search } = req.query;
    
    // Basic validation
    if (!projectId) {
      return res.status(400).json({ error: "projectId is required" });
    }

    const filter = { project: projectId };
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    
    if (assignee) {
      // Check if assignee is a valid ObjectId
      if (mongoose.Types.ObjectId.isValid(assignee)) {
        filter.assignee = assignee;
      } else {
        // Try to find user by email
        const user = await User.findOne({ email: assignee });
        if (user) {
          filter.assignee = user._id;
        } else {
          return res.status(404).json({ error: "Assignee not found" });
        }
      }
    }
    
    let tickets = await Ticket.find(filter)
      .populate('assignee', 'name email')
      .lean();

    // Apply search filter if provided
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      tickets = tickets.filter(ticket => 
        searchRegex.test(ticket.title) || 
        (ticket.description && searchRegex.test(ticket.description))
      );
    }

    res.json(tickets);
  } catch (err) {
    console.error("Filter error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


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
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    console.log("Updated ticket:", ticket); // Log to verify update
    res.json({ message: "Ticket updated", ticket });
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
