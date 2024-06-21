import { useEffect } from "react";
import AllApiUrls from "../utils/constants"

const useGetUserProfile = async(id)=>{
  useEffect(()=>{
    try {
      const url = AllApiUrls.getProfile.Url(id);
      const response = fetch(url,{
        method: AllApiUrls.getProfile.method
      })
    } catch (error) {
      console.log(error);
    }

  },[])
  
}
export default useGetUserProfile;