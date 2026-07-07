import type { Metadata } from 'next';
import '../styles/globals.scss';
import AppShell from '@/components/AppShell/AppShell';

export const metadata: Metadata = {
  title: '[GT] GSP Performance Dashboard',
  description: 'GSP Performance Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
