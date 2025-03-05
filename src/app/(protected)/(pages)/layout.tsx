import { onAuthenticateUser } from '@/actions/user'
import AppSidebar from '@/components/global/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  children:React.ReactNode
}

const Layout =async ({children}:Props) => {
  // const recent Projects = await getRecentProjects();
  const checkuser = await onAuthenticateUser()
  if(!checkuser.user){
    redirect('/sign-in')
  }
  return <SidebarProvider>
    <AppSidebar>

    </AppSidebar>
  </SidebarProvider>
}
export default Layout