'use server'
import { client } from '@/lib/prisma'
import { onAuthenticateUser } from '@/actions/user'  // Use the absolute path to your user actions file
import { currentUser } from '@clerk/nextjs/server'

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser()
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: 'User Not Authenticated' }
    }
    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })
    if (projects.length === 0) {
      return { status: 404, error: "No Projects Found" }
    }
    return { status: 200, data: projects }
  }
  catch (error) {
    console.log('ERROR', error)
    return { status: 500 }
  }
}

export const getRecentProjects = async () => {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return { status: 403, error: 'User not authenticated' }
    }

    const projects = await client.project.findMany({
      where: {
        userId: user.id,
        isDeleted: false
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    })

    if (projects.length === 0) {
      return {
        status: 404, error: 'No recent project available'
      }
    }

    return { status: 200, data: projects }
  } catch (error) {
    console.error('ERROR', error)
    return { status: 500, error: 'Internal server error' }
  }
}