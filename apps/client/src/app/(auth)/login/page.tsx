'use client';

import { Button, Card, Form, Input, Typography, Divider } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [form] = Form.useForm<LoginFormValues>();
  const handleLogin = async (values: LoginFormValues) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      form.setFields([
        {
          name: 'password',
          errors: [error.message],
        },
      ]);
    }
  };

  return (
    <Card>
      <div className="mb-6 text-center">
        <Title level={3} className="!mb-2">
          Welcome back
        </Title>
        <Text type="secondary">Sign in to your account</Text>
      </div>

      <Form form={form} layout="vertical" onFinish={handleLogin}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>

        <Form.Item className="!mb-4">
          <Button type="primary" htmlType="submit" size="large" block>
            Sign in
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center">
        <Link
          href="/forgot-password"
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          Forgot your password?
        </Link>
      </div>

      <Divider plain>
        <Text type="secondary">New here?</Text>
      </Divider>

      <Link href="/register">
        <Button size="large" block>
          Create an account
        </Button>
      </Link>
    </Card>
  );
}
