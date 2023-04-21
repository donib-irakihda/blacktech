const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  userType: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
  },
  // isVerified: {
  //   type: Number,
  //   default: 0,
  // },
}, { timestamps: true});

module.exports = mongoose.model("User", userSchema);
