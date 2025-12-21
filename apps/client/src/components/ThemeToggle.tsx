'use client';

import React from 'react';
import { Button, Dropdown, Space, type MenuProps } from 'antd';
import { useTheme, ThemeMode } from '../theme';

// Sun icon for light mode
const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

// Moon icon for dark mode
const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// System icon
const SystemIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

interface ThemeToggleProps {
  /**
   * If true, shows a dropdown with light/dark/system options.
   * If false, shows a simple toggle button between light and dark.
   */
  showDropdown?: boolean;
}

/**
 * ThemeToggle component for switching between light/dark/system themes.
 */
export function ThemeToggle({ showDropdown = false }: ThemeToggleProps) {
  const { mode, resolvedMode, setMode, toggleTheme } = useTheme();

  const getCurrentIcon = () => {
    if (mode === 'system') return <SystemIcon />;
    return resolvedMode === 'dark' ? <MoonIcon /> : <SunIcon />;
  };

  if (!showDropdown) {
    return (
      <Button
        type="text"
        icon={resolvedMode === 'dark' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleTheme}
        aria-label={`Switch to ${
          resolvedMode === 'dark' ? 'light' : 'dark'
        } mode`}
      />
    );
  }

  const items: MenuProps['items'] = [
    {
      key: 'light',
      label: (
        <Space>
          <SunIcon />
          <span>Light</span>
        </Space>
      ),
      onClick: () => setMode('light'),
    },
    {
      key: 'dark',
      label: (
        <Space>
          <MoonIcon />
          <span>Dark</span>
        </Space>
      ),
      onClick: () => setMode('dark'),
    },
    {
      key: 'system',
      label: (
        <Space>
          <SystemIcon />
          <span>System</span>
        </Space>
      ),
      onClick: () => setMode('system'),
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        selectedKeys: [mode],
      }}
      trigger={['click']}
    >
      <Button type="text" icon={getCurrentIcon()} aria-label="Change theme" />
    </Dropdown>
  );
}
