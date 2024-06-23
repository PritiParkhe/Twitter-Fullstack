import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AllApiUrls from "../utils/constants";
import { getMyProfile } from "../store/userSlice";

const useGetUserProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const url = AllApiUrls.getProfile.Url(id);
        const response = await fetch(url, {
          method: AllApiUrls.getProfile.method,
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          dispatch(getMyProfile(data.user)); // Dispatch action to update profile in Redux store
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (id) {
      fetchUserProfile();
    }
  }, [id, dispatch]);

  // No return statement is needed for a custom hook
};

export default useGetUserProfile;
