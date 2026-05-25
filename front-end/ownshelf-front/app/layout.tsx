import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./utils/provider/Providers";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const SoraFont = Sora({
  subsets:["latin"]
})

export const metadata: Metadata = {
  title: "OwnShelf"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >
      
      <body className={`${SoraFont.className} h-screen flex flex-col`}>
        <Providers>
        <LoadingOverlay text=""/>
        {children}
        </Providers>
        </body>
      
    </html>
  );
}
