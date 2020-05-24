const project = require('../controllers/projects-controller'),
      express = require('express'),
      auth = require('../middleware/auth-check'),
      router = express.Router()

// Create
router.post('/', auth.checkLoggedIn, auth.authRole('admin'), project.createProject)
//Read
router.get('/', project.getProjects)
router.get('/:id', project.getProject)
// Update
router.put('/:id', auth.checkLoggedIn, auth.authRole('admin'), project.updateProject)
// Delete
router.delete('/:id', auth.checkLoggedIn, auth.authRole('admin'), project.deleteProject)

module.exports = router