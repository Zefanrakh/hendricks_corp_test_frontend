import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryProvider } from "@/modules/shared/context/ReactQueryProvider";
import { ReactQueryParamProvider } from "@/modules/shared/context/ReactQueryParamProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
    <ReactQueryProvider>
      <ReactQueryParamProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="bg-blue w-100 h-100"></div>
            <>{children}</>
          </body>
        </html>
      </ReactQueryParamProvider>
    </ReactQueryProvider>
  );
}