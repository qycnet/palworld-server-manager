import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Player {
  id: string;
  name: string;
  steamId: string;
  status: 'online' | 'offline' | 'banned';
  lastSeen: string;
  playTime: string;
}

interface PlayerManagementState {
  players: Player[];
  loading: boolean;
  error: string | null;
}

const initialState: PlayerManagementState = {
  players: [],
  loading: false,
  error: null,
};

const playerManagementSlice = createSlice({
  name: 'playerManagement',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
    },
    updatePlayer: (state, action: PayloadAction<Player>) => {
      const index = state.players.findIndex(player => player.id === action.payload.id);
      if (index !== -1) {
        state.players[index] = action.payload;
      }
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter(player => player.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPlayers,
  addPlayer,
  updatePlayer,
  removePlayer,
  setLoading,
  setError,
} = playerManagementSlice.actions;

export default playerManagementSlice.reducer;