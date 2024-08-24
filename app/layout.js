import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Futsal Club at The University of Michigan",
  description: "The official website of the Futsal Club at the University of Michigan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#031128"/>
        <meta name="msapplication-TileColor" content="#041228"/>
        <meta name="theme-color" content="#ffffff"/>
      </head>
      
      <body className={inter.className}>
        <div className="z-500 fixed w-full top-0">

        <Navbar></Navbar>
        </div>
        <div className='mt-20'>
        {children}
        </div>
        <Footer />
      </body>
      </UserProvider>
    </html>
  );
}
