import type { Metadata } from "next";
import "./globals.css";
import ConditionalNavbar from "./components/ConditionalNavbar";

export const metadata: Metadata = {
  title: "Book Rental Library",
  description:
    "Discover, rent, and enjoy thousands of books from our digital library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}
