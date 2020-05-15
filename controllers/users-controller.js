const User = require('../models/user'),
      HttpError = require('../models/http-error'),
      webToken = require('jsonwebtoken'),
      bcrypt = require('bcryptjs')

function generateToken(userdata){
  let token
  try{
    token = webToken.sign(
      { userId: userdata.id, name: userdata.name },
      process.env.SECRET_KEY,
      { expiresIn: '2h' }
    ) 
  } catch(err) {
    const error = new HttpError(
      'Signup failed, please try again',
      500
    )
    return next(error)
  }
  const expiry = new Date();
  expiry.setHours( expiry.getHours() + 2);
  return { token, expiry}
}

const createUser = async (req, res, next) =>{
  const { username, password } = req.body;

  let existingUser
  try{
    existingUser = await User.findOne({ username })
  } catch (err){
    const error = new HttpError(
      'Sign up failed, please try again later',
      500
    );
    return next(error);
  }

  if (existingUser){
    const error = new HttpError(
      'User with this name already exists',
      422
    );
    return next(error);
  }

  let hashedPass
  try{
    hashedPass = await bcrypt.hash(password, 12);
  } catch(err){
    const error = new HttpError(
      'Creating user failed, please try again',
      500
    )
    return next(err)
  }

  const createdUser = new User({
    username,
    password: hashedPass
  })

  try {
    await createdUser.save()
  } catch (err) {
    const error = new HttpError(
      'Signup failed, please try again',
      500
    )
    return next(error)
  }

  authToken = generateToken(createdUser)

  res.status(201).json({ 
    userId: createdUser.id,
    username: createdUser.username,
    token: authToken.token,
    tokenExpiry: authToken.expiry
  })
}

const loginUser = async(req, res, next) => {
  const { username, password } = req.body

  let existingUser;
  try{
    existingUser = await User.findOne({ username })
  } catch(err) {
    const error = new HttpError(
      'Login Failed, please try again',
      500
    );
    return next(error);
  }

  if (!existingUser){
    const error = new HttpError(
      'Could not log in with credentials provided',
      401
    );
    return next(error)
  }

  let passwordCorrect = false
  try{
    passwordCorrect = await bcrypt.compare(password, existingUser.password)
  } catch(err) {
    const error = new HttpError(
      'Could not log in, please check credentials and try again',
      500
    )
    return next(error);
  }

  if (!passwordCorrect) {
    const error = new HttpError(
      'Could not log in with credentials provided',
      401
    )
    return next(error)
  }

  authToken = await generateToken(existingUser);

  res.json({
    userId: existingUser.id,
    username: existingUser.username,
    token: authToken.token,
    tokenExpiry: authToken.expiry
  })
}

module.exports = {
  createUser,
  loginUser
}