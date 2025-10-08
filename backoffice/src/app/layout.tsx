import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import { QueryClientProvider } from '@tanstack/react-query';
import QueryClientWrapper from '@/components/QueryClientWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QueroHouse Admin",
  description: "Painel administrativo da plataforma QueroHouse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         cz-shortcut-listen="true"
      >
        <QueryClientWrapper>
          <AuthProvider>
            <Layout>{children}</Layout>
          </AuthProvider>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
