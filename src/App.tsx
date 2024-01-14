import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useProject } from '@/contexts/project-context'
import { Loader2 } from 'lucide-react'
import Editor from '@monaco-editor/react'

function App() {
	const [defaultEditorContent] = useState<string | undefined>(
		'Deno.serve(() => new Response("Hello, World!"));',
	)
	const { toast } = useToast()
	const [selectedLanguage, setSelectedLanguage] = useState('javascript')
	const [editorContent, setEditorContent] = useState<string | undefined>(
		undefined,
	)
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
	const {
		lastDeployment,
		isLoadingCreateDeployment,
		getDeployments,
		createProject,
		createDeployment,
	} = useProject()

	useEffect(() => {
		createProject()
	}, [])

	const handleDeployProject = async () => {
		await createDeployment({
			content: editorContent,
		})

		await getDeployments()

		setIntervalId(setInterval(getDeployments, 5000))
	}

	const handleChangeLanguage = (language: string) => {
		setSelectedLanguage(language)
	}

	const handleChangeContentEditor = (value: string | undefined) => {
		setEditorContent(value)
	}

	const handleGoToProjectURL = () => {
		const url = 'https://' + lastDeployment?.domains.slice(-1)[0]
		window.open(url || '', '_blank')
	}

	useEffect(() => {
		if (lastDeployment) {
			console.log('new pool!')
			console.log(lastDeployment)

			if (
				lastDeployment.status === 'success' ||
				lastDeployment.status === 'failed'
			) {
				if (intervalId) {
					clearInterval(intervalId)
					setIntervalId(null)
				}
			}

			if (lastDeployment.status === 'success') {
				toast({
					variant: 'success',
					title: 'Project deployed',
					description: (
						<div className="w-full flex items-center gap-8">
							<p>Project deployed successfully</p>
							<Button
								variant="secondary"
								onClick={handleGoToProjectURL}
								disabled={isLoadingCreateDeployment}
							>
								Access URL
							</Button>
						</div>
					),
				})
			}
		}
	}, [intervalId, lastDeployment])

	return (
		<div className="h-screen w-screen bg-white dark:bg-slate-900">
			<Sidebar />
			<div className="ml-16 flex flex-col justify-center h-full">
				<div className="p-4 flex justify-between gap-4">
					<Select value={selectedLanguage} onValueChange={handleChangeLanguage}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Language" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="typescript">TypeScript</SelectItem>
							<SelectItem value="javascript">JavaScript</SelectItem>
						</SelectContent>
					</Select>
					<Button
						variant="success"
						onClick={handleDeployProject}
						disabled={isLoadingCreateDeployment}
					>
						{isLoadingCreateDeployment && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						Deploy
					</Button>
				</div>
				<Editor
					height="100vh"
					defaultLanguage="javascript"
					language={selectedLanguage}
					defaultValue={defaultEditorContent}
					value={editorContent}
					onChange={handleChangeContentEditor}
				/>
				{/* <div className="m-3 p-4 shadow-md rounded-lg flex justify-end bg-[#f5f5f5]"></div> */}
			</div>
		</div>
	)
}

export default App
