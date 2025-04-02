# 幻兽帕鲁服务器管理器

一个现代化的Web应用程序，用于管理幻兽帕鲁（PalWorld）游戏服务器。提供直观的用户界面，实时监控和管理功能。

## 功能特点

- 📊 实时服务器状态监控
- 👥 玩家管理系统
- ⚙️ 服务器配置管理
- 🌍 世界管理
- 🔄 备份系统
- 📱 响应式设计

## 技术栈

### 前端
- React.js
- TypeScript
- Ant Design Pro
- Redux Toolkit
- Socket.IO Client
- Axios

### 后端
- Node.js
- Express
- TypeScript
- SQLite
- Socket.IO
- Winston

## 快速开始

### 前提条件
- Node.js >= 16.x
- npm >= 8.x

### 安装与运行

1. 克隆仓库
```bash
git clone https://github.com/yourusername/palworld-server-manager.git
cd palworld-server-manager
```

2. 安装前端依赖
```bash
cd frontend
npm install
```

3. 安装后端依赖
```bash
cd ../backend
npm install
```

4. 启动开发服务器

前端：
```bash
cd frontend
npm start
```

后端：
```bash
cd backend
npm run dev
```

## 项目结构

```
palworld-server-manager/
├── frontend/                # 前端项目
│   ├── src/
│   │   ├── assets/         # 静态资源
│   │   ├── components/     # 组件
│   │   ├── pages/         # 页面
│   │   ├── services/      # API服务
│   │   ├── utils/         # 工具函数
│   │   └── types/         # TypeScript类型
│   └── public/            # 公共资源
├── backend/                # 后端项目
│   ├── src/
│   │   ├── controllers/   # 控制器
│   │   ├── services/      # 服务
│   │   ├── models/        # 数据模型
│   │   ├── routes/        # 路由
│   │   ├── utils/         # 工具函数
│   │   └── types/         # TypeScript类型
│   └── tests/             # 测试文件
├── docs/                  # 文档
└── docker/               # Docker配置
```

## 环境变量配置

### 前端 (.env)
```env
REACT_APP_API_URL=http://localhost:8080/api
```

### 后端 (.env)
```env
PORT=8080
NODE_ENV=development
DB_PATH=./data/palworld.db
LOG_PATH=./logs
CORS_ORIGIN=http://localhost:3000
PALWORLD_API_URL=http://localhost:8000/api
PALWORLD_API_KEY=your_api_key
```

## API文档

API文档详见 [docs/api.md](docs/api.md)

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 联系方式

- 项目链接：[https://github.com/yourusername/palworld-server-manager](https://github.com/yourusername/palworld-server-manager)
- 问题反馈：[https://github.com/yourusername/palworld-server-manager/issues](https://github.com/yourusername/palworld-server-manager/issues)