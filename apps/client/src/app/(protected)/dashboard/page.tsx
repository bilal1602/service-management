'use client';

import { Card, Col, Row, Statistic, Typography } from 'antd';
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/store';

const { Title, Text } = Typography;

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="!mb-1">
          Welcome back, {user?.user_metadata?.name || 'there'}!
        </Title>
        <Text type="secondary">
          Here&apos;s what&apos;s happening with your services today.
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Services"
              value={12}
              prefix={<AppstoreOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active"
              value={8}
              valueStyle={{ color: '#3f8600' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending"
              value={3}
              valueStyle={{ color: '#faad14' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Issues"
              value={1}
              valueStyle={{ color: '#cf1322' }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card className="mt-6" title="Recent Activity">
        <Text type="secondary">No recent activity to display.</Text>
      </Card>
    </div>
  );
}
