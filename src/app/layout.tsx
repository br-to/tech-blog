import type { Metadata } from 'next';
import '@/styles/reset.css';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'br-to.dev',
  description: "Kobara Toi's personal website and blog.",
  openGraph: {
    title: 'br-to.dev',
    description: "Kobara Toi's personal website and blog.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/ogp.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <Analytics />
        <SpeedInsights />
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
