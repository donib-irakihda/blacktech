const express = require("express");
const session = require('express-session')

const userRouter = require("./routes/userRoutes");

const app = express();
require("dotenv").config();
require("./configs/dbConfig")

app.use(express.json())

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

app.use('/api/user', userRouter)


const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV !== "test")
  app.listen(PORT, () => {
    console.log(`Server connected to port ${PORT}`);
  });

module.exports = { app };
