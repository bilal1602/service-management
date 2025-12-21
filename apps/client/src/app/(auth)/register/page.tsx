'use client';

import { Button, Card, Form, Input, Typography, Divider } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const { Title, Text } = Typography;

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [form] = Form.useForm<RegisterFormValues>();

  const handleRegister = async (values: RegisterFormValues) => {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          name: values.name,
        },
      },
    });

    if (error) {
      form.setFields([
        {
          name: 'email',
          errors: [error.message],
        },
      ]);
    }
  };

  return (
    <Card>
      <div className="mb-6 text-center">
        <Title level={3} className="!mb-2">
          Create account
        </Title>
        <Text type="secondary">Get started with your free account</Text>
      </div>

      <Form form={form} layout="vertical" onFinish={handleRegister}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Full name"
            size="large"
          />
        </Form.Item>

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
          rules={[
            { required: true, message: 'Please enter a password' },
            { min: 8, message: 'Password must be at least 8 characters' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm password"
            size="large"
          />
        </Form.Item>

        <Form.Item className="!mb-4">
          <Button type="primary" htmlType="submit" size="large" block>
            Create account
          </Button>
        </Form.Item>
      </Form>

      <Divider plain>
        <Text type="secondary">Already have an account?</Text>
      </Divider>

      <Link href="/login">
        <Button size="large" block>
          Sign in
        </Button>
      </Link>
    </Card>
  );
}
