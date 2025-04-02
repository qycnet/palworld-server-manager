import React from 'react';
import { Layout, Button, Space, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const pageNames: { [key: string]: string } = {
  '/': '仪表盘',
  '/players': '玩家管理',
  '/config': '服务器配置',
  '/world': '世界管理',
};

const Header: React.FC = () => {
  const location = useLocation();
  const pageName = pageNames[location.pathname] || '幻兽帕鲁服务器管理器';

  return (
    <AntHeader className="header-container">
      <h2>{pageName}</h2>
      <Space>
        <span className="username">管理员</span>
        <Avatar icon={<UserOutlined />} />
        <Button type="link">退出</Button>
      </Space>
    </AntHeader>
  );
};

export default Header;