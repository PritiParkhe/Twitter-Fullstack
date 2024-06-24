import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import tweetSlice from './tweetSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userSlice, // Assuming userSlice is the reducer function from userSlice.js
  tweet: tweetSlice, // Assuming tweetSlice is the reducer function from tweetSlice.js
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
