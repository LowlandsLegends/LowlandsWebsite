import '@styles/globals.css';
import '@styles/globals.scss';
import { Analytics } from "@vercel/analytics/react"
import { SupabaseProvider } from '@components/SupabaseProvider';


export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body style={{ height: '100vh', margin: 0 }}>
				<div style={{ height: '100%', width: '100%' }}>
					<SupabaseProvider>{children}</SupabaseProvider>
					<Analytics />
				</div>
			</body>
		</html>
	)
}