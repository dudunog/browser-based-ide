import { useState } from 'react'
import {
	GetDeploymentsRequest,
	getDeploymentsService,
} from '@/services/get-deployments'

export function useGetDeployments() {
	const [isLoading, setIsLoading] = useState(false)

	const getDeployments = async (params: GetDeploymentsRequest) => {
		setIsLoading(true)

		const deployments = await getDeploymentsService({
			projectId: params.projectId,
		})

		setIsLoading(false)

		return deployments
	}

	return {
		isLoading,
		getDeployments,
	}
}
