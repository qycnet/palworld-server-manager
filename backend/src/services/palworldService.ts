import axios from 'axios';
import logger from '../utils/logger';

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

/**
 * PalWorld API 服务
 * 用于与 PalWorld 游戏服务器的 REST API 交互
 */
export class PalworldService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.PALWORLD_API_URL || 'http://localhost:8000/api';
    this.apiKey = process.env.PALWORLD_API_KEY || '';
  }

  /**
   * 创建API请求实例
   */
  private createApiClient() {
    return axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      timeout: 10000,
    });
  }

  /**
   * 获取服务器状态
   */
  async getServerStatus() {
    try {
      const api = this.createApiClient();
      const response = await api.get('/server/status');
      return response.data;
    } catch (error) {
      logger.error('获取服务器状态失败:', error);
      throw error;
    }
  }

  /**
   * 获取玩家列表，支持搜索
   */
  async getPlayers(searchQuery?: string) {
    try {
      const api = this.createApiClient();
      const response = await api.get('/players', {
        params: { search: searchQuery }
      });
      return response.data;
    } catch (error) {
      logger.error('获取玩家列表失败:', error);
      throw error;
    }
  }

  /**
   * 获取玩家详细信息
   */
  async getPlayerDetails(playerId: string) {
    try {
      const api = this.createApiClient();
      const response = await api.get(`/players/${playerId}`);
      return response.data;
    } catch (error) {
      logger.error(`获取玩家 ${playerId} 详细信息失败:`, error);
      throw error;
    }
  }

  /**
   * 获取在线玩家列表
   */
  async getOnlinePlayers() {
    try {
      const api = this.createApiClient();
      const response = await api.get('/players/online');
      return response.data;
    } catch (error) {
      logger.error('获取在线玩家列表失败:', error);
      throw error;
    }
  }

  /**
   * 更新玩家封禁状态
   */
  async updatePlayerBanStatus(playerId: string, isBanned: boolean, reason?: string) {
    try {
      const api = this.createApiClient();
      const response = await api.post(`/players/${playerId}/${isBanned ? 'ban' : 'unban'}`, { reason });
      return response.data;
    } catch (error) {
      logger.error(`${isBanned ? '封禁' : '解封'}玩家 ${playerId} 失败:`, error);
      throw error;
    }
  }

  /**
   * 踢出玩家
   */
  async kickPlayer(playerId: string, reason?: string) {
    try {
      const api = this.createApiClient();
      const response = await api.post(`/players/${playerId}/kick`, { reason });
      return response.data;
    } catch (error) {
      logger.error(`踢出玩家 ${playerId} 失败:`, error);
      throw error;
    }
  }

  /**
   * 向玩家发送消息
   */
  async sendMessageToPlayer(playerId: string, message: string) {
    try {
      const api = this.createApiClient();
      const response = await api.post(`/players/${playerId}/message`, { message });
      return response.data;
    } catch (error) {
      logger.error(`向玩家 ${playerId} 发送消息失败:`, error);
      throw error;
    }
  }

  /**
   * 更新玩家权限
   */
  async updatePlayerPermissions(playerId: string, permissions: string[]) {
    try {
      const api = this.createApiClient();
      const response = await api.put(`/players/${playerId}/permissions`, { permissions });
      return response.data;
    } catch (error) {
      logger.error(`更新玩家 ${playerId} 权限失败:`, error);
      throw error;
    }
  }

  /**
   * 向所有玩家广播消息
   */
  async broadcastMessage(message: string) {
    try {
      const api = this.createApiClient();
      const response = await api.post('/server/broadcast', { message });
      return response.data;
    } catch (error) {
      logger.error('广播消息失败:', error);
      throw error;
    }
  }

  /**
   * 保存游戏世界
   */
  async saveWorld() {
    try {
      const api = this.createApiClient();
      const response = await api.post('/world/save');
      return response.data;
    } catch (error) {
      logger.error('保存游戏世界失败:', error);
      throw error;
    }
  }

  /**
   * 重启服务器
   */
  async restartServer() {
    try {
      const api = this.createApiClient();
      const response = await api.post('/server/restart');
      return response.data;
    } catch (error) {
      logger.error('重启服务器失败:', error);
      throw error;
    }
  }

  /**
   * 停止服务器
   */
  async stopServer() {
    try {
      const api = this.createApiClient();
      const response = await api.post('/server/stop');
      return response.data;
    } catch (error) {
      logger.error('停止服务器失败:', error);
      throw error;
    }
  }

  /**
   * 启动服务器
   */
  async startServer() {
    try {
      const api = this.createApiClient();
      const response = await api.post('/server/start');
      return response.data;
    } catch (error) {
      logger.error('启动服务器失败:', error);
      throw error;
    }
  }

  /**
   * 执行RCON命令
   */
  async executeCommand(command: string) {
    try {
      const api = this.createApiClient();
      const response = await api.post('/server/command', { command });
      return response.data;
    } catch (error) {
      logger.error(`执行命令 "${command}" 失败:`, error);
      throw error;
    }
  }

  /**
   * 获取服务器配置
   */
  async getServerConfig() {
    try {
      const api = this.createApiClient();
      const response = await api.get('/server/config');
      return response.data;
    } catch (error) {
      logger.error('获取服务器配置失败:', error);
      throw error;
    }
  }

  /**
   * 更新服务器配置
   */
  async updateServerConfig(config: any) {
    try {
      const api = this.createApiClient();
      const response = await api.put('/server/config', config);
      return response.data;
    } catch (error) {
      logger.error('更新服务器配置失败:', error);
      throw error;
    }
  }
}