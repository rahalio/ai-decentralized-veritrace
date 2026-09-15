import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Literata } from 'next/font/google';
import { AppProviders } from '@/components/providers';
import { AppShell } from '@/components/app-shell';
import './globals.css';

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
});

const literata = Literata({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-literata',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Veritrace',
  description:
    'Integrity without custody — learner-owned learning blocks with sealed verification',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plexSans.variable} ${literata.variable} ${plexMono.variable} font-sans antialiased`}
      >
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
