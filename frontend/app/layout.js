import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "KanBan Board",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full h-full flex flex-col">
        <Navbar/>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
