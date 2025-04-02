import api from './api';

export interface WorldInfo {
  name: string;
  seed: string;
  size: string;
  creationDate: string;
  lastPlayed: string;
  daysPassed: number;
}

export interface BackupInfo {
  id: string;
  name: string;
  date: string;
  size: string;
  description: string;
}

const worldService = {
  /**
   * 获取世界信息
   */
  getWorldInfo: async (): Promise<WorldInfo> => {
    return api.get('/world/info');
  },

  /**
   * 获取所有备份
   */
  getAllBackups: async (): Promise<BackupInfo[]> => {
    return api.get('/world/backups');
  },

  /**
   * 创建备份
   */
  createBackup: async (name: string, description: string): Promise<BackupInfo> => {
    return api.post('/world/backups', { name, description });
  },

  /**
   * 恢复备份
   */
  restoreBackup: async (backupId: string): Promise<void> => {
    return api.post(`/world/backups/${backupId}/restore`);
  },

  /**
   * 删除备份
   */
  deleteBackup: async (backupId: string): Promise<void> => {
    return api.delete(`/world/backups/${backupId}`);
  },

  /**
   * 执行世界命令
   */
  executeWorldCommand: async (command: string): Promise<{ result: string }> => {
    return api.post('/world/command', { command });
  },
};

export default worldService;