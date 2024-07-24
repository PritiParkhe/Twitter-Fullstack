const backendDomain = "http://localhost:8000";

const AllApiUrls = {
  signUp: {
    Url: `${backendDomain}/api/signup`,
    method: "post",
  },
  login: {
    Url: `${backendDomain}/api/login`,
    method: "post",
  },
  getProfile: {
    Url: (id) => `${backendDomain}/api/profile/${id}`,
    method: "get",
  },
  getOtherUsersProfile: {
    Url: (id) => `${backendDomain}/api/others-profile/${id}`,
    method: "get",
  },
  getMyTweets: {
    Url: (id) => `${backendDomain}/api/all-tweets/${id}`,
    method: "get",
  },
  createPosts: {
    Url: `${backendDomain}/api/create-tweet`,
    method: "post",
  },
  likeOrDislike: {
    Url: (id) => `${backendDomain}/api/like/${id}`,
    method: "put",
  },
  deleteTweet: {
    Url: (id) => `${backendDomain}/api/delete-tweet/${id}`,
    method: "delete",
  },
  followingTweet: {
    Url: (id) => `${backendDomain}/api/following-tweets/${id}`,
    method: "get",
  },
  follow: {
    Url: (id) => `${backendDomain}/api/follow/${id}`,
    method: "post",
  },
  unfollow: {
    Url: (id) => `${backendDomain}/api/unfollow/${id}`,
    method: "post",
  },
  logout: {
    Url: `${backendDomain}/api/logout`,
    method: "get",
  },
  getAllStories: {
    Url: `${backendDomain}/api/allstories`,
    method: "GET",
  },
  createStory: {
    Url: `${backendDomain}/api/createstory`,
    method: "POST",
  },
  myStory: {
    Url: `${backendDomain}/api/mystory`,
    method: "get",
  },
  likeStory: {
    Url: (storyId) => `${backendDomain}/api/likes-stories/${storyId}`,
    method: "POST",
  },
  deleteStory: {
    Url: (storyId) => `${backendDomain}/api//delete-story/${storyId}`,
    method: "DELETE",
  },
  viewsStory: {
    Url: (storyId) => `${backendDomain}/api//views-stories/${storyId}`,
    method: "PATCH",
  },
};

export default AllApiUrls;
