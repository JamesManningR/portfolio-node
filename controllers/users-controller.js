const User = require('../models/user'),
      HttpError = require('../models/http-error'),
      webToken = require('jsonwebtoken'),
      bcrypt = require('bcryptjs');

function generateToken(userdata){
  let token
  try{
    token = webToken.sign(
      { userId: userdata.id, name: userdata.name },
      process.env.SECRET_KEY,
      { expiresIn: '3h' }
    )
  } catch(err) {
    const error = new HttpError(
      'Signup failed, please try again',
      500
    )
    return next(error)
  }
  return token
}

const createUser = async (req, res, next) =>{
  const { name, password } = req.body;

  let existingUser;
  try{
    existingUser = await User.findOne({ name });
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

  let hashedPass;
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
    name,
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

  token = generateToken(createdUser)

  res.status(201).json({ userId: createdUser.id, name: createdUser.email, token });
}

const loginUser = async(req, res, next) => {
  const { name, password } = req.body;

  let existingUser;
  try{
    existingUser = await User.findOne({ name })
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

  let passwordCorrect = false;
  try{
    passwordCorrect = await bcrypt.compare(password, existingUser.password);
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

  token = await generateToken(existingUser)

  res.json({
    userId: existingUser.id,
    name: existingUser.name,
    token: token
  })
}

module.exports = {
  createUser,
  loginUser
}