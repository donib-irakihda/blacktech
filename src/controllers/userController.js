const User = require("../models/userModel");
const userRouter = require('../routes/userRoutes')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const SECRET_JWT = process.env.SECRET_JWT

const registerUser = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json("User already exists with this email ");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      userType: 'user',
    });

    const userData = await user.save();

    const token = jwt.sign({email: userData.email, id: userData._id}, SECRET_JWT)
    

    if (userData) {
      return res.status(201).json({ message: "User registered successfull", user: user, token: token });
    } else {
      return res.status(500).json({ message: "Registration failed." });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong')
  }
};

const loginUser = async (req,res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({email: email})
    if(!existingUser) {
      return res.status(404).json(`User with this email ${email} doesnot exist`)
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password)
    if(!matchPassword) {
      return res.status(500).json({error: "Invalid Credentials"})
    }

    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, SECRET_JWT)

    req.session.user = {};
    req.session.user._id = existingUser._id

    res.status(200).json({message: "Login Success", user: existingUser, token: token})

  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Something went wrong!!!"})
  }
}

const logoutUser = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({message: "Logout success"})
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Something went wrong"})
  }
}

module.exports = { registerUser, loginUser, logoutUser };
