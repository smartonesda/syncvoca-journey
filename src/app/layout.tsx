import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ServiceWorkerRegister } from "@/components/pwa/service-worker-register";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  applicationName: "SyncVoca",
  title: {
    default: "SyncVoca - Bukti Kerja, Masa Depan, Bersama",
    template: "%s | SyncVoca",
  },
  description:
    "Platform vokasi inklusif untuk journey ABK, evidence kompetensi, consent, validasi DUDI, dan dashboard pendampingan.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/syncvoca-logo.png",
    apple: "/syncvoca-logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SyncVoca",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b6f31",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Providers>
          <ServiceWorkerRegister />
          {children}
        </Providers>
      </body>
    </html>
  );
}
