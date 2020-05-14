const HttpError = require('../models/http-error')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // Get token string
    if (!token){
      throw new Error('Auth token not found')
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.userData = { userId: decoded.userId }
    next();
  } catch(err) {
    const error = new HttpError('Authentication failed', 401);
    next(error)
  }
}