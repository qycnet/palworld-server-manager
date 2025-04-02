import api from './api';

export interface Player {
  id: string;
  name: string;
  steamId: string;
  status: 'online' | 'offline' | 'banned';
  lastSeen: string;
  playTime: string;
}

const playerService = {
  /**
   * 获取所有玩家列表
   */
  getAllPlayers: async (): Promise<Player[]> => {
    return api.get('/players');
  },

  /**
   * 获取在线玩家列表
   */
  getOnlinePlayers: async (): Promise<Player[]> => {
    return api.get('/players/online');
  },

  /**
   * 获取单个玩家信息
   */
  getPlayer: async (playerId: string): Promise<Player> => {
    return api.get(`/players/${playerId}`);
  },

  /**
   * 封禁玩家
   */
  banPlayer: async (playerId: string, reason: string): Promise<void> => {
    return api.post(`/players/${playerId}/ban`, { reason });
  },

  /**
   * 解封玩家
   */
  unbanPlayer: async (playerId: string): Promise<void> => {
    return api.post(`/players/${playerId}/unban`);
  },

  /**
   * 踢出玩家
   */
  kickPlayer: async (playerId: string, reason: string): Promise<void> => {
    return api.post(`/players/${playerId}/kick`, { reason });
  },

  /**
   * 向玩家发送消息
   */
  sendMessageToPlayer: async (playerId: string, message: string): Promise<void> => {
    return api.post(`/players/${playerId}/message`, { message });
  },

  /**
   * 搜索玩家
   */
  searchPlayers: async (query: string): Promise<Player[]> => {
    return api.get('/players/search', { params: { query } });
  },
};

export default playerService;