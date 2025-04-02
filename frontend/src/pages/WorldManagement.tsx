import React, { useState } from 'react';
import { Card, Input, Button, Space, Table, Tag, Modal, Form, message, Tabs } from 'antd';
import { SendOutlined, SaveOutlined, ReloadOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

interface WorldInfo {
  name: string;
  seed: string;
  size: string;
  creationDate: string;
  lastPlayed: string;
  daysPassed: number;
}

interface BackupInfo {
  id: string;
  name: string;
  date: string;
  size: string;
  description: string;
}

const WorldManagement: React.FC = () => {
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<{command: string, response: string}[]>([]);
  const [backupModalVisible, setBackupModalVisible] = useState(false);
  const [backupForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 模拟世界信息
  const worldInfo: WorldInfo = {
    name: 'PalWorld_1',
    seed: '12345678',
    size: '2.3 GB',
    creationDate: '2023-04-01',
    lastPlayed: '2023-04-15',
    daysPassed: 45,
  };

  // 模拟备份数据
  const backups: BackupInfo[] = [
    {
      id: '1',
      name: 'Backup_20230415_120000',
      date: '2023-04-15 12:00:00',
      size: '2.1 GB',
      description: '更新前备份',
    },
    {
      id: '2',
      name: 'Backup_20230410_183000',
      date: '2023-04-10 18:30:00',
      size: '2.0 GB',
      description: '每周自动备份',
    },
    {
      id: '3',
      name: 'Backup_20230405_093000',
      date: '2023-04-05 09:30:00',
      size: '1.9 GB',
      description: '服务器维护前备份',
    },
  ];

  const handleSendCommand = () => {
    if (!commandInput.trim()) return;
    
    // TODO: 发送命令到服务器
    const response = `执行命令: ${commandInput}`;
    setCommandHistory([...commandHistory, {
      command: commandInput,
      response,
    }]);
    setCommandInput('');
  };

  const handleCreateBackup = async () => {
    try {
      const values = await backupForm.validateFields();
      setLoading(true);
      
      // TODO: 创建备份
      console.log('创建备份:', values);
      
      setTimeout(() => {
        setLoading(false);
        setBackupModalVisible(false);
        message.success('备份创建成功');
        backupForm.resetFields();
      }, 1500);
    } catch (error) {
      console.error('备份失败:', error);
    }
  };

  const handleRestoreBackup = (backup: BackupInfo) => {
    Modal.confirm({
      title: '恢复备份',
      content: `确定要恢复备份 "${backup.name}" 吗？这将覆盖当前世界数据。`,
      onOk() {
        message.loading('正在恢复备份...', 2.5)
          .then(() => message.success('备份恢复成功'));
      },
    });
  };

  const handleDeleteBackup = (backup: BackupInfo) => {
    Modal.confirm({
      title: '删除备份',
      content: `确定要删除备份 "${backup.name}" 吗？此操作不可撤销。`,
      onOk() {
        message.success('备份已删除');
      },
    });
  };

  const backupColumns = [
    {
      title: '备份名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: BackupInfo) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleRestoreBackup(record)}>
            恢复
          </Button>
          <Button danger onClick={() => handleDeleteBackup(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="content-container">
      <Tabs defaultActiveKey="1">
        <TabPane tab="世界信息" key="1">
          <Card title="世界详情">
            <p><strong>世界名称:</strong> {worldInfo.name}</p>
            <p><strong>种子:</strong> {worldInfo.seed}</p>
            <p><strong>世界大小:</strong> {worldInfo.size}</p>
            <p><strong>创建日期:</strong> {worldInfo.creationDate}</p>
            <p><strong>最后游玩:</strong> {worldInfo.lastPlayed}</p>
            <p><strong>游戏天数:</strong> {worldInfo.daysPassed}</p>
          </Card>
        </TabPane>

        <TabPane tab="命令执行" key="2">
          <Card title="执行命令">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input
                placeholder="输入命令"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onPressEnter={handleSendCommand}
                suffix={
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSendCommand}
                  >
                    执行
                  </Button>
                }
              />
              
              <Card title="命令历史" style={{ marginTop: 16 }}>
                {commandHistory.length === 0 ? (
                  <p>暂无命令历史</p>
                ) : (
                  <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    {commandHistory.map((item, index) => (
                      <div key={index} style={{ marginBottom: 8 }}>
                        <p>
                          <Tag color="blue">命令</Tag> {item.command}
                        </p>
                        <p>
                          <Tag color="green">响应</Tag> {item.response}
                        </p>
                        <hr />
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </Space>
          </Card>
        </TabPane>

        <TabPane tab="备份管理" key="3">
          <div className="dashboard-header" style={{ marginBottom: 16 }}>
            <h2>世界备份</h2>
            <Space>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => setBackupModalVisible(true)}
              >
                创建备份
              </Button>
              <Button
                icon={<ReloadOutlined />}
              >
                刷新列表
              </Button>
            </Space>
          </div>

          <Table
            columns={backupColumns}
            dataSource={backups}
            rowKey="id"
          />
        </TabPane>
      </Tabs>

      <Modal
        title="创建备份"
        open={backupModalVisible}
        onOk={handleCreateBackup}
        onCancel={() => setBackupModalVisible(false)}
        confirmLoading={loading}
      >
        <Form form={backupForm} layout="vertical">
          <Form.Item
            name="name"
            label="备份名称"
            rules={[{ required: true, message: '请输入备份名称' }]}
          >
            <Input placeholder="输入备份名称" />
          </Form.Item>
          <Form.Item
            name="description"
            label="备份描述"
          >
            <Input.TextArea rows={4} placeholder="输入备份描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WorldManagement;