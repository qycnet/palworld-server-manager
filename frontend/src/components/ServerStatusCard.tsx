import React from 'react';
import { Card, Statistic, Tag, Space } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface ServerStatusCardProps {
  status: 'online' | 'offline';
  uptime: string;
  version: string;
  playerCount: number;
  maxPlayers: number;
}

const ServerStatusCard: React.FC<ServerStatusCardProps> = ({
  status,
  uptime,
  version,
  playerCount,
  maxPlayers,
}) => {
  return (
    <Card title="服务器状态" className="stat-card">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Tag
            icon={status === 'online' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
            color={status === 'online' ? 'success' : 'error'}
          >
            {status === 'online' ? '在线' : '离线'}
          </Tag>
        </div>
        <Statistic title="运行时间" value={uptime} />
        <Statistic title="版本" value={version} />
        <Statistic title="在线玩家" value={`${playerCount}/${maxPlayers}`} />
      </Space>
    </Card>
  );
};

export default ServerStatusCard;