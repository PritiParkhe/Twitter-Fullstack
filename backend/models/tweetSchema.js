import mongoose, { Schema } from "mongoose";
//Define the comment schema
const commentSchema = new mongoose.Schema(
  {
    decription: {
      type: String,
      default: "",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

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
      default: "",
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
    comments: [commentSchema],
  },
  { timestamps: true }
);

// Create models

export const Tweet = mongoose.model("Tweet", tweetSchema);
