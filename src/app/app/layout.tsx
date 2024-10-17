import { Navbar } from '@/components/navbar';
import ParticlesBackground from "@components/Particles"

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div style={{ height: '100%', width: '100%' }}>
			<ParticlesBackground
				imageSrc='/images/logo.svg'
				imageSize={[7, 10]}
				density={[15, 15]}
				click={false}
				speed={4}
				link={true}
				hover={false}
			/>
			<Navbar />
			{children}
		</div>
	)
}