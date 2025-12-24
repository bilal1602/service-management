'use client';

import { Button, Card, Form, Input, Tabs, Typography, message } from 'antd';
import { useAuthStore } from '@/store';
import { supabase } from '@/lib/supabase';

const { Title, Text } = Typography;

interface ProfileFormValues {
  name: string;
  email: string;
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [profileForm] = Form.useForm<ProfileFormValues>();
  const [passwordForm] = Form.useForm<PasswordFormValues>();

  const handleUpdateProfile = async (values: ProfileFormValues) => {
    const { error } = await supabase.auth.updateUser({
      data: { name: values.name },
    });

    if (error) {
      message.error(error.message);
      return;
    }

    message.success('Profile updated successfully');
  };

  const handleUpdatePassword = async (values: PasswordFormValues) => {
    const { error } = await supabase.auth.updateUser({
      password: values.newPassword,
    });

    if (error) {
      message.error(error.message);
      return;
    }

    message.success('Password updated successfully');
    passwordForm.resetFields();
  };

  const tabItems = [
    {
      key: 'profile',
      label: 'Profile',
      children: (
        <Form
          form={profileForm}
          layout="vertical"
          onFinish={handleUpdateProfile}
          initialValues={{
            name: user?.user_metadata?.name || '',
            email: user?.email || '',
          }}
          className="max-w-md"
        >
          <Form.Item
            name="name"
            label="Full name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input size="large" disabled />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update profile
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'password',
      label: 'Password',
      children: (
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handleUpdatePassword}
          className="max-w-md"
        >
          <Form.Item
            name="newPassword"
            label="New password"
            rules={[
              { required: true, message: 'Please enter a new password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm new password"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update password
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="!mb-1">
          Settings
        </Title>
        <Text type="secondary">
          Manage your account settings and preferences.
        </Text>
      </div>

      <Card>
        <Tabs items={tabItems} />
      </Card>
    </div>
  );
}
