import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AllApiUrls from '../utils/constants';
import { getMyProfile } from '../store/userSlice';

const useGetUserProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const url = AllApiUrls.getProfile.Url(id);
        const response = await fetch(url, {
          method: AllApiUrls.getProfile.method,
          credentials: 'include',
          withCredentials: true,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data:', data); // Add a console log to debug the data
          dispatch(getMyProfile(data.user)); // Ensure the response structure is correct
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (id) {
      fetchUserProfile();
    }
  }, [id, dispatch]);
};

export default useGetUserProfile;
