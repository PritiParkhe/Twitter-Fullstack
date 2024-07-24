import AllApiUrls from '../utils/constants.js';
import {
  getAllStoriesSuccess,
  getMyStoriesSuccess, // Add this import
  incrementViewSuccess,
  incrementLikeSuccess,
  deleteStorySuccess,
  createStorySuccess,
  setError,
} from '../store/storySlice.js';

// actions/storyActions.js

// actions/storyActions.js
export const fetchAllStories = () => async (dispatch) => {
  try {
    const response = await fetch(AllApiUrls.getAllStories.Url, {
      method: AllApiUrls.getAllStories.method,
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(getAllStoriesSuccess(data.stories));
    } else {
      dispatch(setError(data.message));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Fetch stories for the current user
// actions/storyActions.js
export const fetchMyStories = () => async (dispatch) => {
  try {
    const response = await fetch(AllApiUrls.myStory.Url, {
      method: AllApiUrls.myStory.method,
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(getMyStoriesSuccess(data.stories));
    } else {
      dispatch(setError(data.message));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};


export const createStory = (formData) => async (dispatch) => {
  try {
    const response = await fetch(AllApiUrls.createStory.Url, {
      method: AllApiUrls.createStory.method,
      credentials: 'include',
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(createStorySuccess(data.story));
    } else {
      dispatch(setError(data.message));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const likeStory = (storyId, userId) => async (dispatch) => {
  try {
    const response = await fetch(AllApiUrls.likeStory.Url(storyId), {
      method: AllApiUrls.likeStory.method,
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(incrementLikeSuccess({ storyId, userId }));
    } else {
      dispatch(setError(data.message));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteStory = (storyId) => async (dispatch) => {
  try {
    const response = await fetch(AllApiUrls.deleteStory.Url(storyId), {
      method: AllApiUrls.deleteStory.method,
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(deleteStorySuccess(storyId));
    } else {
      dispatch(setError(data.message));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const incrementView = (storyId, userId) => async (dispatch) => {
  try {
    const response = await fetch(AllApiUrls.viewsStory.Url(storyId), {
      method: AllApiUrls.viewsStory.method,
      credentials: 'include',
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(incrementViewSuccess(storyId));
    } else {
      dispatch(setError(data.message));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};
