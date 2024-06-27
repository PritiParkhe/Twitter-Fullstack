import mongoose from "mongoose";

// Define the Comment schema
const commentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
    maxLength: 500,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Define the Tweet schema
const tweetSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      maxLength: 500,
      required: true,
    },
    img: {
      type: String,
    },
    like: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userDetails: {
      type: Array,
      default: [],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

// Create models
export const Comment = mongoose.model("Comment", commentSchema);
export const Tweet = mongoose.model("Tweet", tweetSchema);
