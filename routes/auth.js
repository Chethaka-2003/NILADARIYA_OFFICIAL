const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');



const verificationCodes = {}; // Temporary storage for verification codes

// JWT Secret Key
const JWT_SECRET = "vfvrdsf4r4tfgrf48992()vfbvfddv8v8778r5984cewgf4tre49874{}[]4v78f4v"

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post("/send-verification", async (req, res) => {
    const { email, mobile, isPasswordReset } = req.body;
  
    // For Sign-Up: Check if the user already exists
    if (!isPasswordReset) {
      const existingUser = await User.findOne({ $or: [{ email }] });
  
      if (existingUser) {
        return res.send({ status: "error", data: "Email already exists" });
      }
    }
  
    // For Password Reset: Check if the email exists in the database
    if (isPasswordReset) {
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        return res.send({ status: "error", data: "Email not registered" });
      }
    }
  
    // Send the verification code if valid (for both cases)
    const code = crypto.randomInt(100000, 999999).toString();
    verificationCodes[email] = code;

  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification Code',
      html:`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f6fa;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 400px;
            margin: 50px auto;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        img {
            width: 180px;
            height: auto;
            display: block;
            margin: 0 auto;
        }

        .header {
            background-color: rgb(100, 203, 237);
            padding: 15px;
            text-align: center;
            color: white;
            font-size: 24px;
        }

        .content {
            padding: 20px;
            text-align: center;
        }

        .titleholder {
            margin-bottom: 20px;
        }

        .title {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }

        .message {
            font-size: 16px;
            margin-bottom: 5px;
            color: #555;
        }

        .code {
            font-size: 32px;
            font-weight: bold;
            color: #333;
            background-color: rgb(100, 203, 237);
            width: 130px;
            border-radius: 10px;
            display: block;
            margin: 0 auto;
        }

        .footer {
            font-size: 14px;
            color: #777;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">NILADARIYA</div>
        <div class="content">
            <div class="titleholder">
                <div class="title">ඊමේල් සත්‍යාපන කේතය</div>
                <div class="title" style="font-size: medium;">Email verification code</div>
                <div class="title" style="font-size: medium;">மின்னஞ்சல் சரிபார்ப்பு குறியீடு</div>
            </div>
            <div class="titleholder">
                <div class="message">විද්‍යුත් තැපැල් තහවුරු කිරීම සඳහා ඔබගේ කේතය මෙන්න:</div>
                <div class="message" style="font-size: small;">Here is your code for email confirmation:</div>
                <div class="message" style="font-size: small;">மின்னஞ்சல் உறுதிப்படுத்தலுக்கான உங்கள் குறியீடு இங்கே:</div>
            </div>
            <div class="code">${code}</div><br>
            <div class="footer">All you have to do is enter the code for verification in your app </div>
            <div class="footer" style="font-size: smaller;">ඔබ කළ යුත්තේ ඔබගේ යෙදුමේ සත්‍යාපනය සඳහා කේතය ඇතුළත් කිරීම පමණි. </div>
            <div class="footer" style="font-size: smaller;">நீங்கள் செய்ய வேண்டியதெல்லாம், உங்கள் பயன்பாட்டில் சரிபார்ப்புக்கான குறியீட்டை உள்ளிடுவதுதான். </div>
        </div>
    </div>
</body>

</html>` 
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.send({ status: "error", data: error.message });
      }
      res.send({ status: "OK", data: "Verification email sent" });
    });
  });


router.post("/verify-code", async (req, res) => {
  const { email, code } = req.body;

  // Check if the code matches the one sent to the user's email
  if (verificationCodes[email] !== code) {
    return res.send({ status: "error", data: "Invalid verification code" });
  }

  res.send({ status: "OK", data: "Code verified. Proceed to change password" });
});


