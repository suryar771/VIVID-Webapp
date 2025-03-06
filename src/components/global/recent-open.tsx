import React from 'react'
import {Project} from '@prisma/client'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { Button } from '../ui/button'
import {toast} from 'sonner'
import type { JsonValue } from '@prisma/client/runtime/library'

type Props = {
  recentProjects: Project[]
}

const RecentOpen = ({recentProjects}: Props )=> {
  const router = useRouter()
  const handleClick = (projectId: string,slides:JsonValue)=>{
    if(!projectId || !slides){
      toast.error('Project not found',{
        description:'Please try again',
      })
      return
    }
    setSlides(JSON.parse(JSON.stringify(slides)))
    router.push(`/presentation/${projectId}`)

  }
  return(
    recentProjects.length > 0 ? ( <SidebarGroup>
      <SidebarGroupLabel> Recently Opened</SidebarGroupLabel>
      <SidebarMenu>
        {recentProjects.length > 0 ?  recentProjects.map((item)=>(
          <SidebarMenuItem key={item.id}>

          <SidebarMenuButton asChild
          tooltip ={item.title}
          className ={`hover: bg-primary-80`}
          >
            <Button variant={'link'}
            onClick ={()=> handleClick(item.id,item.slides)}
            className={`text-xs items-center justify-start`}>
              <span> {item.title}</span>

              </Button>

          </SidebarMenuButton>

        </SidebarMenuItem>
        )):(

          <></>
        )}

      </SidebarMenu>


  </SidebarGroup>):""

  )
}
export default RecentOpen