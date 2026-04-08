import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import { UserProvider } from "@/lib/UserContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StorePilot - Your AI Ecommerce Team",
  description: "AI agentic assistant for ecommerce owners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased dark`}
    >
      <body className="flex h-screen bg-[#18181B] text-[#FAFAFA] font-['Inter'] overflow-hidden">
        <UserProvider>
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
