import { VFC, useRef, useState, useEffect } from 'react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

export const Editor: VFC = () => {
	const [editor, setEditor] =
		useState<monaco.editor.IStandaloneCodeEditor | null>(null)
	const monacoEl = useRef(null)

	useEffect(() => {
		if (monacoEl) {
			setEditor(editor => {
				if (editor) return editor

				return monaco.editor.create(monacoEl.current!, {
					value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
						'\n',
					),
					language: 'typescript',
				})
			})
		}

		return () => editor?.dispose()
	}, [monacoEl.current])

	// editor?.getModel()?.onDidChangeContent(() => (code.value = editor.value?.getValue() || ''))

	useEffect(() => {}, [editor?.getModel()?.onDidChangeContent])

	return <div className="w-[calc(100%-45px)] h-full" ref={monacoEl}></div>
}
