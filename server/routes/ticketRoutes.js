const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createTicket, listTickets, updateTicket, deleteTicket, assignTicket } = require('../controllers/ticketController');

// Protect all routes with authMiddleware
router.use(authMiddleware);

router.post('/', createTicket);
router.get('/project/:projectId', listTickets);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);
router.put('/:id/assign', assignTicket);

module.exports = router;
