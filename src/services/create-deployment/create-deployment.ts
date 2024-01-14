import { Deployment } from '@/entities/Deployment'
import { httpClient } from '@/infra'
import { AxiosError } from 'axios'

export type CreateDeploymentRequest = {
	projectId: string
	content?: string
}

export type CreateDeploymentResponse = Promise<Deployment>

type CreateDeploymentApiResponse = {
	createdAt: Date
	domains: string[]
	databases: object
	description: string
	id: string
	projectId: string
	status: string
	updatedAt: Date
}

export const createDeploymentService = async (
	req: CreateDeploymentRequest,
): CreateDeploymentResponse => {
	try {
		const { data } = await httpClient.post<CreateDeploymentApiResponse>(
			`/projects/${req.projectId}/deployments`,
			JSON.stringify({
				entryPointUrl: 'main.ts',
				assets: {
					'main.ts': {
						kind: 'file',
						content: req.content,
						encoding: 'utf-8',
					},
				},
				envVars: {},
			}),
		)

		return new Deployment({
			createdAt: data.createdAt,
			domains: data.domains,
			databases: data.databases,
			description: data.description,
			id: data.id,
			projectId: data.projectId,
			status: data.status,
			updatedAt: data.updatedAt,
		})
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			throw new Error(error.message)
		}

		throw new Error('Unexpected error')
	}
}
