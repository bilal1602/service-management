import './global.css';
import { Providers } from '../theme';

export const metadata = {
  title: 'Welcome to Service Management',
  description: 'Service Management Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
