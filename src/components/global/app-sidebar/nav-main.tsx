"use client"

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavMain = ({
  items,
}: {
  items: {
    title: string
    url: string
    icon: React.FC<React.SVGProps<SVGSVGElement>>
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) => {
  const pathname = usePathname()

  return (
    <SidebarGroup className="p-0">
      <SidebarMenu>
        {items.map((item) => {
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`transition-all duration-200 ease-in-out hover:bg-muted/80 ${pathname.includes(item.url) && 'bg-muted'}`}
              >
                <Link
                  href={item.url}
                  className={`text-lg flex items-center gap-2 transition-all duration-200 ease-in-out hover:translate-x-1 ${pathname.includes(item.url) && 'font-bold'}`}
                >
                  <item.icon className="text-lg transition-colors duration-200 ease-in-out" />
                  <span className="transition-colors duration-200 ease-in-out">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavMain