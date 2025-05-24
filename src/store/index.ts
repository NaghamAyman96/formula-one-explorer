import { configureStore } from '@reduxjs/toolkit';
import pinnedReducer from './pinnedSlice';

const store = configureStore({
  reducer: {
    pinned: pinnedReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;