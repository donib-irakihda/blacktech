const jwt = require("jsonwebtoken");
const SECRET_JWT = process.env.SECRET_JWT;

const auth = async (req, res, next) => {
  try {
    let token = request.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_JWT);
      req.userId = user.id;
    } else {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    next();

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unauthorized user" });
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    if(req.session.user) {
      next();
    } else {
      return res.status(401).json({message: "You need to log in first"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Something went wrong"})
  }
}


const isLoggedOut = async (req, res, next) => {
  try {
    if(req.session.user) {
      return res.status(401).json({message: "Already logged in. Logout first"})
    }
    next();
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Something went wrong"})
  }
}

module.exports = {auth, isLoggedIn, isLoggedOut}