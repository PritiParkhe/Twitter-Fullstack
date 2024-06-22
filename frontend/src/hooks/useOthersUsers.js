import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AllApiUrls from "../utils/constants";
import { getOtherUsers } from "../store/userSlice";

const useOtherUsers = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsersProfile = async () => {
      try {
        const url = AllApiUrls.getOtherUsersProfile.Url(id);
        const response = await fetch(url, {
          method: AllApiUrls.getOtherUsersProfile.method,
          credentials: "include",
          withCredentials: true,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data.otherUsers); // Debugging output
          dispatch(getOtherUsers(data.otherUsers));
        } else {
          console.error("Failed to fetch other users' profiles");
        }
      } catch (error) {
        console.error("Error fetching other users' profiles:", error);
      }
    };

    if (id) {
      fetchOtherUsersProfile();
    }
  }, [id, dispatch]);
};

export default useOtherUsers;
