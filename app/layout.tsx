import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'HiPeople Dashboard',
  description: 'HR Platform Dashboard',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-slate-900 bg-white`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
