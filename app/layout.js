
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/Header";


const inter = Inter({
  subsets: ["latin"], // ✅ Add this line
  preload: true,      // optional, but defaults to true
});

export const metadata = {
  title: "Todo App",
  description: "A simple todo app",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
     
      <body className={`${inter.className}`}>
        <div className="min-h-screen"> 
         <ClerkProvider> 
          <Header/>
        {children}
         </ClerkProvider>
         </div>
      </body>
      
    </html>
   
  );
}
