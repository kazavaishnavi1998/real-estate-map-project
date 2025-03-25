import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Basic Layout",
  description: "Next.js Layout with Header, Sidebar, and Content Area",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-6">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <nav>
            <ul>
              <li className="mb-2">
                <Link href="/home" className="hover:text-gray-300">Home</Link>
              </li>
              <li className="mb-2">
                <Link href="/profile" className="hover:text-gray-300">Profile</Link>
              </li>
              <li className="mb-2">
                <Link href="/settings" className="hover:text-gray-300">Settings</Link>
              </li>
              <li><a href="/map" className="hover:text-gray-300">Map</a></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-gray-700 text-white p-4">
            <h1 className="text-2xl">Welcome to the Dashboard</h1>
          </header>

          {/* Content */}
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
