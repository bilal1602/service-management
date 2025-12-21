'use client';

import { Layout, Button, theme } from 'antd';
import Link from 'next/link';
import { ThemeToggle } from '@/components';
import { useAuthStore } from '@/store';

const { Header, Content, Footer } = Layout;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Header
        className="flex items-center justify-between px-6"
        style={{ background: colorBgContainer }}
      >
        <Link href="/" className="text-xl font-bold">
          Service Management
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button type="primary">Dashboard</Button>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button>Sign in</Button>
              </Link>
              <Link href="/register">
                <Button type="primary">Get started</Button>
              </Link>
            </div>
          )}
        </div>
      </Header>
      <Content>{children}</Content>
      <Footer className="text-center">
        Service Management ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
