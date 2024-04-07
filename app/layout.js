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
      {/* <Navbar /> */}
      
      <body className={inter.className}>
        <div className="z-500 fixed w-full top-0">

        <Navbar></Navbar>
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
