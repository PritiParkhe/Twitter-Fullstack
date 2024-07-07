import mongoose from "mongoose";

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
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        userProfilePic: {
          type: String,
        },
        username: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

// Create models

export const Tweet = mongoose.model("Tweet", tweetSchema);
