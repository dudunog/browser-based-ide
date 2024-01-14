import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'
import { ProjectProvider } from '@/contexts/project-context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ProjectProvider>
		<Toaster />
		<App />
	</ProjectProvider>,
)
