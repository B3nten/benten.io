//@ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
//@ts-ignore
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function Code(value: any) {
	return (
		<SyntaxHighlighter
			language={value.content.language}
			style={materialOceanic}
			codeTagProps={{ style: { backgroundColor: '' } }}
			customStyle={{
				backgroundColor: '#1f1627',
				fontFamily: 'Share Tech Mono',
			}}>
			{value.content.code}
		</SyntaxHighlighter>
	)
}