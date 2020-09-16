const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const User = require("../models/user");

const checkLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization; // Get token string
    if (!token) {
      const error = new HttpError("No Auth token Found", 401);
      next(error);
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = { userId: decoded.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed", 401);
    next(error);
  }
};

const authAdmin = async (req, res, next) => {
  // TODO: Try to use the checkLoggedIn logic to reduce this code footprint
  try {
    // Check if user is logged in
    const token = req.headers.authorization; // Get token string
    if (!token) {
      const error = new HttpError("No Auth token Found", 401);
      return next(error);
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = { userId: decoded.userId };
    // If they are logged in, check if the user has the role of 'admin'
    const foundUser = await User.findOne({ _id: decoded.userId });
    if (foundUser.role !== "admin") {
      const error = new HttpError(
        "User does not have permissions to do that",
        401
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Authentication failed", 401);
    return next(error);
  }
  return next();
};

module.exports = {
  checkLoggedIn,
  authAdmin,
};
