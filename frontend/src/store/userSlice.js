import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    otherUsers: [],
    profile: null
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    getMyProfile: (state, action) => {
      state.profile = action.payload;
    },
    followingUpdate:(state,action)=>{
      const userId = action.payload
      //unfollow
      if(state.user.following.includes(userId)){
        state.user.following = state.user.following.filter((id)=>{
          return id !== userId;
        })

      }else{
        state.user.following.push(userId);
      }

    }
  }
});

export const { getUser, getOtherUsers, getMyProfile, followingUpdate } = userSlice.actions;
export default userSlice.reducer;
