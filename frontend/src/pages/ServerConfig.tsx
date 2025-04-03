import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Switch, Button, message, Spin } from 'antd';
import { ServerConfig, getServerConfig, updateServerConfig } from '../services/serverConfigService';

const ServerConfigPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServerConfig();
  }, []);

  const fetchServerConfig = async () => {
    try {
      const config = await getServerConfig();
      form.setFieldsValue(config);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch server configuration');
      setLoading(false);
    }
  };

  const onFinish = async (values: ServerConfig) => {
    try {
      setLoading(true);
      await updateServerConfig(values);
      message.success('Server configuration updated successfully');
      setLoading(false);
    } catch (error) {
      message.error('Failed to update server configuration');
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="server-config-page">
      <h1>Server Configuration</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          isMultiplay: true,
          isPvP: false,
          enableFastTravel: true,
        }}
      >
        <Form.Item name="serverName" label="Server Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="serverDescription" label="Server Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="maxPlayers" label="Max Players" rules={[{ required: true }]}>
          <InputNumber min={1} max={100} />
        </Form.Item>
        <Form.Item name="serverPassword" label="Server Password">
          <Input.Password />
        </Form.Item>
        <Form.Item name="adminPassword" label="Admin Password">
          <Input.Password />
        </Form.Item>
        <Form.Item name="dayTimeSpeedRate" label="Day Time Speed Rate" rules={[{ required: true }]}>
          <InputNumber min={0.1} max={5} step={0.1} />
        </Form.Item>
        <Form.Item name="nightTimeSpeedRate" label="Night Time Speed Rate" rules={[{ required: true }]}>
          <InputNumber min={0.1} max={5} step={0.1} />
        </Form.Item>
        <Form.Item name="expRate" label="Experience Rate" rules={[{ required: true }]}>
          <InputNumber min={0.1} max={5} step={0.1} />
        </Form.Item>
        <Form.Item name="palCaptureRate" label="Pal Capture Rate" rules={[{ required: true }]}>
          <InputNumber min={0.1} max={5} step={0.1} />
        </Form.Item>
        <Form.Item name="palSpawnNumRate" label="Pal Spawn Rate" rules={[{ required: true }]}>
          <InputNumber min={0.1} max={5} step={0.1} />
        </Form.Item>
        <Form.Item name="palDamageRateAttack" label="Pal Attack Damage Rate" rules={[{ required: true }]}>
          <InputNumber min={0.1} max={5} step={0.1} />
        </Form.Item>
        <Form.Item name="palDamageRateDefense" label="Pal Defense Rate" rules={[{ required: true }]}>
          <InputNumber min={0.1} max={5} step={0.1} />
        </Form.Item>
        <Form.Item name="playerDamageRateAttack" label="Player Attack Damage Rate" rules={[{ required: true }]}>
          <InputNumber min={0.1} max={5} step={0.1} />
        </Form.Item>
        <Form.Item name="playerDamageRateDefense" label="Player Defense Rate" rules={[{ required: true }]}>
          <InputNumber min={0.1} max={5} step={0.1} />
        </Form.Item>
        <Form.Item name="difficultyRate" label="Difficulty Rate" rules={[{ required: true }]}>
          <InputNumber min={0.1} max={5} step={0.1} />
        </Form.Item>
        <Form.Item name="enablePlayerToPlayerDamage" label="Enable PvP Damage" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="enableFriendlyFire" label="Enable Friendly Fire" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="enableInvaderEnemy" label="Enable Invader Enemies" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="enableAimAssistPad" label="Enable Gamepad Aim Assist" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="enableAimAssistKeyboard" label="Enable Keyboard Aim Assist" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="dropItemMaxNum" label="Max Dropped Items" rules={[{ required: true }]}>
          <InputNumber min={1} max={10000} />
        </Form.Item>
        <Form.Item name="baseCampMaxNum" label="Max Base Camps" rules={[{ required: true }]}>
          <InputNumber min={1} max={100} />
        </Form.Item>
        <Form.Item name="baseCampWorkerMaxNum" label="Max Base Camp Workers" rules={[{ required: true }]}>
          <InputNumber min={1} max={100} />
        </Form.Item>
        <Form.Item name="dropItemAliveMaxHours" label="Dropped Item Despawn Time (Hours)" rules={[{ required: true }]}>
          <InputNumber min={1} max={720} />
        </Form.Item>
        <Form.Item name="guildPlayerMaxNum" label="Max Guild Members" rules={[{ required: true }]}>
          <InputNumber min={1} max={100} />
        </Form.Item>
        <Form.Item name="palEggDefaultHatchingTime" label="Pal Egg Hatching Time (Hours)" rules={[{ required: true }]}>
          <InputNumber min={0.1} max={100} step={0.1} />
        </Form.Item>
        <Form.Item name="workSpeedRate" label="Work Speed Rate" rules={[{ required: true }]}>
          <InputNumber min={0.1} max={5} step={0.1} />
        </Form.Item>
        <Form.Item name="isMultiplay" label="Enable Multiplayer" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="isPvP" label="Enable PvP" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="canPickupOtherGuildDeathPenaltyDrop" label="Allow Other Guild Death Penalty Pickup" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="enableNonLoginPenalty" label="Enable Non-Login Penalty" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="enableFastTravel" label="Enable Fast Travel" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="isStartLocationSelectByMap" label="Enable Start Location Selection" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="existPlayerAfterLogout" label="Keep Player in World After Logout" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="enableDefenseOtherGuildPlayer" label="Enable Defense Against Other Guild Players" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="coopPlayerMaxNum" label="Max Co-op Players" rules={[{ required: true }]}>
          <InputNumber min={1} max={32} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Configuration
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ServerConfigPage;