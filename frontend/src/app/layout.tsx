import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EduEase',
  description: 'Modern academic operations for universities and colleges.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
