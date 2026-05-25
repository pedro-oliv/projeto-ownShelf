import Navbar from "@/app/components/Navbar/Navbar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <>
        <Navbar />

        <main className="pt-20 px-8">
          {children}
        </main>
      </>
  );
}