import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
      default: ""
    },
    references: {
      type: [String],
      default: []
    },
    updatedByAI: {
      type: Boolean,
      default: false
    },
    references: [String],
    content: String

  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
