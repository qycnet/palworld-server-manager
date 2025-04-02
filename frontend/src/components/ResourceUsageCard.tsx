import React from 'react';
import { Card, Progress, Space } from 'antd';

interface ResourceUsageCardProps {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

const ResourceUsageCard: React.FC<ResourceUsageCardProps> = ({
  cpuUsage,
  memoryUsage,
  diskUsage,
}) => {
  return (
    <Card title="资源使用" className="stat-card">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <span>CPU使用率</span>
          <Progress percent={cpuUsage} status={cpuUsage > 90 ? 'exception' : 'normal'} />
        </div>
        <div>
          <span>内存使用率</span>
          <Progress percent={memoryUsage} status={memoryUsage > 90 ? 'exception' : 'normal'} />
        </div>
        <div>
          <span>磁盘使用率</span>
          <Progress percent={diskUsage} status={diskUsage > 90 ? 'exception' : 'normal'} />
        </div>
      </Space>
    </Card>
  );
};

export default ResourceUsageCard;