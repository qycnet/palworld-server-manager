import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo">PSM</div>
      <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" selectedKeys={[location.pathname]}>
        <Menu.Item key="/" icon={<DashboardOutlined />}>
          <Link to="/">仪表盘</Link>
        </Menu.Item>
        <Menu.Item key="/players" icon={<TeamOutlined />}>
          <Link to="/players">玩家管理</Link>
        </Menu.Item>
        <Menu.Item key="/config" icon={<SettingOutlined />}>
          <Link to="/config">服务器配置</Link>
        </Menu.Item>
        <Menu.Item key="/world" icon={<GlobalOutlined />}>
          <Link to="/world">世界管理</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;