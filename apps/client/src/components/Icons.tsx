// src/components/icons.tsx
import {
  User as UserIcon,
  Mail as MailIcon,
  Lock as LockIcon,
  Phone as PhoneIcon,
  Building2 as Building2Icon,
  type LucideProps,
} from 'lucide-react';

const defaultSize = 16;

type IconProps = Omit<LucideProps, 'ref'>;

export const User = (props: IconProps) => (
  <UserIcon size={defaultSize} {...props} />
);

export const Mail = (props: IconProps) => (
  <MailIcon size={defaultSize} {...props} />
);

export const Lock = (props: IconProps) => (
  <LockIcon size={defaultSize} {...props} />
);

export const Phone = (props: IconProps) => (
  <PhoneIcon size={defaultSize} {...props} />
);

export const Building = (props: IconProps) => (
  <Building2Icon size={defaultSize} {...props} />
);

// Export all icons
export * from 'lucide-react';
