"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import React from 'react'
import {Project}  from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import NavMain from "./nav-main"
import type { User } from "@clerk/nextjs/server"
import { data } from "@/lib/constants"
import RecentOpen from "../recent-open"

const AppSidebar =( {
  recentProjects,
  user,
  ...props
}:{
  recentProjects: Project[]
} & { user: User} & React.ComponentProps<typeof Sidebar>) =>{
  return (
    <Sidebar collapsible="icon" className="max-w-[212px] bg-background-90"
    {...props}
    >

      <SidebarHeader className="pt-6 px-3 pb-0" >
        <SidebarMenuButton size ={'lg'}

        className ="data-[state-open]:text-sidebar-accent-foreground">
          <div className="flex aspecr-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">


          <Avatar className="h-10 w-10 rounded-full">
  <AvatarImage src={'/vivid.png'}
  alt={'vivid-logo'}/>
  <AvatarFallback className="rounded-lg">VI</AvatarFallback>
</Avatar>
          </div>
          <span className="truncate text-primary text-3xl font-semibold">
            Vivid
          </span>
        </SidebarMenuButton>

        </SidebarHeader>
      <SidebarContent className="px-3 mt-10 gap-y-6">
        <NavMain items={data.navMain}/>
        <RecentOpen/>

      </SidebarContent>
      <SidebarFooter />
    </Sidebar>

  )
}

export default AppSidebar