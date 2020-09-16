const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const UPLOAD_PATH = "./uploads";

// Generate unique file name
function generateUniqueFileName(fileName, ext) {
  let generated = `${fileName}-${crypto.randomBytes(8).toString("hex")}${ext}`;
  // Prevent any repeated file names
  while (fs.existsSync(UPLOAD_PATH + generated)) {
    generated = `${fileName}-${crypto.randomBytes(8).toString("hex")}${ext}`;
  }
  return generated;
}
const storage = multer.diskStorage({
  destination: UPLOAD_PATH,
  filename(req, file, cb) {
    cb(
      null,
      generateUniqueFileName(file.fieldname, path.extname(file.originalname))
    );
  },
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed types
  const fileTypes = /jpeg|jpg|png/;
  // Check extension
  const extNameAllowed = path.extname(file.originalname);
  // Check Mime
  const mimetypeAllowed = fileTypes.test(file.mimetype);

  if (mimetypeAllowed && extNameAllowed) {
    return cb(null, true);
  }
  cb("Error: Incorrect type");
}

upload = multer({
  storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

module.exports = upload;
