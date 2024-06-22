const backendDomain = 'http://localhost:8000';

const AllApiUrls = {
  signUp: {
    Url: `${backendDomain}/api/signup`,
    method: 'post'
  },
  login: {
    Url: `${backendDomain}/api/login`,
    method: 'post'
  },
  getProfile: {
    Url: (id) => `${backendDomain}/api/profile/${id}`,
    method: 'get'
  },
  getOtherUsersProfile: {
    Url: (id) => `${backendDomain}/api/others-profile/${id}`,
    method: 'get'
  }
};

export default AllApiUrls;
