const express = require("express");

const userRouter = express.Router();

const{auth, isLoggedIn, isLoggedOut} = require('../middlewares/auth')

const { registerUser, loginUser, logoutUser } = require("../controllers/userController");

userRouter.post("/register", isLoggedOut, registerUser);

userRouter.post("/login", isLoggedOut, loginUser);

userRouter.post('/logout', isLoggedIn, logoutUser)
module.exports = userRouter