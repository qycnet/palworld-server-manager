import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Dashboard from './pages/Dashboard';
import PlayerManagement from './pages/PlayerManagement';
import ServerConfig from './pages/ServerConfig';
import WorldManagement from './pages/WorldManagement';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <Header />
        <Content style={{ margin: '0 16px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/players" element={<PlayerManagement />} />
            <Route path="/config" element={<ServerConfig />} />
            <Route path="/world" element={<WorldManagement />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;