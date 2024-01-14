import { Deployment } from '@/entities/Deployment'
import { httpClient } from '@/infra'

export type GetDeploymentsRequest = {
	projectId: string
}

export type GetDeploymentsResponse = Promise<Deployment[]>

type GetDeploymentsApiResponse = {
	createdAt: Date
	domains: string[]
	databases: object
	description: string
	id: string
	projectId: string
	status: string
	updatedAt: Date
}[]

export const getDeploymentsService = async (
	req: GetDeploymentsRequest,
): GetDeploymentsResponse => {
	const { data } = await httpClient.get<GetDeploymentsApiResponse>(
		`/projects/${req.projectId}/deployments`,
	)

	return data.map(
		deployment =>
			new Deployment({
				createdAt: deployment.createdAt,
				domains: deployment.domains,
				databases: deployment.databases,
				description: deployment.description,
				id: deployment.id,
				projectId: deployment.projectId,
				status: deployment.status,
				updatedAt: deployment.updatedAt,
			}),
	)
}
