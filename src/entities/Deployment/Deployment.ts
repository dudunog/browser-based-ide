export interface DeploymentProps {
	createdAt: Date
	domains: string[]
	databases: object
	description: string
	id: string
	projectId: string
	status: string
	updatedAt: Date
}

export class Deployment {
	get createdAt() {
		return this.props.createdAt
	}

	get domains() {
		return this.props.domains
	}

	get databases() {
		return this.props.databases
	}

	get description() {
		return this.props.description
	}

	get id() {
		return this.props.id
	}

	get projectId() {
		return this.props.projectId
	}

	get status() {
		return this.props.status
	}

	get updatedAt() {
		return this.props.updatedAt
	}

	constructor(private readonly props: DeploymentProps) {}
}
