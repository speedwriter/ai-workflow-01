import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/hooks/use-user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Workflow OS",
  description: "Run curated LLM workflows to produce polished outputs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
