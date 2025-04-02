import api from './api';

export interface ServerStatus {
  status: 'online' | 'offline';
  uptime: string;
  version: string;
  playerCount: number;
  maxPlayers: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

export interface ServerConfig {
  serverName: string;
  serverDescription: string;
  maxPlayers: number;
  serverPassword: string;
  adminPassword: string;
  rconEnabled: boolean;
  rconPort: number;
  rconPassword: string;
  pvpEnabled: boolean;
  difficulty: string;
  dayTimeSpeedRate: number;
  nightTimeSpeedRate: number;
  expRate: number;
  palCaptureRate: number;
  palSpawnNumRate: number;
  // 其他配置项...
}

const serverService = {
  /**
   * 获取服务器状态
   */
  getServerStatus: async (): Promise<ServerStatus> => {
    return api.get('/server/status');
  },

  /**
   * 重启服务器
   */
  restartServer: async (): Promise<void> => {
    return api.post('/server/restart');
  },

  /**
   * 停止服务器
   */
  stopServer: async (): Promise<void> => {
    return api.post('/server/stop');
  },

  /**
   * 启动服务器
   */
  startServer: async (): Promise<void> => {
    return api.post('/server/start');
  },

  /**
   * 获取服务器配置
   */
  getServerConfig: async (): Promise<ServerConfig> => {
    return api.get('/server/config');
  },

  /**
   * 更新服务器配置
   */
  updateServerConfig: async (config: ServerConfig): Promise<void> => {
    return api.put('/server/config', config);
  },

  /**
   * 执行服务器命令
   */
  executeCommand: async (command: string): Promise<{ result: string }> => {
    return api.post('/server/command', { command });
  },
};

export default serverService;