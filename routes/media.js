const media = require("../controllers/media-contoller"),
      express = require("express"),
      router = express.Router(),
      fileUpload = require("../middleware/file-upload")

router.post("/", fileUpload.single("image"), media.createMedia)
router.get("/", media.getAllMedia)
router.get("/:id", media.getMediaById)

module.exports = router
