import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import ApolloProviderWrapper from "./graphql/ApolloProviderWrapper";

export const metadata: Metadata = {
  title: "Basic Layout",
  description: "Next.js Layout with Top Navigation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProviderWrapper>
      <html lang="en">
        <body className="flex flex-col min-h-screen bg-gray-100">
          <header className="bg-gray-800 text-white px-6 py-4 shadow-md">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold">Dashboard</h1>
              <nav>
                <ul className="flex gap-6 text-sm font-medium">
                  <li>
                    <Link href="/home" className="hover:text-gray-300">Home</Link>
                  </li>
                  <li>
                    <Link href="/profile" className="hover:text-gray-300">Profile</Link>
                  </li>
                  <li>
                    <Link href="/settings" className="hover:text-gray-300">Settings</Link>
                  </li>
                  <li>
                    <Link href="/map" className="hover:text-gray-300">Map</Link>
                  </li>
                  <li>
                    <Link href="/graphql" className="hover:text-gray-300">GraphQL</Link>
                  </li>
                  <li>
                    <Link href="/mapParcel" className="hover:text-gray-300">Map Parcel</Link>
                  </li>
                  <li>
                    <Link href="/mapParcelGraphql" className="hover:text-gray-300">Map Parcel Graphql</Link>
                  </li>
                  <li>
                    <Link href="/mapGoogleAPISearch" className="hover:text-gray-300">Map GoogleAPI Search Address</Link>
                  </li>
                 
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </ApolloProviderWrapper>
  );
}
