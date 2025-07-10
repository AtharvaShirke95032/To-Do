// app/layout.js or app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your App",
  description: "Your description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
          <div className="min-h-screen">
            <ClerkProvider>
            {children}
            </ClerkProvider>
          </div>
        
      </body>
    </html>
  );
}
