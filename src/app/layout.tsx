import type { Metadata } from 'next';
import '../styles/globals.scss';

export const metadata: Metadata = {
  title: '[GT] GSP Performance Dashboard',
  description: 'GSP Performance Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
