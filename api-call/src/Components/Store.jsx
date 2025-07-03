// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './PlayerSlice';

const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});

export default store;
