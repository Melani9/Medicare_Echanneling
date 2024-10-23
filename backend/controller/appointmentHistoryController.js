// appointmentHistoryController.js

const Appointment = require("../models/appointmentHistorySchema");

// Controller to get appointment history for the authenticated user
exports.getAppointments = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user` contains the authenticated user's ID
    const appointments = await Appointment.find({ userId });

    if (!appointments) {
      return res.status(404).json({ message: "No appointments found!" });
    }

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};
