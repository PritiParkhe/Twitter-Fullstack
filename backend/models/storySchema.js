import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  media_url: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  expires_at: {
    type: Date,
    required: true,
  },
  views_count: {
    type: Array,
    default: [],
  },
  likes: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      liked_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  reactions: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      reaction_type: {
        type: String,
        required: true,
      },
      reacted_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Story = mongoose.model("Story", storySchema);

export { Story };
