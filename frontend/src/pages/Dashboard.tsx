import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Space, message } from 'antd';
import { ReloadOutlined, PoweroffOutlined } from '@ant-design/icons';
import ServerStatusCard from '../components/ServerStatusCard';
import ResourceUsageCard from '../components/ResourceUsageCard';
import { getServerStatus, restartServer } from '../services/api';

interface ServerStatus {
  status: 'online' | 'offline';
  uptime: string;
  version: string;
  playerCount: number;
  maxPlayers: number;
  resources: {
    cpu: number;
    memory: number;
    disk: number;
  };
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    status: 'offline',
    uptime: '0分钟',
    version: '未知',
    playerCount: 0,
    maxPlayers: 0,
    resources: {
      cpu: 0,
      memory: 0,
      disk: 0,
    },
  });

  const fetchServerStatus = async () => {
    try {
      setLoading(true);
      const data = await getServerStatus();
      setServerStatus(data);
    } catch (error) {
      message.error('获取服务器状态失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServerStatus();
    // 每30秒自动刷新一次
    const interval = setInterval(fetchServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchServerStatus();
  };

  const handleRestart = async () => {
    try {
      await restartServer();
      message.success('服务器重启指令已发送');
      // 等待几秒后刷新状态
      setTimeout(fetchServerStatus, 5000);
    } catch (error) {
      message.error('重启服务器失败');
    }
  };

  return (
    <div className="content-container">
      <div className="dashboard-header" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="dashboard-title" style={{ margin: 0 }}>服务器状态概览</h1>
        <Space>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            loading={loading}
            onClick={handleRefresh}
          >
            刷新
          </Button>
          <Button
            danger
            icon={<PoweroffOutlined />}
            onClick={handleRestart}
          >
            重启服务器
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <ServerStatusCard
            status={serverStatus.status}
            uptime={serverStatus.uptime}
            version={serverStatus.version}
            playerCount={serverStatus.playerCount}
            maxPlayers={serverStatus.maxPlayers}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <ResourceUsageCard
            cpuUsage={serverStatus.resources.cpu}
            memoryUsage={serverStatus.resources.memory}
            diskUsage={serverStatus.resources.disk}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;