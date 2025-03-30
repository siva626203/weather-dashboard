import type { Metadata } from "next";
import "./globals.css";
import RootProvider from "./RootProvider";
export const metadata: Metadata = {
  title: "Weather",
  description: "weather api and Shadcn UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
