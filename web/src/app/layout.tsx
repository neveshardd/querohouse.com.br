import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import StripeProvider from "@/providers/StripeProvider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QueroHouse - Compra e Venda de Imóveis",
  description: "Encontre o imóvel dos seus sonhos ou venda seu imóvel com facilidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased" cz-shortcut-listen="true">
        <QueryProvider>
          <AuthProvider>
            <StripeProvider>
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </StripeProvider>
          </AuthProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
