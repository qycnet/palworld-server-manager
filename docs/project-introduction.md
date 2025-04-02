# 幻兽帕鲁服务器管理器

## 项目概述

幻兽帕鲁服务器管理器是一个现代化的Web应用程序，旨在简化幻兽帕鲁（Palworld）游戏服务器的管理和监控工作。通过直观的用户界面，管理员可以实时监控服务器状态、管理玩家、调整配置和执行各种管理操作，无需通过命令行或直接修改配置文件。

![幻兽帕鲁服务器管理器]

## 核心特性

### 📊 实时监控
- 服务器性能指标实时展示
- 在线玩家数量和活动监控
- 资源使用情况追踪

### 👥 玩家管理
- 查看和搜索在线玩家
- 玩家权限管理
- 封禁/解封玩家功能
- 向玩家发送消息

### ⚙️ 服务器配置
- 图形化配置编辑器
- 配置模板和预设
- 配置历史记录和回滚
- 一键应用配置更改

### 🌍 世界管理
- 世界信息查看
- 执行游戏内命令
- 地图可视化（计划中）

### 🔄 备份与恢复
- 自动备份计划
- 手动备份创建
- 一键恢复功能

### 📱 响应式设计
- 支持桌面和移动设备
- 黑暗模式支持
- 自定义主题

## 技术亮点

- **现代化架构**：采用前后端分离架构，确保系统的可扩展性和可维护性
- **实时通信**：使用WebSocket技术实现服务器状态的实时更新
- **安全可靠**：完整的身份验证和授权系统，保护服务器安全
- **易于部署**：提供Docker容器化部署，简化安装过程
- **开放API**：提供RESTful API，方便与其他系统集成

## 适用场景

- 个人游戏服务器管理
- 多服务器集群管理
- 游戏社区服务器运营
- 游戏托管服务提供商

## 系统要求

### 最低配置
- **操作系统**：Windows 10/11, Ubuntu 20.04+, macOS 12+
- **内存**：2GB RAM
- **存储**：10GB可用空间
- **网络**：与幻兽帕鲁服务器的网络连接

### 推荐配置
- **操作系统**：Windows 11, Ubuntu 22.04+, macOS 13+
- **内存**：4GB RAM
- **存储**：20GB可用空间（用于日志和备份）
- **网络**：高速稳定的网络连接

## 快速开始

### 使用Docker（推荐）
```bash
# 拉取镜像
docker pull qycnet/palworld-server-manager:latest

# 运行容器
docker run -d -p 3000:3000 -p 8080:8080 qycnet/palworld-server-manager:latest
```

### 手动安装
```bash
# 克隆仓库
git clone https://github.com/qycnet/palworld-server-manager.git

# 安装依赖
cd palworld-server-manager
npm install

# 启动应用
npm run start
```

## 贡献指南

我们欢迎社区贡献！如果您想参与项目开发，请查看我们的[贡献指南](CONTRIBUTING.md)。

## 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 联系方式

- **项目仓库**：[GitHub](https://github.com/qycnet/palworld-server-manager)
- **问题反馈**：[Issue Tracker](https://github.com/qycnet/palworld-server-manager/issues)
- **讨论区**：[Discussions](https://github.com/qycnet/palworld-server-manager/discussions)

---

**幻兽帕鲁服务器管理器** - 让服务器管理变得简单高效！