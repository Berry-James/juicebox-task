import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import { NavbarContextProvider } from "@/components/common/Navbar/Navbar";

// FONT DEFINITIONS

// System body font
const bodyFont = localFont({
  src: '../assets/fonts/body/Bagoss.ttf',
  display: 'swap',
  variable: '--font-body'
});

// Branding font
const brandingFont = localFont({
  src: [
    {
      path: '../assets/fonts/branding/PPAgrandir-Medium.woff2',
      weight: '500'
    },
    {
      path: '../assets/fonts/branding/PPAgrandir-Regular.woff2',
      weight: '400'
    }
  ],
   display: 'swap',
    variable: '--font-branding'
});

export const metadata: Metadata = {
  title: "Juicebox | Home",
  description: "Juicebox | Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
      className={`${bodyFont.variable} ${brandingFont.variable} bg-background`}
    >
      <body>
        <NavbarContextProvider>
          { children }
        </NavbarContextProvider>
      </body>
    </html>
  );
}
