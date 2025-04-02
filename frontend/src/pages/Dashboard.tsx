import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Space } from 'antd';
import { ReloadOutlined, PoweroffOutlined } from '@ant-design/icons';
import ServerStatusCard from '../components/ServerStatusCard';
import ResourceUsageCard from '../components/ResourceUsageCard';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: 从API获取服务器状态
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    // TODO: 刷新服务器状态
    setTimeout(() => setLoading(false), 1000);
  };

  const handleRestart = () => {
    // TODO: 实现服务器重启功能
  };

  return (
    <div className="content-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">服务器状态概览</h1>
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
            status="online"
            uptime="2天3小时"
            version="1.0.0"
            playerCount={10}
            maxPlayers={32}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <ResourceUsageCard
            cpuUsage={45}
            memoryUsage={60}
            diskUsage={30}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;