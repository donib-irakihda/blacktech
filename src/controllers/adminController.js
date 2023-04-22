const User = require("../models/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

const verifyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const matchPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (matchPassword) {
        if (existingUser.userType === "user") {
          return res.status(500).json({ error: "Invalid Credentials" });
        } else {
          // req.session.user = {};
          req.session.user = existingUser;
          res.status(200).json({ message: "Login Success", admin: existingUser });
        }
      } else {
        return res.status(500).json({ error: "Invalid Credentials" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const logoutAdmin = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: "Admin Logout Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Logout failed" });
  }
};

const adminDashboard = async (req, res) => {
  try {
    const userData = await User.find({userType:'user'})
    res.status(200).json({Users: userData})
  } catch (error) {
    console.log(error)
  }
}

const addUser = async (req, res) => {
  try {
    const {name, email, password, phoneNumber, userType } = req.body
    const existingUser = await User.findOne({email: email})

    if(existingUser) {
      return res.status(500).json({error: "User with this email already exists"})
    }

    hashedPassword = await bcrypt.hash(password, 10)
    const user = new User ({
      name: name,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      userType: userType
    })

    const newUser = await user.save()
    const token = jwt.sign({email: newUser.email, id: newUser._id}, process.env.SECRET_JWT)

    res.status(200).json({message: "User created successfully", user: newUser, token: token})

  } catch(error) {
    console.log(error)
    res.status(500).json({error: "User registration failed"})
  }
}

module.exports = { verifyLogin, logoutAdmin, adminDashboard, addUser };
