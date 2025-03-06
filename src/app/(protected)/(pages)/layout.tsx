import { getRecentProjects } from '@/actions/project'
import { onAuthenticateUser } from '@/actions/user'
import AppSidebar from '@/components/global/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const user = await currentUser()

  if (!user?.id) {
    redirect("/sign-in")
  }

  // Fetch real projects or use the serialized ones as fallback
  let recentProjects;
  try {
    recentProjects = await getRecentProjects();
  } catch (error) {
    console.error("Error fetching recent projects:", error);
    recentProjects = { status: 200, data: [] };
  }

  // Extract only the needed user properties
  const serializedUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    email: user.emailAddresses[0]?.emailAddress
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar
          user={serializedUser}
          recentProjects={recentProjects.data || []} >
          {children}
        </AppSidebar>
      </SidebarProvider>
    </>
  )
}

export default Layout