import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Takopedia",
  description: "Buy Everything Here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
