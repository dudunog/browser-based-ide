import { useState } from 'react'
import {
	CreateDeploymentRequest,
	createDeploymentService,
} from '@/services/create-deployment'

export function useCreateDeployment() {
	const [isLoading, setIsLoading] = useState(false)

	const createDeployment = async (params: CreateDeploymentRequest) => {
		setIsLoading(true)

		const deployment = await createDeploymentService({
			projectId: params.projectId,
			content: params?.content || '',
		})

		setIsLoading(false)

		return deployment
	}

	return {
		isLoading,
		createDeployment,
	}
}
