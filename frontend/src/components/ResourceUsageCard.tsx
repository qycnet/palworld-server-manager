import React from 'react';
import { Card, Progress, Space, Tooltip } from 'antd';

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
  const getStatusColor = (usage: number) => {
    if (usage > 90) return 'exception';
    if (usage > 70) return 'warning';
    return 'normal';
  };

  return (
    <Card title="资源使用" className="stat-card">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Tooltip title={`CPU使用率: ${cpuUsage}%`}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>CPU使用率</span>
              <span>{cpuUsage}%</span>
            </div>
            <Progress 
              percent={cpuUsage} 
              status={getStatusColor(cpuUsage) as "success" | "exception" | "normal" | "active" | undefined} 
              showInfo={false}
            />
          </Tooltip>
        </div>
        <div>
          <Tooltip title={`内存使用率: ${memoryUsage}%`}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>内存使用率</span>
              <span>{memoryUsage}%</span>
            </div>
            <Progress 
              percent={memoryUsage} 
              status={getStatusColor(memoryUsage) as "success" | "exception" | "normal" | "active" | undefined} 
              showInfo={false}
            />
          </Tooltip>
        </div>
        <div>
          <Tooltip title={`磁盘使用率: ${diskUsage}%`}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>磁盘使用率</span>
              <span>{diskUsage}%</span>
            </div>
            <Progress 
              percent={diskUsage} 
              status={getStatusColor(diskUsage) as "success" | "exception" | "normal" | "active" | undefined} 
              showInfo={false}
            />
          </Tooltip>
        </div>
      </Space>
    </Card>
  );
};

export default ResourceUsageCard;