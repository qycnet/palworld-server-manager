import { configureStore } from '@reduxjs/toolkit';
import serverStatusReducer from './slices/serverStatusSlice';
import playerManagementReducer from './slices/playerManagementSlice';

export const store = configureStore({
  reducer: {
    serverStatus: serverStatusReducer,
    playerManagement: playerManagementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;