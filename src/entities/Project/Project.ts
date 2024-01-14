export interface ProjectProps {
	createdAt: Date
	description: string
	id: string
	name: string
	updatedAt: Date
}

export class Project {
	get createdAt() {
		return this.props.createdAt
	}

	get description() {
		return this.props.description
	}

	get id() {
		return this.props.id
	}

	get name() {
		return this.props.name
	}

	get updatedAt() {
		return this.props.updatedAt
	}

	constructor(private readonly props: ProjectProps) {}
}
