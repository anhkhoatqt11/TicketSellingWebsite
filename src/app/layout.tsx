/* eslint-disable @next/next/no-page-custom-font */
import { ReduxProvider } from "@/redux/Provider";
import { Header } from "@/components/header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "../../context/AuthProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TicketNow",
  description: "TicketNow - Nền tảng bán vé sự kiện",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            <ReduxProvider>
              <Toaster />
              {children}
            </ReduxProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