router.post("/change-password", async (req, res) => {
  const { email, newPassword, code } = req.body;

  // Verify the code
  if (verificationCodes[email] !== code) {
    return res.send({ status: "error", data: "Invalid verification code" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ status: "error", data: "User not found" });
    }

    user.password = newPassword; // Update password
    await user.save();

    // Send email confirmation after password change
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Change Confirmation',
      html:`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f6fa;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 400px;
            margin: 50px auto;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        img {
            width: 180px;
            height: auto;
            display: block;
            margin: 0 auto;
        }

        .header {
            background-color: rgb(100, 203, 237);
            padding: 15px;
            text-align: center;
            color: white;
            font-size: 24px;
        }

        .content {
            padding: 20px;
            text-align: center;
        }

        .titleholder {
            margin-bottom: 20px;
        }

        .title {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }

        .message {
            font-size: 16px;
            margin-bottom: 5px;
            color: #555;
        }

        .code {
            font-size: 32px;
            font-weight: bold;
            color: #333;
            background-color: rgb(100, 203, 237);
            width: 100px;
            border-radius: 10px;
            display: block;
            margin: 0 auto;
        }

        .footer {
            font-size: 14px;
            color: #777;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">NILADARIYA</div>
        <div class="content">
            <div class="titleholder">
                <div class="title">ඔබ ඔබගේ මුරපදය සාර්ථකව වෙනස් කර ඇත.</div>
                <div class="title" style="font-size: medium;">You have successfully changed your password.</div>
                <div class="title" style="font-size: medium;">உங்கள் கடவுச்சொல்லை வெற்றிகரமாக மாற்றிவிட்டீர்கள்.</div>
            </div>
            
        </div>
    </div>
</body>

</html>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ status: 'error', data: error.message });
      }
    });

    // Remove the verification code from the cache
    delete verificationCodes[email];

    res.send({ status: "OK", data: "Password changed successfully" });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
});


router.post('/register', async (req, res) => {
  const { name, email, mobile, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
  if (existingUser) {
    return res.status(400).json({ status: 'error', message: 'User already exists' });
  }

  const newUser = new User({
    name,
    email,
    mobile,
    password, 
    userType: 'public', // Default type is 'public' until clarified
  });

  try {
    await newUser.save();
    res.status(200).json({ status: 'OK', message: 'User created successfully', userType: newUser.userType });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Account Created Successfully',
    html:`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f6fa;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 400px;
            margin: 50px auto;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        img {
            width: 180px;
            height: auto;
            display: block;
            margin: 0 auto;
        }

        .header {
            background-color: rgb(100, 203, 237);
            padding: 15px;
            text-align: center;
            color: white;
            font-size: 24px;
        }

        .content {
            padding: 20px;
            text-align: center;
        }

        .titleholder {
            margin-bottom: 20px;
        }

        .title {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }

        .message {
            font-size: 16px;
            margin-bottom: 5px;
            color: #555;
        }

        .code {
            font-size: 32px;
            font-weight: bold;
            color: #333;
            background-color: rgb(100, 203, 237);
            width: 100px;
            border-radius: 10px;
            display: block;
            margin: 0 auto;
        }

        .footer {
            font-size: 14px;
            color: #777;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">NILADARIYA</div>
        <div class="content">
            <div class="titleholder">
                <div class="title">ඔබ සාර්ථකව ගිණුමක් නිර්මාණය කර ඇත.</div>
                <div class="title" style="font-size: medium;">You have successfully created an account.</div>
                <div class="title" style="font-size: medium;">நீங்கள் வெற்றிகரமாக ஒரு கணக்கை உருவாக்கிவிட்டீர்கள்.</div>
            </div>
            <div class="titleholder">
                <div class="message">නිලධාරි පැතිකඩ</div>
                <div class="message" style="font-size: small;">Officer Profiles</div>
                <div class="message" style="font-size: small;">அதிகாரி சுயவிவரம்</div>
            </div>
	    <div class="titleholder">
                <div class="message">AI චැට්බොට්</div>
                <div class="message" style="font-size: small;">AI Chatbot</div>
                <div class="message" style="font-size: small;">AI சாட்பாட்</div>
            </div>
	    <div class="titleholder">
                <div class="message">මාර්ගගත උපදේශනය</div>
                <div class="message" style="font-size: small;">Online Consulting</div>
                <div class="message" style="font-size: small;">ஆன்லைன் ஆலோசனை</div>
            </div>
        </div>
    </div>
</body>

</html>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send({ status: "error", data: error.message });
    }
    res.send({ status: "OK", data: "Verification email sent" });
  });
});



router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(405).json({ status: 'error', message: 'Invalid email or password' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
  }

  // Generate JWT Token
  const token = jwt.sign({ userId: user._id, userType: user.userType }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ status: 'OK', message: 'Login successful', token, userType: user.userType });
});

// Route to verify JWT Token
router.get('/verify-token', (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
      return res.status(401).json({ status: 'error', message: 'No token provided' });
  }

  if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(401).json({ status: 'error', message: 'Invalid token' });
      }

      res.json({ status: 'OK', message: 'Token valid', userType: decoded.userType });
  });
});

// Middleware to authenticate and decode JWT token
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract token from "Bearer <token>"
  console.log('Received token:', token);

  
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: 'error', message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Route to get user profile
router.get('/getprofile', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    if (user.userType === 'government') {
      let officerProfile;
      try {
        const OfficerProfile = require('../models/OfficerProfile');
        officerProfile = await OfficerProfile.findOne({ userId: user._id });
      } catch (err) {
        console.error("Error retrieving officer profile:", err);
        return res.status(500).json({ status: 'error', message: 'Failed to load officer details' });
      }
      
      if (!officerProfile) {
        return res.json({
          status: 'OK',
          profile: {
            name: user.name,
            email: user.email,
            mobile: user.mobile
          }
        });
      }
      return res.json({ status: 'OK', profile: officerProfile });
    } else {
      return res.json({
        status: 'OK',
        profile: {
          name: user.name,
          email: user.email,
          mobile: user.mobile
        }
      });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Set up multer to handle image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.put('/profile', authenticateJWT, upload.single('profilePicture'), async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Update only allowed fields
    if (req.body.position) {
      user.governmentDetails.position = req.body.position;
    }
    if (req.body.mobile) {
      user.mobile = req.body.mobile;
    }
    if (req.file) {
      // Save the profile picture URL or path
      user.image = `/uploads/profiles/${req.file.filename}`;
    }

    await user.save();
    res.status(200).json({ status: 'OK', message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Route to delete profile picture
router.delete('/profilePicture', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.image) {
      return res.status(404).json({ status: 'error', message: 'No profile picture to remove' });
    }

    // Remove the image file from the server
    const imagePath = path.join(__dirname, '..', user.image);
    fs.unlinkSync(imagePath);

    // Clear the image URL from the user's profile
    user.image = null;
    await user.save();

    res.status(200).json({ status: 'OK', message: 'Profile picture removed successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});


module.exports = router;