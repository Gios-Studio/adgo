import "./globals.css"
import type { Metadata } from "next"
import { Sidebar } from "../components/Sidebar"
import { Header } from "../components/Header"

export const metadata: Metadata = {
  title: "AdGo",
  description: "Run in-ride ads with precision 🚀",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}