const db = require('../services/mongoose'),
      express = require('express'),
      router = express.Router();

router.post('/', db.createProject);
router.get('/', db.getProject);

module.exports = router;