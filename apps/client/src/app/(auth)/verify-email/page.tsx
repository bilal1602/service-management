'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button, Card, Typography, message, Alert, Input, Form } from 'antd';
import { ShieldCheck, Mail } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const { Title, Text, Paragraph } = Typography;

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailFromParams = searchParams.get('email');

  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState(emailFromParams || '');
  const [otp, setOtp] = useState('');

  const hasEmailFromParams = !!emailFromParams;

  const handleVerifyOtp = async () => {
    if (!email) {
      message.error('Please enter your email address');
      return;
    }

    if (!otp || otp.length !== 6) {
      message.error('Please enter a valid 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (verifyError) {
        setError(verifyError.message);
      } else {
        message.success('Email verified successfully!');
        router.push('/dashboard');
      }
    } catch {
      setError('Failed to verify code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      message.error('Please enter your email address');
      return;
    }

    setIsResending(true);
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (resendError) {
        message.error(resendError.message);
      } else {
        message.success('Verification code sent!');
        setError(null);
        setOtp('');
      }
    } catch {
      message.error('Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card>
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <Title level={3} className="!mb-2">
          Verify your email
        </Title>

        <Paragraph type="secondary" className="!mb-6">
          {hasEmailFromParams ? (
            <>
              We&apos;ve sent a 6-digit code to
              <br />
              <Text strong>{email}</Text>
            </>
          ) : (
            'Enter your email and verification code'
          )}
        </Paragraph>

        {error && (
          <Alert
            type="error"
            message={error}
            className="!mb-4 text-left"
            showIcon
          />
        )}

        <Form layout="vertical">
          {!hasEmailFromParams && (
            <Form.Item className="!mb-4">
              <Input
                prefix={<Mail size={16} />}
                placeholder="Enter your email"
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </Form.Item>
          )}

          <Form.Item className="!mb-4">
            <div className="flex justify-center">
              <Input.OTP
                length={6}
                value={otp}
                onChange={setOtp}
                size="large"
              />
            </div>
          </Form.Item>

          <Form.Item className="!mb-4">
            <Button
              type="primary"
              size="large"
              block
              onClick={handleVerifyOtp}
              loading={isVerifying}
              disabled={!email || otp.length !== 6}
            >
              Verify email
            </Button>
          </Form.Item>
        </Form>

        <div className="mb-4">
          <Text type="secondary">Didn&apos;t receive the code? </Text>
          <Button
            type="link"
            onClick={handleResendOtp}
            loading={isResending}
            disabled={!email}
            className="!p-0"
          >
            Resend code
          </Button>
        </div>

        <Link href="/login">
          <Button size="large" block>
            Back to login
          </Button>
        </Link>
      </div>
    </Card>
  );
}
