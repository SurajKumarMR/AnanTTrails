import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AnanTTrails — Community Travel Intelligence',
  description: 'Real stories from real travelers. Plan smarter, faster, and with genuine local confidence. Community-driven travel tips, destinations, and collaborative trips.',
  keywords: 'travel, community, backpacking, travel tips, destinations, solo travel, budget travel',
  openGraph: {
    title: 'AnanTTrails',
    description: 'Real stories from real travelers',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
