import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"
import { Alegreya, PT_Sans } from 'next/font/google'

const pt_sans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const alegreya = Alegreya({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-alegreya',
});

export const metadata: Metadata = {
  title: 'FloraSnap',
  description: 'Identify plants with a snap!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased min-h-screen bg-background', pt_sans.variable, alegreya.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
