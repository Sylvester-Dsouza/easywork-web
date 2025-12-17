"use client"

import { SidebarNav } from "./sidebar-nav"
import { UserNav } from "./user-nav"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { sidebarItems } from "./constants"

interface SidebarProps {
  user: {
    name: string | null
    email: string
    image: string | null
  }
}

export function Sidebar({ user }: SidebarProps) {
  return (
    <div className="hidden border-r bg-muted/40 lg:block lg:w-64 lg:fixed lg:inset-y-0 lg:z-50">
      <div className="flex h-full flex-col bg-background">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Sparkles className="h-6 w-6 text-primary" />
            <span>Easyworks</span>
          </Link>
        </div>
        <div className="flex-1 py-4 px-3 overflow-y-auto">
          <SidebarNav items={sidebarItems} className="lg:flex-col lg:space-x-0 lg:space-y-1" />
        </div>
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
             <UserNav user={user} />
             <div className="text-sm overflow-hidden">
                <p className="font-medium truncate">{user.name || 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
