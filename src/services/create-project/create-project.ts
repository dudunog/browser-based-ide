import { DENO_ORGANIZATION_ID } from '@/constants'
import { Project } from '@/entities/Project'
import { httpClient } from '@/infra'

export type CreateProjectResponse = Promise<Project>

type CreateProjectApiResponse = {
	createdAt: Date
	description: string
	id: string
	name: string
	updatedAt: Date
}

export const createProjectService = async (): CreateProjectResponse => {
	const { data } = await httpClient.post<CreateProjectApiResponse>(
		`/organizations/${DENO_ORGANIZATION_ID}/projects`,
		JSON.stringify({
			name: null,
		}),
	)

	return new Project({
		createdAt: data.createdAt,
		description: data.description,
		id: data.id,
		name: data.name,
		updatedAt: data.updatedAt,
	})
}
