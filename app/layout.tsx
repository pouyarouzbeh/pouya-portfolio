import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { profile } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} | Frontend Developer`,
    template: `%s | ${profile.name}`
  },
  description: profile.tagline,
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: "/og-image.svg",
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
    images: ["/og-image.svg"]
  },
  icons: {
    icon: "/og-image.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#050a0f",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {`
            try {
              const stored = localStorage.getItem('theme');
              const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
              const useLight = stored ? stored === 'light' : prefersLight === true;
              document.documentElement.classList.toggle('light', useLight);
              document.documentElement.classList.toggle('dark', !useLight);
              document.documentElement.dataset.theme = useLight ? 'light' : 'dark';
            } catch (_) {
              document.documentElement.dataset.theme = 'dark';
            }
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
