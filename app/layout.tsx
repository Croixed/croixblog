import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import { Separator } from "@/components/ui/separator";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CroixBlog",
  description: "A simple blog about how frameworks relate to LaCroix and Food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* inside of the navbar comp we give it the same margins and paddings  */}
          <Navbar />
          <Separator />
          <main className="mx-auto max-w-4xl md:px-4">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
