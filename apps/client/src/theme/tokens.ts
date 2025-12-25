import type { ThemeConfig } from 'antd';

/**
 * Light mode theme tokens
 */
export const lightTheme: ThemeConfig = {
  token: {
    // Brand colors
    colorPrimary: '#18181b',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',

    // Background colors
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorBgSpotlight: 'rgba(0, 0, 0, 0.85)',
    colorBgMask: 'rgba(0, 0, 0, 0.45)',

    // Text colors
    colorText: 'rgba(0, 0, 0, 0.88)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
    colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',

    // Border colors
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',

    // Fill colors
    colorFill: 'rgba(0, 0, 0, 0.15)',
    colorFillSecondary: 'rgba(0, 0, 0, 0.06)',
    colorFillTertiary: 'rgba(0, 0, 0, 0.04)',
    colorFillQuaternary: 'rgba(0, 0, 0, 0.02)',

    // Typography
    fontFamily:
      "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,

    // Spacing & Sizing
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
    controlHeight: 36, // h-9 from shadcn
    controlHeightLG: 40,
    controlHeightSM: 24,

    // Shadows
    boxShadow:
      '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
    boxShadowSecondary:
      '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',

    // Links
    colorLink: '#1677ff',
    colorLinkHover: '#69b1ff',
    colorLinkActive: '#0958d9',

    // Motion
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  components: {
    Button: {
      algorithm: true,
      colorPrimary: '#18181b',
      colorPrimaryHover: 'rgba(24, 24, 27, 0.9)', // hover:bg-primary/90
      colorPrimaryActive: 'rgba(24, 24, 27, 0.85)',
      borderRadius: 6,
      fontWeight: 500, // font-medium
      paddingInline: 16, // px-4
      paddingBlock: 8, // py-2
      controlHeight: 36, // h-9
      fontSize: 14, // text-sm
      lineHeight: 1.5,
      boxShadow: 'none',
      primaryShadow: 'none',
    },
    Input: {
      algorithm: true,
      borderRadius: 6,
    },
    Card: {
      algorithm: true,
      borderRadiusLG: 8,
    },
    Table: {
      algorithm: true,
      headerBg: '#fafafa',
      headerColor: 'rgba(0, 0, 0, 0.88)',
    },
    Menu: {
      algorithm: true,
      itemBg: 'transparent',
    },
    Layout: {
      algorithm: true,
      bodyBg: '#f5f5f5',
      headerBg: '#ffffff',
      siderBg: '#ffffff',
    },
  },
};

/**
 * Dark mode theme tokens
 */
export const darkTheme: ThemeConfig = {
  token: {
    // Brand colors (slightly adjusted for dark mode contrast)
    colorPrimary: '#1668dc',
    colorSuccess: '#49aa19',
    colorWarning: '#d89614',
    colorError: '#dc4446',
    colorInfo: '#1668dc',

    // Background colors
    colorBgContainer: '#141414',
    colorBgElevated: '#1f1f1f',
    colorBgLayout: '#000000',
    colorBgSpotlight: 'rgba(255, 255, 255, 0.85)',
    colorBgMask: 'rgba(0, 0, 0, 0.45)',

    // Text colors
    colorText: 'rgba(255, 255, 255, 0.85)',
    colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
    colorTextTertiary: 'rgba(255, 255, 255, 0.45)',
    colorTextQuaternary: 'rgba(255, 255, 255, 0.25)',

    // Border colors
    colorBorder: '#424242',
    colorBorderSecondary: '#303030',

    // Fill colors
    colorFill: 'rgba(255, 255, 255, 0.18)',
    colorFillSecondary: 'rgba(255, 255, 255, 0.12)',
    colorFillTertiary: 'rgba(255, 255, 255, 0.08)',
    colorFillQuaternary: 'rgba(255, 255, 255, 0.04)',

    // Typography
    fontFamily:
      "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,

    // Spacing & Sizing
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
    controlHeight: 36, // h-9 from shadcn
    controlHeightLG: 40,
    controlHeightSM: 24,

    // Shadows (adjusted for dark mode)
    boxShadow:
      '0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    boxShadowSecondary:
      '0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 9px 28px 8px rgba(0, 0, 0, 0.2)',

    // Links
    colorLink: '#1668dc',
    colorLinkHover: '#15417e',
    colorLinkActive: '#1554ad',

    // Motion
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  components: {
    Button: {
      algorithm: true,
      colorPrimary: '#18181b',
      colorPrimaryHover: 'rgba(24, 24, 27, 0.9)', // hover:bg-primary/90
      colorPrimaryActive: 'rgba(24, 24, 27, 0.85)',
      borderRadius: 6,
      fontWeight: 500, // font-medium
      paddingInline: 16, // px-4
      paddingBlock: 8, // py-2
      controlHeight: 36, // h-9
      fontSize: 14, // text-sm
      lineHeight: 1.5,
      boxShadow: 'none',
      primaryShadow: 'none',
      // Default button (no type) styling
      defaultBg: '#1f1f1f',
      defaultColor: 'rgba(255, 255, 255, 0.85)',
      defaultBorderColor: '#424242',
      defaultHoverBg: '#2a2a2a',
      defaultHoverColor: '#4096ff',
      defaultHoverBorderColor: '#4096ff',
      defaultActiveBg: '#1f1f1f',
      defaultActiveColor: '#1554ad',
      defaultActiveBorderColor: '#1554ad',
    },
    Input: {
      algorithm: true,
      colorBgContainer: '#1f1f1f',
      colorBorder: '#424242',
      activeBg: '#1f1f1f',
      hoverBg: '#1f1f1f',
      activeBorderColor: '#1668dc',
      hoverBorderColor: '#4096ff',
      borderRadius: 6,
    },
    Card: {
      algorithm: true,
      colorBgContainer: '#1f1f1f',
      colorBorderSecondary: '#303030',
      borderRadiusLG: 8,
    },
    Form: {
      algorithm: true,
      labelColor: 'rgba(255, 255, 255, 0.85)',
    },
    Typography: {
      algorithm: true,
    },
    Divider: {
      algorithm: true,
      colorSplit: '#303030',
    },
    Table: {
      algorithm: true,
      headerBg: '#1f1f1f',
      headerColor: 'rgba(255, 255, 255, 0.85)',
      colorBgContainer: '#141414',
      borderColor: '#303030',
      rowHoverBg: '#2a2a2a',
    },
    Menu: {
      algorithm: true,
      itemBg: 'transparent',
      darkItemBg: '#141414',
      itemSelectedBg: 'rgba(22, 104, 220, 0.15)',
    },
    Layout: {
      algorithm: true,
      bodyBg: '#000000',
      headerBg: '#141414',
      siderBg: '#141414',
    },
  },
};
