const express = require('express'),
      router = express.Router(),
      user = require(__basedir + '/controllers/users-controller')

router.post("/login", user.loginUser)
router.post("/register", user.createUser)

module.exports = router