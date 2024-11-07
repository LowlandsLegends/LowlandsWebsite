import '@styles/globals.css';
import '@styles/globals.scss';


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
				</div>
			</body>
		</html>
	)
}