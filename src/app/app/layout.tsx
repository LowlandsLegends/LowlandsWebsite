import { Navbar } from '@/components/navbar';
import ParticlesBackground from "@components/ui/Particles"
import Footer from '@components/ui/Footer';
import { usePathname } from 'next/navigation';


export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// Determine height dynamically based on the route
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
			<div className='h-10 w-full'></div>
			<Footer />
		</div>
	)
}