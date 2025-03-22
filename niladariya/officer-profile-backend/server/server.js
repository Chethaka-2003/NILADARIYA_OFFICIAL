const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const os = require("os");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Get server IP dynamically
const getServerIP = () => {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        for (const entry of iface) {
            if (entry.family === "IPv4" && !entry.internal) {
                return entry.address;
            }
        }
    }
    return "localhost";
};

const SERVER_IP = getServerIP();

// Configure Multer storage for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, "profile_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Dummy profile data (replace with DB later)
let profile = {
    name: "Savini Perera",
    email: "savini@gmail.com",
    position: "Officer",
    service: "Education",
    mobile: "0712345678",
    telephone: "0112345678",
    address: "1234, Some Street, Colombo",
    profilePicture: null
};

// API to get profile details
app.get("/OFFICER_API/profile", (req, res) => {
    res.json(profile);
});

// API to update profile details
app.post("/OFFICER_API/profile", (req, res) => {
    const { name, email, position, service, mobile, telephone, address } = req.body;

    // Validate mobile number format (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
        return res.status(400).json({ error: "Valid 10-digit mobile number is required" });
    }

    profile = { ...profile, name, email, position, service, mobile, telephone, address };
    res.json({ message: "Profile updated successfully", profile });
});

// API to upload profile picture
app.post("/OFFICER_API/profilePicture", upload.single("profilePicture"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    profile.profilePicture = `http://${SERVER_IP}:${PORT}/uploads/${req.file.filename}`;
    res.json({ message: "Profile picture uploaded successfully", profilePicture: profile.profilePicture });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://${SERVER_IP}:${PORT}`);
});
