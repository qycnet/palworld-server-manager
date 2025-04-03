import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag, Modal, message, Tooltip, Drawer, Form, Select } from 'antd';
import {
  SearchOutlined,
  UserDeleteOutlined,
  MessageOutlined,
  InfoCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { Player, getPlayers, banPlayer, kickPlayer, sendMessage, getPlayerDetails, updatePlayerPermissions } from '../services/playerService';

const PlayerManagement: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [messageText, setMessageText] = useState('');
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
  const [playerDetails, setPlayerDetails] = useState<Player | null>(null);
  const [kickModalVisible, setKickModalVisible] = useState(false);
  const [kickReason, setKickReason] = useState('');

  // 获取玩家列表
  const fetchPlayers = async (search?: string) => {
    try {
      setLoading(true);
      const data = await getPlayers(search);
      setPlayers(data);
    } catch (error) {
      message.error('获取玩家列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleSearch = () => {
    fetchPlayers(searchText);
  };

  const handleBanPlayer = async (player: Player) => {
    try {
      await banPlayer(player.id, player.status !== 'banned');
      message.success(`已${player.status === 'banned' ? '解封' : '封禁'}玩家: ${player.name}`);
      fetchPlayers();
    } catch (error) {
      message.error(`${player.status === 'banned' ? '解封' : '封禁'}玩家失败`);
    }
  };

  const handleKickPlayer = async () => {
    if (!selectedPlayer) return;
    
    try {
      await kickPlayer(selectedPlayer.id, kickReason);
      message.success(`已踢出玩家: ${selectedPlayer.name}`);
      setKickModalVisible(false);
      setKickReason('');
      fetchPlayers();
    } catch (error) {
      message.error('踢出玩家失败');
    }
  };

  const handleSendMessage = (player: Player) => {
    setSelectedPlayer(player);
    setMessageModalVisible(true);
  };

  const handleSendMessageSubmit = async () => {
    if (!messageText.trim() || !selectedPlayer) {
      message.error('消息不能为空');
      return;
    }

    try {
      await sendMessage(selectedPlayer.id, messageText);
      message.success(`已向 ${selectedPlayer.name} 发送消息`);
      setMessageModalVisible(false);
      setMessageText('');
    } catch (error) {
      message.error('发送消息失败');
    }
  };

  const showPlayerDetails = async (player: Player) => {
    try {
      const details = await getPlayerDetails(player.id);
      setPlayerDetails(details);
      setDetailsDrawerVisible(true);
    } catch (error) {
      message.error('获取玩家详情失败');
    }
  };

  const columns = [
    {
      title: '玩家名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Player) => (
        <Space>
          {text}
          <Tooltip title="查看详情">
            <InfoCircleOutlined
              style={{ cursor: 'pointer' }}
              onClick={() => showPlayerDetails(record)}
            />
          </Tooltip>
        </Space>
      ),
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
        const statusConfig = {
          online: { color: 'green', text: '在线' },
          offline: { color: 'gray', text: '离线' },
          banned: { color: 'red', text: '已封禁' },
        };
        const config = statusConfig[status as keyof typeof statusConfig] || { color: 'blue', text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
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
      title: '等级',
      dataIndex: 'level',
      key: 'level',
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
            icon={<StopOutlined />}
            onClick={() => {
              setSelectedPlayer(record);
              setKickModalVisible(true);
            }}
            disabled={record.status !== 'online'}
          >
            踢出
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
        loading={loading}
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

      <Modal
        title={`踢出玩家 ${selectedPlayer?.name}`}
        open={kickModalVisible}
        onOk={handleKickPlayer}
        onCancel={() => {
          setKickModalVisible(false);
          setKickReason('');
        }}
      >
        <Input.TextArea
          rows={4}
          value={kickReason}
          onChange={(e) => setKickReason(e.target.value)}
          placeholder="输入踢出原因（可选）"
        />
      </Modal>

      <Drawer
        title="玩家详情"
        placement="right"
        onClose={() => setDetailsDrawerVisible(false)}
        open={detailsDrawerVisible}
        width={400}
      >
        {playerDetails && (
          <div>
            <p><strong>玩家ID:</strong> {playerDetails.id}</p>
            <p><strong>名称:</strong> {playerDetails.name}</p>
            <p><strong>Steam ID:</strong> {playerDetails.steamId}</p>
            <p><strong>状态:</strong> {playerDetails.status}</p>
            <p><strong>等级:</strong> {playerDetails.level || '未知'}</p>
            <p><strong>公会:</strong> {playerDetails.guild || '无'}</p>
            <p><strong>IP地址:</strong> {playerDetails.ipAddress || '未知'}</p>
            <p><strong>游戏时长:</strong> {playerDetails.playTime}</p>
            <p><strong>最后在线:</strong> {playerDetails.lastSeen}</p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default PlayerManagement;