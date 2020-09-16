const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    images: [{ type: mongoose.Types.ObjectId, ref: "Media" }],
    featuredImage: { type: mongoose.Types.ObjectId, ref: "Media" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
