'use client';

import { useState } from 'react';
import { Button, Card, Form, Input, Typography, Result } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const { Title, Text } = Typography;

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPasswordPage() {
  const [form] = Form.useForm<ForgotPasswordFormValues>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      form.setFields([
        {
          name: 'email',
          errors: [error.message],
        },
      ]);
      return;
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card>
        <Result
          status="success"
          title="Check your email"
          subTitle="We've sent you a password reset link. Please check your inbox."
          extra={
            <Link href="/login">
              <Button type="primary">Back to login</Button>
            </Link>
          }
        />
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-6 text-center">
        <Title level={3} className="!mb-2">
          Reset password
        </Title>
        <Text type="secondary">
          Enter your email and we&apos;ll send you a reset link
        </Text>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
        </Form.Item>

        <Form.Item className="!mb-4">
          <Button type="primary" htmlType="submit" size="large" block>
            Send reset link
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-500"
        >
          <ArrowLeftOutlined />
          Back to login
        </Link>
      </div>
    </Card>
  );
}
