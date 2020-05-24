const HttpError = require('../models/http-error'),
      jwt = require('jsonwebtoken')

function checkLoggedIn(req, res, next) {
  try {
    const token = req.headers.authorization // Get token string
    if (!token){
      const error = new HttpError('No Auth token Found', 401)
      next(error)
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.userData = { userId: decoded.userId }
    next();
  } catch(err) {
    const error = new HttpError('Authentication failed', 401)
    next(error)
  }
}

function authRole(req, res, next, role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      const error = new HttpError('Authentication failed', 401)
      next( error )
    }
    next()
  }
}

module.exports = {
  checkLoggedIn,
  authRole
}