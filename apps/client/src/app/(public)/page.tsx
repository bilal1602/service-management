'use client';

import { Button, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAuthStore } from '@/store';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="flex min-h-[calc(100vh-134px)] flex-col items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <Title className="!mb-4 !text-5xl">
          Manage your services with ease
        </Title>
        <Paragraph className="!mb-8 !text-lg text-gray-500">
          A powerful platform to manage, monitor, and scale your services.
          Streamline your operations and focus on what matters most.
        </Paragraph>
        <div className="flex justify-center gap-4">
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/register">
                <Button type="primary" size="large">
                  Get started free
                </Button>
              </Link>
              <Link href="/login">
                <Button size="large">Sign in</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
