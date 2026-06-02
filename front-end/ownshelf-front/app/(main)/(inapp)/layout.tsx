"use client"
import Navbar from "@/app/components/Navbar/Navbar";
import { SearchProvider } from "@/app/utils/contexts/SearchContext";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <>
      <SearchProvider>
        <Navbar />

        <main className="pt-20 px-8">
          {children}
        </main>
        </SearchProvider>
      </>
  );
}