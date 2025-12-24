'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  Divider,
  Select,
  Space,
} from 'antd';
import { User, Mail, Building2, Phone, Lock } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getDialCodeOptions } from '@root/shared';

const { Title, Text } = Typography;

const dialCodeOptions = getDialCodeOptions();
interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  organisationName: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [form] = Form.useForm<RegisterFormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${
            window.location.origin
          }/verify-email?email=${encodeURIComponent(values.email)}`,
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
            organisation_name: values.organisationName,
            country_code: values.countryCode,
            phone_number: values.phoneNumber,
            phone: `${values.countryCode}${values.phoneNumber}`,
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
      } else {
        // Redirect to verify email page
        router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
      }
    } finally {
      setIsLoading(false);
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

      <Form
        form={form}
        layout="vertical"
        onFinish={handleRegister}
        initialValues={{ countryCode: '+44' }}
      >
        <Space.Compact block>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'First name is required' }]}
            className="!mb-4 w-1/2"
          >
            <Input prefix={<User />} placeholder="First name" size="large" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Last name is required' }]}
            className="!mb-4 w-1/2"
          >
            <Input placeholder="Last name" size="large" />
          </Form.Item>
        </Space.Compact>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input prefix={<Mail />} placeholder="Email" size="large" />
        </Form.Item>

        <Form.Item
          name="organisationName"
          rules={[
            { required: true, message: 'Please enter your organisation name' },
          ]}
        >
          <Input
            prefix={<Building2 />}
            placeholder="Organisation name"
            size="large"
          />
        </Form.Item>

        <Space.Compact block>
          <Form.Item
            name="countryCode"
            rules={[{ required: true, message: 'Required' }]}
            className="!mb-4"
          >
            <Select
              options={dialCodeOptions}
              size="large"
              style={{ width: 120 }}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: 'Please enter your phone number' },
              {
                pattern: /^[0-9]{6,14}$/,
                message: 'Please enter a valid phone number',
              },
            ]}
            className="!mb-4 flex-1"
          >
            <Input prefix={<Phone />} placeholder="Phone number" size="large" />
          </Form.Item>
        </Space.Compact>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please enter a password' },
            { min: 8, message: 'Password must be at least 8 characters' },
          ]}
        >
          <Input.Password
            prefix={<Lock />}
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
            prefix={<Lock />}
            placeholder="Confirm password"
            size="large"
          />
        </Form.Item>

        <Form.Item className="!mb-4">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isLoading}
          >
            Create account
          </Button>
        </Form.Item>
      </Form>

      <Divider plain>
        <Text type="secondary">Already have an account?</Text>
      </Divider>

      <Link href="/login">
        <Button size="large" block disabled={isLoading}>
          Sign in
        </Button>
      </Link>
    </Card>
  );
}
