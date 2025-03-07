import { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"


export const metadata: Metadata = {
  title: "Nexus AI",
  description: "Store and Chat with your PDFs anywhere anytime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className="min-h-screen h-screen overflow-hidden flex flex-col"
        >
          <Toaster />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
