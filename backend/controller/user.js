require('dotenv').config();
const User = require("../models/user");
const bcrypt = require("bcrypt");




// SIGNUP CONTROLLER
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword });

    await newUser.save();

   

    res.status(201).json({
      message: "Signup successful",
   
    });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

// LOGIN CONTROLLER
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    

    res.json({
      message: "Login successful",
      token,
    
    });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

module.exports = {
  signup,
  login,
};