'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Menu, Button, Dropdown, Avatar, theme } from 'antd';
import {
  DashboardOutlined,
  SettingOutlined,
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthGuard } from '@/components/guards';
import { useAuthStore } from '@/store';
import { supabase } from '@/lib/supabase';
import { ThemeToggle } from '@/components';

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: <Link href="/dashboard">Dashboard</Link>,
  },
  {
    key: '/services',
    icon: <AppstoreOutlined />,
    label: <Link href="/services">Services</Link>,
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: <Link href="/settings">Settings</Link>,
  },
];

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => router.push('/settings'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign out',
      onClick: handleSignOut,
    },
  ];

  return (
    <AuthGuard>
      <Layout className="min-h-screen">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          className="border-r border-gray-200"
        >
          <div className="flex h-16 items-center justify-center border-b border-gray-200">
            <Link href="/dashboard" className="text-lg font-semibold">
              {collapsed ? 'SM' : 'Service Mgmt'}
            </Link>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            className="border-none"
          />
        </Sider>
        <Layout>
          <Header
            className="flex items-center justify-between border-b border-gray-200 px-4"
            style={{ background: colorBgContainer }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <button className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-100">
                  <Avatar size="small" icon={<UserOutlined />} />
                  <span className="text-sm">
                    {user?.user_metadata?.name || user?.email || 'User'}
                  </span>
                </button>
              </Dropdown>
            </div>
          </Header>
          <Content
            className="m-4 p-6"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </AuthGuard>
  );
}
