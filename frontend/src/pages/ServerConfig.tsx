import React, { useState } from 'react';
import { Form, Input, InputNumber, Switch, Button, Card, message, Space, Tabs } from 'antd';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

interface ServerSettings {
  serverName: string;
  serverDescription: string;
  maxPlayers: number;
  serverPassword: string;
  adminPassword: string;
  rconEnabled: boolean;
  rconPort: number;
  rconPassword: string;
  pvpEnabled: boolean;
  difficulty: string;
  dayTimeSpeedRate: number;
  nightTimeSpeedRate: number;
  expRate: number;
  palCaptureRate: number;
  palSpawnNumRate: number;
  palDamageRateAttack: number;
  palDamageRateDefense: number;
  playerDamageRateAttack: number;
  playerDamageRateDefense: number;
  playerStomachDecreaseRate: number;
  playerStaminaDecreaseRate: number;
  playerAutoHPRegeneRate: number;
  playerAutoHpRegeneRateInSleep: number;
  palStomachDecreaseRate: number;
  palStaminaDecreaseRate: number;
  palAutoHPRegeneRate: number;
  palAutoHpRegeneRateInSleep: number;
}

const ServerConfig: React.FC = () => {
  const [form] = Form.useForm<ServerSettings>();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      // TODO: 保存配置到服务器
      console.log('保存配置:', values);
      message.success('配置已保存');
    } catch (error) {
      message.error('保存失败，请检查配置');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    message.info('已重置为当前配置');
  };

  return (
    <div className="content-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">服务器配置</h1>
        <Space>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            loading={loading}
          >
            保存配置
          </Button>
          <Button
            icon={<UndoOutlined />}
            onClick={handleReset}
          >
            重置
          </Button>
        </Space>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          serverName: 'My Palworld Server',
          maxPlayers: 32,
          rconEnabled: true,
          rconPort: 25575,
          pvpEnabled: false,
          difficulty: 'normal',
          dayTimeSpeedRate: 1,
          nightTimeSpeedRate: 1,
          expRate: 1,
          palCaptureRate: 1,
          palSpawnNumRate: 1,
        }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="基本设置" key="1">
            <Card>
              <Form.Item
                label="服务器名称"
                name="serverName"
                rules={[{ required: true, message: '请输入服务器名称' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="服务器描述"
                name="serverDescription"
              >
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item
                label="最大玩家数"
                name="maxPlayers"
                rules={[{ required: true, message: '请输入最大玩家数' }]}
              >
                <InputNumber min={1} max={100} />
              </Form.Item>

              <Form.Item
                label="服务器密码"
                name="serverPassword"
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="管理员密码"
                name="adminPassword"
                rules={[{ required: true, message: '请输入管理员密码' }]}
              >
                <Input.Password />
              </Form.Item>
            </Card>
          </TabPane>

          <TabPane tab="RCON设置" key="2">
            <Card>
              <Form.Item
                label="启用RCON"
                name="rconEnabled"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="RCON端口"
                name="rconPort"
                rules={[{ required: true, message: '请输入RCON端口' }]}
              >
                <InputNumber min={1024} max={65535} />
              </Form.Item>

              <Form.Item
                label="RCON密码"
                name="rconPassword"
                rules={[{ required: true, message: '请输入RCON密码' }]}
              >
                <Input.Password />
              </Form.Item>
            </Card>
          </TabPane>

          <TabPane tab="游戏设置" key="3">
            <Card>
              <Form.Item
                label="启用PVP"
                name="pvpEnabled"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="难度"
                name="difficulty"
                rules={[{ required: true, message: '请选择难度' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="白天时间流速"
                name="dayTimeSpeedRate"
                rules={[{ required: true, message: '请输入白天时间流速' }]}
              >
                <InputNumber min={0.1} max={10} step={0.1} />
              </Form.Item>

              <Form.Item
                label="夜晚时间流速"
                name="nightTimeSpeedRate"
                rules={[{ required: true, message: '请输入夜晚时间流速' }]}
              >
                <InputNumber min={0.1} max={10} step={0.1} />
              </Form.Item>

              <Form.Item
                label="经验倍率"
                name="expRate"
                rules={[{ required: true, message: '请输入经验倍率' }]}
              >
                <InputNumber min={0.1} max={10} step={0.1} />
              </Form.Item>
            </Card>
          </TabPane>

          <TabPane tab="生物设置" key="4">
            <Card>
              <Form.Item
                label="帕鲁捕获倍率"
                name="palCaptureRate"
                rules={[{ required: true, message: '请输入帕鲁捕获倍率' }]}
              >
                <InputNumber min={0.1} max={10} step={0.1} />
              </Form.Item>

              <Form.Item
                label="帕鲁生成倍率"
                name="palSpawnNumRate"
                rules={[{ required: true, message: '请输入帕鲁生成倍率' }]}
              >
                <InputNumber min={0.1} max={10} step={0.1} />
              </Form.Item>

              <Form.Item
                label="帕鲁攻击倍率"
                name="palDamageRateAttack"
                rules={[{ required: true, message: '请输入帕鲁攻击倍率' }]}
              >
                <InputNumber min={0.1} max={10} step={0.1} />
              </Form.Item>

              <Form.Item
                label="帕鲁防御倍率"
                name="palDamageRateDefense"
                rules={[{ required: true, message: '请输入帕鲁防御倍率' }]}
              >
                <InputNumber min={0.1} max={10} step={0.1} />
              </Form.Item>
            </Card>
          </TabPane>

          <TabPane tab="玩家设置" key="5">
            <Card>
              <Form.Item
                label="玩家攻击倍率"
                name="playerDamageRateAttack"
                rules={[{ required: true, message: '请输入玩家攻击倍率' }]}
              >
                <InputNumber min={0.1} max={10} step={0.1} />
              </Form.Item>

              <Form.Item
                label="玩家防御倍率"
                name="playerDamageRateDefense"
                rules={[{ required: true, message: '请输入玩家防御倍率' }]}
              >
                <InputNumber min={0.1} max={10} step={0.1} />
              </Form.Item>

              <Form.Item
                label="玩家饥饿度减少倍率"
                name="playerStomachDecreaseRate"
                rules={[{ required: true, message: '请输入玩家饥饿度减少倍率' }]}
              >
                <InputNumber min={0.1} max={10} step={0.1} />
              </Form.Item>

              <Form.Item
                label="玩家耐力减少倍率"
                name="playerStaminaDecreaseRate"
                rules={[{ required: true, message: '请输入玩家耐力减少倍率' }]}
              >
                <InputNumber min={0.1} max={10} step={0.1} />
              </Form.Item>

              <Form.Item
                label="玩家生命恢复倍率"
                name="playerAutoHPRegeneRate"
                rules={[{ required: true, message: '请输入玩家生命恢复倍率' }]}
              >
                <InputNumber min={0.1} max={10} step={0.1} />
              </Form.Item>

              <Form.Item
                label="玩家睡眠恢复倍率"
                name="playerAutoHpRegeneRateInSleep"
                rules={[{ required: true, message: '请输入玩家睡眠恢复倍率' }]}
              >
                <InputNumber min={0.1} max={10} step={0.1} />
              </Form.Item>
            </Card>
          </TabPane>
        </Tabs>
      </Form>
    </div>
  );
};

export default ServerConfig;