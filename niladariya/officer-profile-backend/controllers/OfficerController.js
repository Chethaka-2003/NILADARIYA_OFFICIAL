const Officer = require("../models/Officerbackend");

// Get officer profile
const getProfile = async (req, res) => {
  try {
    const officer = await Officer.findById(req.user.id);
    if (!officer) return res.status(404).json({ message: "Officer not found" });
    res.json(officer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update officer profile
const updateProfile = async (req, res) => {
  try {
    const updatedOfficer = await Officer.findByIdAndUpdate(req.user.id, req.body, { new: true });
    if (!updatedOfficer) return res.status(404).json({ message: "Officer not found" });
    res.json(updatedOfficer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get appointment count
const getAppointmentCount = async (req, res) => {
  try {
    const officer = await Officer.findById(req.user.id);
    if (!officer) return res.status(404).json({ message: "Officer not found" });
    res.json({ count: officer.appointments.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile, updateProfile, getAppointmentCount };
