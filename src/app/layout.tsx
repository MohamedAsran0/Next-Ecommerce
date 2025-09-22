import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer/MyFooter";
import Navbar from "./_components/Navbar/MyNavbar";
import MySessionProvider from './_components/MySessionProvider/MySessionProvider';
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fresh Cart",
  description: "Fresh Cart is your smart online shopping cart for fresh groceries and daily essentials. Enjoy easy checkout, secure payments, and fast delivery.",
  keywords: ['fresh cart', 'online grocery shopping', 'grocery delivery', 'fresh food online', 'shopping cart app', 'buy groceries online', 'secure checkout', 'fast delivery']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <MySessionProvider>

          <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            {children}
            <Footer />
          </div>
          <Toaster />
        </MySessionProvider>

      </body>
    </html>
  );
}
