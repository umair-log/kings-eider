"use client"
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Home, Users } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/leads", label: "Leads", icon: Users },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname === item.href}
                icon={<item.icon />}
                tooltip={item.label}
              >
                {item.label}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </Sidebar>
  )
}
