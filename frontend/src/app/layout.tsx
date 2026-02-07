import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Yuktta Bakes",
  description: "Delicious brownies, cookies, and laddus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-gray-900">
        <Header />
        <main className="max-w-5xl mx-auto p-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
