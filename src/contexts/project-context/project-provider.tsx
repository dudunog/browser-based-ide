import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { Project } from '@/entities/Project'
import { Deployment } from '@/entities/Deployment'
import { useGetDeployments } from '@/hooks/use-get-deployments'
import { useCreateProject } from '@/hooks/use-create-project'
import { useCreateDeployment } from '@/hooks/use-create-deployment'
import { ProjectContext } from '@/contexts/project-context'

export function ProjectProvider({ children }: PropsWithChildren) {
	const [project, setProject] = useState<Project | null>(null)
	const [deployments, setDeployments] = useState<Deployment[] | null>([])
	const [lastDeployment, setLastDeployment] = useState<Deployment | null>(null)
	const {
		isLoading: isLoadingCreateProject,
		createProject: createProjectHook,
	} = useCreateProject()
	const {
		isLoading: isLoadingCreateDeployment,
		createDeployment: createDeploymentHook,
	} = useCreateDeployment()
	const { getDeployments: getDeploymentsHook } = useGetDeployments()

	const createProject = useCallback(async () => {
		const response = await createProjectHook()
		setProject(response)
	}, [createProjectHook])

	const createDeployment = useCallback(
		async (params: { content?: string }) => {
			const response = await createDeploymentHook({
				projectId: project?.id || '',
				content: params?.content,
			})
			setLastDeployment(response)
		},
		[createDeploymentHook, project?.id],
	)

	const getDeployments = useCallback(async () => {
		const response = await getDeploymentsHook({
			projectId: project?.id || '',
		})

		setDeployments(response)

		const lastDeployment = response.slice(-1)[0]
		setLastDeployment(lastDeployment)
	}, [getDeploymentsHook, project?.id])

	const context = useMemo(
		() => ({
			project,
			deployments,
			lastDeployment,
			isLoadingCreateProject,
			isLoadingCreateDeployment,
			getDeployments,
			createProject,
			createDeployment,
		}),
		[
			project,
			deployments,
			lastDeployment,
			isLoadingCreateProject,
			isLoadingCreateDeployment,
			getDeployments,
			createProject,
			createDeployment,
		],
	)
	return (
		<ProjectContext.Provider value={context}>
			{children}
		</ProjectContext.Provider>
	)
}
