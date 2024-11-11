export const fetchDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find({});
  
      // Define available slots for weekdays and weekends
      const weekdaySlots = ["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"];
      const weekendSlots = ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];
  
      const currentDay = new Date().getDay(); // 0 = Sunday, 6 = Saturday
      const availableSlots = currentDay === 0 || currentDay === 6 ? weekendSlots : weekdaySlots;
  
      // Append availableSlots to each doctor object
      const doctorsWithSlots = doctors.map(doctor => ({
        ...doctor.toObject(),
        availableSlots,
      }));
  
      res.json({ success: true, doctors: doctorsWithSlots });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  