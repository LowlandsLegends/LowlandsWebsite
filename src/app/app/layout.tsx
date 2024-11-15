import { Navbar } from '@/components/navbar';
import ParticlesBackground from "@components/ui/Particles"

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div style={{ height: '100%', width: '100%' }}>
			<ParticlesBackground
				imageSrc='/images/logo/logo.svg'
				imageSize={[7, 10]}
				density={[15, 15]}
				click={false}
				speed={4}
				link={true}
				hover={false}
			/>
			<Navbar />
			<div className='h-20 w-full' ></div>
			{children}
		</div>
	)
}