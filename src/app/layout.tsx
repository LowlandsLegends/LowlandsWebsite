import '@styles/globals.css';
import '@styles/globals.scss';
import { Analytics } from "@vercel/analytics/react"


export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body style={{ height: '100vh', margin: 0 }}>
				<div style={{ height: '100%', width: '100%' }}>
					{children}
					<Analytics />
				</div>
			</body>
		</html>
	)
}