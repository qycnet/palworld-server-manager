import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import rateLimit from 'express-rate-limit';

import serverRoutes from './routes/serverRoutes';
import playerRoutes from './routes/playerRoutes';
import worldRoutes from './routes/worldRoutes';
import authRoutes from './routes/authRoutes';
import serverConfigRoutes from './routes/serverConfigRoutes';
import { errorHandler } from './utils/errorHandler';
import { setupWebSocketEvents } from './services/socketService';
import { initializeDatabase } from './models/database';
import logger from './utils/logger';

// 加载环境变量
dotenv.config();

// 初始化数据库
initializeDatabase();

// 创建Express应用
const app = express();
const httpServer = createServer(app);

// 设置Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
});

// 中间件
app.use(helmet()); // 安全头
app.use(cors()); // 跨域
app.use(express.json()); // JSON解析
app.use(morgan('dev')); // 日志

// 限流
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 每个IP 15分钟内限制100次请求
});
app.use(limiter);

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/server', serverRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/world', worldRoutes);
app.use('/api/server/config', serverConfigRoutes);

// 错误处理
app.use(errorHandler);

// 设置WebSocket事件
setupWebSocketEvents(io);

// 启动服务器
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  logger.info(`服务器运行在 http://localhost:${PORT}`);
});