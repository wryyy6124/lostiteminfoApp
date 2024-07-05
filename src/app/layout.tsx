import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "lostiteminfoApp",
  description: "lostiteminfoApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode}) {
  return (
    <html>
      <body className={inter.className}>
        <div>
          <main>{children}</main>
          {/*<footer className="py-5">
            <div className="text-center text-sm">
              <p>Copyright © All rights reserved | lostiteminfoApp TM {new Date().getFullYear()} </p>
            </div>
          </footer>*/}
        </div>
      </body>
    </html>
  );
}
