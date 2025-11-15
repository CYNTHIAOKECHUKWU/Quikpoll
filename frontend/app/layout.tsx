import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";



import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickPoll",
  description: "Real-time opinion polling platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800 min-h-screen"
        )}
      >
        <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white sticky top-0 z-50">
          <h1 className="text-xl font-bold text-zinc-700">
            Quick<span className="text-blue-600">Poll</span>
          </h1>
          <div className="space-x-4">
            <a href="/" className="text-sm hover:text-blue-600">
              Home
            </a>
            <a href="/create" className="text-sm hover:text-blue-600">
              Create Poll
            </a>
            <a href="/polls" className="text-sm hover:text-blue-600">
              Polls
            </a>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">{children}</main>

        <footer className="text-center text-xs text-gray-500 py-6">
          © {new Date().getFullYear()} QuickPoll Platform — Built by Okechukwu Chiamaka 
        </footer>
      </body>
    </html>
  );
}
