import api from './api';

export interface ServerConfig {
  serverName: string;
  serverDescription: string;
  maxPlayers: number;
  serverPassword: string;
  adminPassword: string;
  dayTimeSpeedRate: number;
  nightTimeSpeedRate: number;
  expRate: number;
  palCaptureRate: number;
  palSpawnNumRate: number;
  palDamageRateAttack: number;
  palDamageRateDefense: number;
  playerDamageRateAttack: number;
  playerDamageRateDefense: number;
  difficultyRate: number;
  enablePlayerToPlayerDamage: boolean;
  enableFriendlyFire: boolean;
  enableInvaderEnemy: boolean;
  enableAimAssistPad: boolean;
  enableAimAssistKeyboard: boolean;
  dropItemMaxNum: number;
  dropItemMaxNum_UNKO: number;
  baseCampMaxNum: number;
  baseCampWorkerMaxNum: number;
  dropItemAliveMaxHours: number;
  autoResetGuildNoOnlinePlayers: number;
  autoResetGuildTimeNoOnlinePlayers: number;
  guildPlayerMaxNum: number;
  palEggDefaultHatchingTime: number;
  workSpeedRate: number;
  isMultiplay: boolean;
  isPvP: boolean;
  canPickupOtherGuildDeathPenaltyDrop: boolean;
  enableNonLoginPenalty: boolean;
  enableFastTravel: boolean;
  isStartLocationSelectByMap: boolean;
  existPlayerAfterLogout: boolean;
  enableDefenseOtherGuildPlayer: boolean;
  coopPlayerMaxNum: number;
}

export const getServerConfig = async (): Promise<ServerConfig> => {
  try {
    const response = await api.get('/server/config');
    return response.data;
  } catch (error) {
    console.error('Error fetching server config:', error);
    throw error;
  }
};

export const updateServerConfig = async (config: Partial<ServerConfig>): Promise<ServerConfig> => {
  try {
    const response = await api.put('/server/config', config);
    return response.data;
  } catch (error) {
    console.error('Error updating server config:', error);
    throw error;
  }
};