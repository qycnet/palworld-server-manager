import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import logger from '../utils/logger';

// 数据库连接
let db: any = null;

/**
 * 初始化数据库
 */
export async function initializeDatabase() {
  try {
    const dbPath = path.resolve(process.env.DB_PATH || './data/palworld.db');
    
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    logger.info(`数据库已连接: ${dbPath}`);

    // 创建表
    await createTables();
    
    return db;
  } catch (error) {
    logger.error('数据库初始化失败:', error);
    throw error;
  }
}

/**
 * 创建必要的表
 */
async function createTables() {
  // 用户表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 服务器配置表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS server_config (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 玩家表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      steam_id TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      status TEXT NOT NULL,
      last_seen DATETIME,
      play_time INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 备份表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS backups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      path TEXT NOT NULL,
      size INTEGER NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 命令历史表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS command_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      command TEXT NOT NULL,
      response TEXT,
      user_id INTEGER,
      executed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  logger.info('数据库表已创建');
}

/**
 * 获取数据库连接
 */
export function getDatabase() {
  if (!db) {
    throw new Error('数据库未初始化');
  }
  return db;
}

/**
 * 关闭数据库连接
 */
export async function closeDatabase() {
  if (db) {
    await db.close();
    logger.info('数据库连接已关闭');
  }
}