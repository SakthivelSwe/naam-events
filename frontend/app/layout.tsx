import type { Metadata } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import "@/app/globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans"
});

const serif = Lora({
  subsets: ["latin"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: "NaamEvent | Professional Event Management",
  description: "NaamEvent delivers thoughtful wedding, social, and corporate event management with a focus on trust, clarity, and flawless execution."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} font-sans text-brand-text antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

