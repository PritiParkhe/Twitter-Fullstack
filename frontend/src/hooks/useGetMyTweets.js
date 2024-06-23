import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllApiUrls from '../utils/constants';
import { getAllTweets } from '../store/tweetSlice';
import { toast } from "react-toastify";

const useGetMyTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh, isActive } = useSelector((store) => store.tweet);

  const fetchMyTweets = useCallback(async () => {
    if (!id) return;  // Ensure ID is present

    try {
      const url = AllApiUrls.getMyTweets.Url(id);  // Ensure the correct usage of URL generation
      const response = await fetch(url, {
        method: AllApiUrls.getMyTweets.method,
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging: check fetched data
        dispatch(getAllTweets(data.tweets)); // Dispatch action to update tweets in Redux store
      } else {
        console.error('Failed to fetch tweets');
      }
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  }, [dispatch, id]);

  const getFollowingTweet = useCallback(async () => {
    try {
      const response = await fetch(AllApiUrls.followingTweet.Url(id), {
        method: AllApiUrls.followingTweet.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(getAllTweets(data.tweets));
      } else {
        console.error('Failed to fetch following tweets');
      }
    } catch (error) {
      toast.error("Failed to get tweet");
      console.log('get tweet error:', error); 
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (isActive) {
      fetchMyTweets();
    } else {
      getFollowingTweet();
    }
  }, [isActive, refresh, fetchMyTweets, getFollowingTweet]);

  return null;
};

export default useGetMyTweets;
