'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar" // Make sure to import useSidebar
import Image from "next/image"
import Link from "next/link"
import { BadgePlus, List, Trash2 } from "lucide-react"

const list = [
    { name: "Create", href: "/provider/create", icon: BadgePlus },
    { name: "View", href: "/provider/view", icon: List },
    { name: 'Delete', href: '/provider/delete', icon: Trash2 },
]

export function AppSidebar() {
  const { state } = useSidebar() // Get the collapsed state
  
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image src={'/logo_vorks.png'} alt="logo" width={20} height={15} />
          {state==='expanded' && <span>Dashboard</span>} {/* Only show when not collapsed */}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {list.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon size={16} />
                     <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>      
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
       <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  )
}