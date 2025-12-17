"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, Sparkles } from "lucide-react"
import { SidebarNav } from "./sidebar-nav"
import { UserNav } from "./user-nav"
import Link from "next/link"
import { useState } from "react"
import { sidebarItems } from "./constants"

interface HeaderProps {
  user: {
    name: string | null
    email: string
    image: string | null
  }
}

export function Header({ user }: HeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="flex h-16 items-center border-b bg-background px-4 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex h-full flex-col bg-background">
            <div className="flex h-16 items-center border-b px-6">
              <Link href="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setOpen(false)}>
                <Sparkles className="h-6 w-6 text-primary" />
                <span>Easyworks</span>
              </Link>
            </div>
            <div className="flex-1 py-4 px-3 overflow-y-auto">
              <SidebarNav items={sidebarItems} className="flex-col space-x-0 space-y-1" onClick={() => setOpen(false)} />
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
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg ml-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="lg:hidden">Easyworks</span>
        </Link>
      </div>
    </header>
  )
}
