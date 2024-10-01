import '@styles/globals.scss';
import '@styles/globals.css';

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