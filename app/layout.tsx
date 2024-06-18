import type { Metadata } from "next";
import { montserrat } from "./ui/fonts";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider> 
      <html lang="en">
        <body className={montserrat.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
