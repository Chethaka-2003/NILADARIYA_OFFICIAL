// require('dotenv').config();
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const mongoose = require('mongoose');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
// const port = process.env.PORT || 4000;
// // const twilio = require('twilio');
// app.use(express.json());
// const { jsPDF } = require("jspdf");


// const mongoUrl = process.env.MONGO_URL;

// mongoose.connect(mongoUrl)
//   .then(() => console.log('DATABASE CONNECTED'))
//   .catch((e) => console.log(e));

// require('./models/UserDetails');
// const User = mongoose.model("UserInfo");

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// const verificationCodes = {}; // Store codes temporarily

// // const vonage = new Vonage({
// //   apiKey: process.env.NEXMO_API_KEY,
// //   apiSecret: process.env.NEXMO_API_SECRET
// // });

// // function sendSms(to, message) {
// //   return new Promise((resolve, reject) => {
// //     vonage.sms.send({ to, from: process.env.NEXMO_PHONE_NUMBER, text: message }, (err, responseData) => {
// //       if (err) {
// //         reject(err);
// //       } else {
// //         resolve(responseData);
// //       }
// //     });
// //   });
// // }

// // app.post("/send-verification", async (req, res) => {
// //   const { email, mobile } = req.body;
// //   const oldUser = await User.findOne({ $or: [{ email }, { mobile }] });


// //   if (oldUser) {
// //     return res.send({ data: 'User already exists!' });
// //   }

// //   const code = crypto.randomInt(100000, 999999).toString();
// //   verificationCodes[email] = code;

// //   const mailOptions = {
// //     from: process.env.EMAIL_USER,
// //     to: email,
// //     subject: 'Email Verification Code',
// //     text: `Your verification code is: ${code}`
// //   };

// //   transporter.sendMail(mailOptions, (error, info) => {
// //     if (error) {
// //       return res.send({ status: "error", data: error.message });
// //     }
// //     res.send({ status: "OK", data: "Verification email sent" });
// //   });


// //   // Add logic to send verification code to mobile number
// //   // Assuming you have a function sendSms to send SMS
// //   sendSms(mobile, `Your verification code is: ${code}`)
// //     .then(() => {
// //       res.send({ status: "OK", data: "Verification email and SMS sent" });
// //     })
// //     .catch((error) => {
// //       res.send({ status: "error", data: error.message });
// //     });
// // });


// app.post("/send-verification", async (req, res) => {
//   const { email, mobile, isPasswordReset } = req.body;

//   // For Sign-Up: Check if the user already exists
//   if (!isPasswordReset) {
//     const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });

//     if (existingUser) {
//       return res.send({ status: "error", data: "Email already exists" });
//     }
//   }

//   // For Password Reset: Check if the email exists in the database
//   if (isPasswordReset) {
//     const existingUser = await User.findOne({ email });

//     if (!existingUser) {
//       return res.send({ status: "error", data: "Email not registered" });
//     }
//   }

//   // Send the verification code if valid (for both cases)
//   const code = crypto.randomInt(100000, 999999).toString();
//   verificationCodes[email] = code;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Email Verification Code',
//     text: `Your verification code is: ${code}`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res.send({ status: "error", data: error.message });
//     }
//     res.send({ status: "OK", data: "Verification email sent" });
//   });
// });



// app.post("/register", async (req, res) => {
//   const { name, email, mobile, password, code } = req.body;

//   if (verificationCodes[email] !== code) {
//     return res.send({ status: "error", data: "Invalid verification code" });
//   }

//   console.log("password during registration:", password);

//   try {
//     await User.create({ name, email, mobile, password});
//     delete verificationCodes[email];
//     res.send({ status: "OK", data: "User Created" });
//   } catch (error) {
//     res.send({ status: "error", data: error.message });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.send({ status: "error", data: "User not found" });
//     }

//     console.log("Stored hashed password:", user.password);
//     console.log("Entered plain text password:", password);

//     if (password !== user.password) {
//       return res.send({ status: "error", data: "Invalid password" });
//     }


//     res.send({ status: "OK", data: "Login successful"});
//   } catch (error) {
//     console.log("Error during login:", error.message);
//     res.send({ status: "error", data: error.message });
//   }
// });

// app.post("/verify-code", async (req, res) => {
//   const { email, code } = req.body;

//   // Check if the code matches the one sent to the user's email
//   if (verificationCodes[email] !== code) {
//     return res.send({ status: "error", data: "Invalid verification code" });
//   }

//   res.send({ status: "OK", data: "Code verified. Proceed to change password" });
// });

// app.post("/change-password", async (req, res) => {
//   const { email, newPassword, code } = req.body;

//   // Verify the code
//   if (verificationCodes[email] !== code) {
//     return res.send({ status: "error", data: "Invalid verification code" });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.send({ status: "error", data: "User not found" });
//     }

//     user.password = newPassword; // Update password
//     await user.save();

//     // Send email confirmation after password change
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Password Change Confirmation',
//       text: 'Your password has been successfully changed.'
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return res.status(500).send({ status: 'error', data: error.message });
//       }
//     });

//     // Remove the verification code from the cache
//     delete verificationCodes[email];

//     res.send({ status: "OK", data: "Password changed successfully" });
//   } catch (error) {
//     res.send({ status: "error", data: error.message });
//   }
// });



// app.listen(4000, () => console.log("Server started on port 4000"));


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl)
  .then(() => console.log('DATABASE CONNECTED'))
  .catch((e) => console.log(e));

// Import Routes
const feedbackRoutes = require('./routes/Feedback');
const authRoutes = require('./routes/auth');
const verificationRoutes = require('./routes/verification');

// Use Routes
app.use('/auth', authRoutes);
app.use('/verification', verificationRoutes);
app.use('/feedback', feedbackRoutes);



app.listen(4000, () => console.log("Server started on port 4000"));

