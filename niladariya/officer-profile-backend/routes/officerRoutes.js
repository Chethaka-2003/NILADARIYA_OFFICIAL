const express = require("express");
const { getProfile, updateProfile, getAppointmentCount } = require("../controllers/officerController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/appointment/count", protect, getAppointmentCount);

module.exports = router;





