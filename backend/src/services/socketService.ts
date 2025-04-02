import { Server, Socket } from 'socket.io';
import logger from '../utils/logger';

export function setupWebSocketEvents(io: Server) {
  // 连接事件
  io.on('connection', (socket: Socket) => {
    logger.info(`新的WebSocket连接: ${socket.id}`);

    // 订阅服务器状态更新
    socket.on('subscribe:serverStatus', () => {
      socket.join('serverStatus');
      logger.debug(`客户端 ${socket.id} 订阅了服务器状态更新`);
    });

    // 订阅玩家列表更新
    socket.on('subscribe:playerList', () => {
      socket.join('playerList');
      logger.debug(`客户端 ${socket.id} 订阅了玩家列表更新`);
    });

    // 断开连接
    socket.on('disconnect', () => {
      logger.info(`WebSocket连接断开: ${socket.id}`);
    });
  });

  // 广播服务器状态
  function broadcastServerStatus(status: any) {
    io.to('serverStatus').emit('serverStatus:update', status);
  }

  // 广播玩家列表
  function broadcastPlayerList(players: any[]) {
    io.to('playerList').emit('playerList:update', players);
  }

  // 广播系统消息
  function broadcastSystemMessage(message: string) {
    io.emit('system:message', message);
  }

  return {
    broadcastServerStatus,
    broadcastPlayerList,
    broadcastSystemMessage,
  };
}