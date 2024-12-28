// routes/supportTicketRoutes.js
import express from 'express';
import { addSupportTicket, fetchAllSupportTickets, updateSupportTicket, deleteSupportTicket } from '../controllers/support.controller.js';

const router = express.Router();

// Route for creating a new support ticket
router.post('/tickets', addSupportTicket);

// Route for fetching all support tickets (admin only)
router.get('/tickets/all', fetchAllSupportTickets);

// Route for updating a support ticket (admin reply)
router.put('/tickets/:id', updateSupportTicket);

// Route for deleting a support ticket (admin only)
router.delete('/tickets/:id', deleteSupportTicket);

export default router;
