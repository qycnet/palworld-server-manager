import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag, Modal, message } from 'antd';
import { SearchOutlined, UserDeleteOutlined, MessageOutlined } from '@ant-design/icons';

interface Player {
  id: string;
  name: string;
  steamId: string;
  status: 'online' | 'offline' | 'banned';
  lastSeen: string;
  playTime: string;
}

const PlayerManagement: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [messageText, setMessageText] = useState('');

  // 模拟玩家数据
  const players: Player[] = [
    {
      id: '1',
      name: 'Player1',
      steamId: '76561198123456789',
      status: 'online',
      lastSeen: '当前在线',
      playTime: '120小时',
    },
    {
      id: '2',
      name: 'Player2',
      steamId: '76561198987654321',
      status: 'offline',
      lastSeen: '2023-04-01 15:30',
      playTime: '45小时',
    },
    {
      id: '3',
      name: 'Player3',
      steamId: '76561198555555555',
      status: 'banned',
      lastSeen: '2023-03-28 10:15',
      playTime: '67小时',
    },
  ];

  const handleSearch = () => {
    // TODO: 实现搜索功能
  };

  const handleBanPlayer = (player: Player) => {
    // TODO: 实现封禁玩家功能
    message.success(`已${player.status === 'banned' ? '解封' : '封禁'}玩家: ${player.name}`);
  };

  const handleSendMessage = (player: Player) => {
    setSelectedPlayer(player);
    setMessageModalVisible(true);
  };

  const handleSendMessageSubmit = () => {
    if (!messageText.trim()) {
      message.error('消息不能为空');
      return;
    }
    // TODO: 实现发送消息功能
    message.success(`已向 ${selectedPlayer?.name} 发送消息`);
    setMessageModalVisible(false);
    setMessageText('');
  };

  const columns = [
    {
      title: '玩家名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Steam ID',
      dataIndex: 'steamId',
      key: 'steamId',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        let text = '';
        
        switch (status) {
          case 'online':
            color = 'green';
            text = '在线';
            break;
          case 'offline':
            color = 'gray';
            text = '离线';
            break;
          case 'banned':
            color = 'red';
            text = '已封禁';
            break;
          default:
            color = 'blue';
            text = status;
        }
        
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '最后在线',
      dataIndex: 'lastSeen',
      key: 'lastSeen',
    },
    {
      title: '游戏时长',
      dataIndex: 'playTime',
      key: 'playTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Player) => (
        <Space size="middle">
          <Button
            icon={<MessageOutlined />}
            onClick={() => handleSendMessage(record)}
            disabled={record.status !== 'online'}
          >
            发送消息
          </Button>
          <Button
            danger={record.status !== 'banned'}
            icon={<UserDeleteOutlined />}
            onClick={() => handleBanPlayer(record)}
          >
            {record.status === 'banned' ? '解封' : '封禁'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="content-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">玩家管理</h1>
        <Space>
          <Input
            placeholder="搜索玩家"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={players}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={`向 ${selectedPlayer?.name} 发送消息`}
        open={messageModalVisible}
        onOk={handleSendMessageSubmit}
        onCancel={() => setMessageModalVisible(false)}
      >
        <Input.TextArea
          rows={4}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="输入要发送的消息"
        />
      </Modal>
    </div>
  );
};

export default PlayerManagement;