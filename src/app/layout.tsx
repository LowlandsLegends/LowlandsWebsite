'use client';

import '@styles/globals.css';
import '@styles/globals.scss';
import { Analytics } from "@vercel/analytics/react"
import { SupabaseProvider } from '@components/SupabaseProvider';
import { useEffect } from 'react';


export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	useEffect(() => {
		fetch('/api/log-ip', { method: 'POST' }).catch((err) => console.error('Failed to log IP:', err));
	}, []);
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