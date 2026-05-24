import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { profile } from "@/lib/data";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../public/font/Inter-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "normal"
    },
    {
      path: "../public/font/Inter-Italic-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "italic"
    }
  ],
  variable: "--font-inter",
  display: "swap"
});

const siteUrl = profile.siteUrl;
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ogImageUrl = `${siteUrl}/og-image.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | Frontend Developer`,
    template: `%s | ${profile.name}`
  },
  description: profile.tagline,
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${profile.name} portfolio preview`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    images: [ogImageUrl]
  },
  icons: {
    icon: `${publicBasePath}/og-image.svg`
  }
};

export const viewport: Viewport = {
  themeColor: "#050a0f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
