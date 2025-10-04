"use client"

import { Home, Upload, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
// ...existing code...
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Upload Ad", href: "/upload", icon: Upload },
  { name: "Profile", href: "/profile", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 bg-background border-r h-screen flex flex-col">
      <div className="p-6 font-bold text-lg">AdGo</div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link key={name} href={href}>
            <Button
              variant={pathname === href ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
            >
              <Icon className="mr-2 h-4 w-4" />
              {name}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  )
}