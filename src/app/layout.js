import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Header from "./components/Header/Header";
import CtaSection from "./components/Home/CtaSection/CtaSection";
import Footer from "./components/Footer/Footer";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mallina's Chocolates | Handcrafted Artisan Chocolates",
  description: "Discover handcrafted artisan chocolates made with premium ingredients and love. Gift boxes, truffles, farm-to-bar experiences, and more from Mallina's Chocolates.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable}`}>
      <body>
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <div className="site-outro">
            <CtaSection />
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
