const project = require(__basedir + '/controllers/blog-post-controller'),
      express = require('express'),
      auth = require(__basedir + '/middleware/auth-check'),
      router = express.Router()

// Create
router.post('/', auth.authAdmin, project.createBlogPost)
//Read
router.get('/', project.getBlogPosts)
router.get('/:id', project.getBlogPost)
// Update
router.put('/:id', auth.authAdmin, project.updateBlogPost)
// Delete
router.delete('/:id', auth.authAdmin, project.deleteBlogPost)

module.exports = router