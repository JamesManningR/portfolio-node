const project = require('../controllers/projects-controller'),
      express = require('express'),
      auth = require('../middleware/auth-check'),
      router = express.Router()

router.post('/', auth, project.createProject)
router.get('/', project.getProjects)
router.get('/:id', project.getProject)

module.exports = router