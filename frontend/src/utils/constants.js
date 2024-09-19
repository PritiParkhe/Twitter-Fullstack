const backendDomain = process.env.REACT_APP_BACKEND_URL;
console.log("Backend Domain:", backendDomain);

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
    method: "get",
  },
  createStory: {
    Url: `${backendDomain}/api/createstory`,
    method: "post",
  },
  myStory: {
    Url: `${backendDomain}/api/mystory`,
    method: "get",
  },
  likeStory: {
    Url: (storyId) => `${backendDomain}/api/likes-stories/${storyId}`,
    method: "post",
  },
  deleteStory: {
    Url: (storyId) => `${backendDomain}/api/delete-story/${storyId}`,
    method: "delete",
  },
  viewsStory: {
    Url: (storyId) => `${backendDomain}/api/views-stories/${storyId}`,
    method: "patch",
  },
  comment: {
    Url: (tweetId) => `${backendDomain}/api/comment/${tweetId}`,
    method: "post",
  },
  commentList: {
    Url: (tweetId) => `${backendDomain}/api/commentList/${tweetId}`,
    method: "get",
  },
  getConversation: {
    Url: `${backendDomain}/api/messages/conversation`,
    method: "get",
  },
  getMessage: {
    Url: (otherUserId) =>
      `${backendDomain}/api/messages/getmessage/${otherUserId}`,
    method: "get",
  },
  sendMessage: {
    Url: `${backendDomain}/api/messages`,
    method: "post",
  },
  getUserProfile: {
    Url: (query) => `${backendDomain}/api/getprofile/${query}`,
    method: "get",
  },
  freezeAccount:{
    Url: `${backendDomain}/api/freeze`,
    method: "put",
  },
  updateProfile:{
    Url: `${backendDomain}/api/update`,
    method: "put",
  }
    
  
};

export default AllApiUrls;
