import { useState } from 'react'
import { createProjectService } from '@/services/create-project'

export function useCreateProject() {
	const [isLoading, setIsLoading] = useState(false)

	const createProject = async () => {
		setIsLoading(true)

		const project = await createProjectService()

		setIsLoading(false)

		return project
	}

	return {
		isLoading,
		createProject,
	}
}
