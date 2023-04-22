const isLoggedIn = async (req, res, next) => {
  try {
    if (req.session.user && req.session.user.userType === 'admin') {
      next();
    } else {
      return res.status(401).json({ message: "You need to log in as admin first" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

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

module.exports = {isLoggedIn, isLoggedOut}