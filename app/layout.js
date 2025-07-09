
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";


export const metadata = {
  title: "Todo App",
  description: "A simple todo app",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
     
      <body>
         <ClerkProvider> 
        {children}
         </ClerkProvider>
      </body>
      
    </html>
   
  );
}
