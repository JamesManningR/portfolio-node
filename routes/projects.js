const project = require('../controllers/projects-controller'),
      express = require('express'),
      router = express.Router();

router.post('/', project.createProject);
router.get('/', project.getProjects);
router.get('/:id', project.getProject);

module.exports = router;