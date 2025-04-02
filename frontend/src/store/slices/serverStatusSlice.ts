import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServerStatus {
  status: 'online' | 'offline';
  uptime: string;
  version: string;
  playerCount: number;
  maxPlayers: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

const initialState: ServerStatus = {
  status: 'offline',
  uptime: '0',
  version: '',
  playerCount: 0,
  maxPlayers: 0,
  cpuUsage: 0,
  memoryUsage: 0,
  diskUsage: 0,
};

const serverStatusSlice = createSlice({
  name: 'serverStatus',
  initialState,
  reducers: {
    updateServerStatus: (state, action: PayloadAction<ServerStatus>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateServerStatus } = serverStatusSlice.actions;
export default serverStatusSlice.reducer;