import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  articleTitle: {
    type: String,
    required: true,
  },
  articleSubHeading: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  follower: {
    type: Array,
    required: true,
    default: [],
  },
  following: {
    type: Array,
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: Number,
    default: 0,
  },
  articleImage: {
    type: String,
    required: true,
  },
  articleContent: {
    type: String,
    required: true,
  },
});

const articleNewSchema = mongoose.model("articles", BlogSchema);
export default articleNewSchema;
