const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.user = async (req, res) => {
  try {
   
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { userFullName, userAddress, gender, password, email } = req.body;
    
  
    if (!userFullName || !email || !password || !userAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

 
    const newUser = new userModel({
      userFullName,
      password: hashedPassword, 
      email,
      gender,
      userAddress
    });

 
    await newUser.save();

   
    const userToken = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET, 
      { expiresIn: "3h" } 
    );

    res.status(201).json({ message: "User created successfully", token: userToken });
  } catch (error) {
    console.error("Error creating user:", error); 
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// login function



exports.login = async (req, res) => {
  try {
   
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const userToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET, 
      { expiresIn: "3h" } 
    );

    res.status(200).json({ message: "Login successful", token: userToken });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
