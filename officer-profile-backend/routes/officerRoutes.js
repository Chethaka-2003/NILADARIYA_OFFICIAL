const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Officer = require("../models/Officerbackend");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Register Officer
router.post("/register", async (req, res) => {
    const { name, position, service, contact, email, password } = req.body;

    try {
        let officer = await Officer.findOne({ email });
        if (officer) return res.status(400).json({ message: "Officer already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        officer = new Officer({
            name,
            position,
            service,
            contact,
            email,
            password: hashedPassword,
        });

        await officer.save();
        res.status(201).json({ message: "Officer registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Login Officer
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const officer = await Officer.findOne({ email });
        if (!officer) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, officer.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: officer._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Get Officer Profile (Protected)
router.get("/profile", authenticate, async (req, res) => {
    try {
        const officer = await Officer.findById(req.officer.id).select("-password");
        res.json(officer);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Update Officer Profile (Protected)
router.put("/profile", authenticate, async (req, res) => {
    const { name, position, service, contact } = req.body;

    try {
        const officer = await Officer.findByIdAndUpdate(
            req.officer.id,
            { name, position, service, contact },
            { new: true }
        ).select("-password");

        res.json(officer);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;


