const Ticket = require('../models/Ticket');
const Project = require('../models/Project');

const createTicket = async (req, res) => {
  try {
    const { title, description, priority, projectId } = req.body;

    // Verify the project exists and the user is authorized (creator or team member)
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isAuthorized = project.createdBy.toString() === req.user.userId || project.teamMembers.includes(req.user.userId);
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized to create ticket in this project' });
    }

    const ticket = new Ticket({
      title,
      description,
      priority,
      projectId,
      createdBy: req.user.userId,
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const listTickets = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Verify the project exists and the user is authorized
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isAuthorized = project.createdBy.toString() === req.user.userId || project.teamMembers.includes(req.user.userId);
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized to view tickets in this project' });
    }

    const tickets = await Ticket.find({ projectId })
      .populate('assignee', 'name email')
      .populate('createdBy', 'name email');

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Verify the user is authorized (ticket creator or project creator)
    const project = await Project.findById(ticket.projectId);
    const isAuthorized = ticket.createdBy.toString() === req.user.userId || project.createdBy.toString() === req.user.userId;
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized to update this ticket' });
    }

    ticket.title = title || ticket.title;
    ticket.description = description || ticket.description;
    ticket.priority = priority || ticket.priority;
    ticket.status = status || ticket.status;

    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Verify the user is authorized (ticket creator or project creator)
    const project = await Project.findById(ticket.projectId);
    const isAuthorized = ticket.createdBy.toString() === req.user.userId || project.createdBy.toString() === req.user.userId;
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized to delete this ticket' });
    }

    await Ticket.findByIdAndDelete(id);
    res.status(200).json({ message: 'Ticket deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const assignTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { assigneeId } = req.body;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Verify the user is authorized (project creator)
    const project = await Project.findById(ticket.projectId);
    if (project.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized to assign this ticket' });
    }

    // Verify the assignee is part of the project
    if (assigneeId && !project.teamMembers.includes(assigneeId) && project.createdBy.toString() !== assigneeId) {
      return res.status(400).json({ message: 'Assignee must be a project member or creator' });
    }

    ticket.assignee = assigneeId || null; // Allow unassigning by setting to null
    await ticket.save();

    const updatedTicket = await Ticket.findById(id)
      .populate('assignee', 'name email')
      .populate('createdBy', 'name email');

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTicket, listTickets, updateTicket, deleteTicket, assignTicket };
