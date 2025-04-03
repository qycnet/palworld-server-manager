import api from './api';

export interface Player {
  id: string;
  name: string;
  steamId: string;
  status: 'online' | 'offline' | 'banned';
  lastSeen: string;
  playTime: string;
  level?: number;
  guild?: string;
  ipAddress?: string;
}

export const getPlayers = async (searchQuery?: string) => {
  try {
    const response = await api.get('/players', {
      params: { search: searchQuery }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

export const banPlayer = async (playerId: string, isBanned: boolean) => {
  try {
    const response = await api.post(`/players/${playerId}/${isBanned ? 'ban' : 'unban'}`);
    return response.data;
  } catch (error) {
    console.error('Error updating player ban status:', error);
    throw error;
  }
};

export const kickPlayer = async (playerId: string, reason?: string) => {
  try {
    const response = await api.post(`/players/${playerId}/kick`, { reason });
    return response.data;
  } catch (error) {
    console.error('Error kicking player:', error);
    throw error;
  }
};

export const sendMessage = async (playerId: string, message: string) => {
  try {
    const response = await api.post(`/players/${playerId}/message`, { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getPlayerDetails = async (playerId: string) => {
  try {
    const response = await api.get(`/players/${playerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player details:', error);
    throw error;
  }
};

export const updatePlayerPermissions = async (playerId: string, permissions: string[]) => {
  try {
    const response = await api.put(`/players/${playerId}/permissions`, { permissions });
    return response.data;
  } catch (error) {
    console.error('Error updating player permissions:', error);
    throw error;
  }
};