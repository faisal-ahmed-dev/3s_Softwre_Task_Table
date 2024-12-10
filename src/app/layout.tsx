import React from "react";
import "./globals.css";
import Sidebar from "../components/Sidebar/Sidebar";
import TopNav from "../components/TopNav";
import "@fontsource/inter";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex h-screen ">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <TopNav />
          <main className="flex-1 p-4 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
