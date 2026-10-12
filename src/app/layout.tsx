import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import Chatbot from "@/components/Chatbot";
import { PROFILE } from "@/data/content";

const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: PROFILE.title,
  description: PROFILE.description,
  metadataBase: new URL("https://rayyankhan.online"),
  openGraph: {
    title: PROFILE.title,
    description: PROFILE.description,
    url: "https://rayyankhan.online",
    siteName: "Rayyan Khan",
    type: "website",
    images: [{ url: "/portrait.webp", width: 800, height: 800, alt: "Rayyan Khan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PROFILE.title,
    description: PROFILE.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rayyan Khan",
  url: "https://rayyankhan.online",
  jobTitle: "Machine Learning Engineer",
  address: { "@type": "PostalAddress", addressLocality: "Mardan", addressCountry: "PK" },
  sameAs: [PROFILE.github, PROFILE.linkedin, PROFILE.instagram],
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Engineering and Technology Mardan" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${jetbrains.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
