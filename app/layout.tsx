import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Providers from "@/src/shared/providers/QueryProvider";
import { ModalProvider } from "@/src/shared/components/ModalGlobal";

const monsterrat = Geist({
  variable: "--font-geist-montserrat",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Edu-School",
  description: "Aplicación educativa",
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html
      lang="en"
      className={`${monsterrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          <ModalProvider />
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
