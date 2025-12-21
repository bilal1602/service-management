'use client';

import { Button, Card, Empty, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ServicesPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Title level={2} className="!mb-1">
            Services
          </Title>
          <Text type="secondary">Manage your services and configurations.</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Service
        </Button>
      </div>

      <Card>
        <Empty
          description="No services yet"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button type="primary">Create your first service</Button>
        </Empty>
      </Card>
    </div>
  );
}
