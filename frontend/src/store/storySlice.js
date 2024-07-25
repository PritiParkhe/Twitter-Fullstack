import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
  name: "story",
  initialState: {
    stories: [],
    status: "idle",
    error: null,
  },
  reducers: {
    getAllStoriesSuccess: (state, action) => {
      state.stories = action.payload;
    },
    getMyStoriesSuccess: (state, action) => {
      state.userStories = action.payload;
    },
    getMyStoriesFailure: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
    incrementViewSuccess: (state, action) => {
      const story = state.stories.find((story) => story._id === action.payload);
      if (story) {
        story.views_count += 1;
      }
    },
    incrementLikeSuccess: (state, action) => {
      const story = state.stories.find((story) => story._id === action.payload);
      if (story) {
        story.likes.push(action.payload.userId);
      }
    },
    deleteStorySuccess: (state, action) => {
      state.stories = state.stories.filter(
        (story) => story._id !== action.payload
      );
    },
    createStorySuccess: (state, action) => {
      state.stories.push(action.payload);
    },
    getRefresh:(state)=>{
      state.refresh = !state.refresh;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getAllStoriesSuccess,
  getMyStoriesSuccess,
  getMyStoriesFailure,
  incrementViewSuccess,
  incrementLikeSuccess,
  deleteStorySuccess,
  createStorySuccess,
  getRefresh,
  setError,
} = storySlice.actions;

export default storySlice.reducer;
