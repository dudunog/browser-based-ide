import { createContext } from 'react'
import { Project } from '@/entities/Project'
import { Deployment } from '@/entities/Deployment'

type ProjectContextData = {
	project: Project | null
	deployments: Deployment[] | null
	lastDeployment: Deployment | null
	isLoadingCreateProject: boolean
	isLoadingCreateDeployment: boolean
	getDeployments: () => Promise<void>
	createProject: () => Promise<void>
	createDeployment: (params: { content?: string }) => Promise<void>
}

export const ProjectContext = createContext({} as ProjectContextData)
