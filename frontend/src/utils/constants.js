const backendDomain ='http://localhost:8000'

const AllApiUrls = {
  signUp: {
    Url: `${backendDomain}/api/signup`,
    method: 'post'
  },
  login : {
    Url:`${backendDomain}/api/login`,
    method: 'post'
  },
  getProfile :{
    Url : `${backendDomain}/api/profile`,
    method: 'get'
  }
};


export default AllApiUrls;
