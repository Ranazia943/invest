import SupportTicket from "../models/support.model.js";

// Add a New Support Ticket
export const addSupportTicket = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Create a new ticket from the request body
    const newTicket = await SupportTicket.create({
      name,
      email,
      phone,
      message,
    });

    // Send a success response
    res.status(201).json({
      message: "Support ticket created successfully.",
      ticket: newTicket,
    });
  } catch (error) {
    // Handle errors and send a failure response
    res.status(500).json({
      message: "Error creating support ticket.",
      error: error.message,
    });
  }
};

// Fetch All Support Tickets (for Admin)
export const fetchAllSupportTickets = async (req, res) => {
  try {
    // Retrieve all support tickets from the database
    const tickets = await SupportTicket.find();

    // Send a success response with the tickets
    res.status(200).json({
      message: "Support tickets fetched successfully.",
      tickets,
    });
  } catch (error) {
    // Handle errors and send a failure response
    res.status(500).json({
      message: "Error fetching support tickets.",
      error: error.message,
    });
  }
};

// Update a Support Ticket (Admin replies)
export const updateSupportTicket = async (req, res) => {
  const { id } = req.params;
  const { adminMessage } = req.body;

  try {
    // Find and update the ticket with the admin's reply
    const updatedTicket = await SupportTicket.findByIdAndUpdate(
      id,
      { $push: { replies: { adminMessage } }, status: "in-progress" },
      { new: true, runValidators: true }
    );

    // Check if the ticket exists
    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    // Send a success response with the updated ticket
    res.status(200).json({
      message: "Ticket updated successfully with the admin reply.",
      ticket: updatedTicket,
    });
  } catch (error) {
    // Handle errors and send a failure response
    res.status(500).json({
      message: "Error updating ticket.",
      error: error.message,
    });
  }
};

// Delete a Support Ticket
export const deleteSupportTicket = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the ticket
    const deletedTicket = await SupportTicket.findByIdAndDelete(id);

    // Check if the ticket was found and deleted
    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    // Send a success response with the deleted ticket
    res.status(200).json({
      message: "Ticket deleted successfully.",
      ticket: deletedTicket,
    });
  } catch (error) {
    // Handle errors and send a failure response
    res.status(500).json({
      message: "Error deleting ticket.",
      error: error.message,
    });
  }
};


