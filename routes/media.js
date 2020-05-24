const media = require("../controllers/media-contoller"),
      express = require("express"),
      router = express.Router(),
      auth = require('../middleware/auth-check'),
      fileUpload = require("../middleware/file-upload")

router.post("/", auth.checkLoggedIn , auth.authRole('admin'), fileUpload.single("image"), media.createMedia)
router.get("/", media.getAllMedia)
router.get("/:id", media.getMediaById)

module.exports = router
