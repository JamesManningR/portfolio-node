const media = require(__basedir + "/controllers/media-contoller"),
      express = require("express"),
      router = express.Router(),
      auth = require(__basedir + '/middleware/auth-check'),
      fileUpload = require(__basedir + "/middleware/file-upload")

router.post("/", auth.authAdmin, fileUpload.single("image"), media.createMedia)
router.get("/", media.getAllMedia)
router.get("/:id", media.getMediaById)

module.exports = router
