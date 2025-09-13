const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Sign Up with JWT and optional role
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body; // include role

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user" // default role is "user"
    });

    await newUser.save();

    // Generate JWT immediately
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      msg: "User registered successfully",
      token,
      user: { id: newUser._id, username, email, role: newUser.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sign In
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
  { id: user._id, role: user.role }, // include role
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

res.json({ 
  token, 
  user: { id: user._id, username: user.username, email: user.email, role: user.role } 
});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
