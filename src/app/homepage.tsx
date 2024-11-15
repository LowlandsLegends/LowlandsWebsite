'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import styles from './page.module.scss'
import DiscordLogo from '@images/Discord_Icon.svg'


// Reusing the existing ParticlesBackground component
import ParticlesBackground from '@/src/app/components/ui/Particles'
import Icon from './components/ui/Icon'


export default function HomePage() {
	const targetDate = new Date('2024-12-16')
	const startDate = new Date('2024-11-12') // Assuming 1 month countdown
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	})
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date()
			const difference = +targetDate - +now
			const totalDuration = +targetDate - +startDate

			// Calculate progress percentage
			const elapsed = +now - +startDate
			const newProgress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
			setProgress(newProgress)

			if (difference > 0) {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / 1000 / 60) % 60),
					seconds: Math.floor((difference / 1000) % 60)
				})
			}
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
			<ParticlesBackground
				imageSrc="/images/logo/logo.svg"
				imageSize={[10, 15]}
				density={[20, 40]}
				click={true}
				speed={4}
				link={true}
				hover={true}
			/>

			<div className="z-10 flex flex-col items-center space-y-6 max-w-4xl w-full">
				{/* Message Card */}
				<Card className="w-full max-w-lg bg-white/10 backdrop-blur-lg border-white/20">
					<CardContent className="p-2 text-white">
						<h2 style={{ fontSize: '1.5rem' }} className='text-center'><strong>Welcome To Lowlands Legends PVP</strong></h2>

						<ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.4 }}>
							<li>
								<h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}><em>Extinction Map Launch</em></h3>
								<p style={{ fontSize: '0.9rem' }}>Join us on <strong>December 16th</strong> for the release of extinction.</p>
							</li>
							<li>
								<h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}><em>New Features</em></h3>
								<p style={{ fontSize: '0.9rem' }}>Point system (earn points through in-game playtime), in-game crosschat, and a sleek shop UI for trading, <strong>nonP2W</strong> endgame shop-items.</p>
							</li>
							<li>
								<h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}><em>Rewritten Rules</em></h3>
								<p style={{ fontSize: '0.9rem' }}>Designed to create a fairer and smoother experience. Also to protect new-players from map-alpha&apos;s</p>
							</li>
							<li>
								<h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}><em>Rebalancing Multipliers</em></h3>
								<p style={{ fontSize: '0.9rem' }}>We are reworking the multipliers on harvesting, XP, breeding, and taming.</p>
							</li>
							<li>
								<h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Join the Discord</h3>
								<p style={{ fontSize: '0.9rem' }}>Click the <strong>Discord Icon In The Bottom Right</strong> to join the server and stay updated! Help shape the server by participating in community polls in the Discord Server.</p>
							</li>
						</ul>
					</CardContent>
				</Card>

				{/* Countdown */}
				<div className="grid grid-cols-4 gap-4 w-full max-w-lg">
					{Object.entries(timeLeft).map(([unit, value]) => (
						<div
							key={unit}
							className="bg-black/20 backdrop-blur-lg rounded-lg p-4 text-center"
						>
							<span className="text-4xl font-bold text-white">{value}</span>
							<span className="block text-sm text-white/80 capitalize">{unit}</span>
						</div>
					))}
				</div>

				{/* Progress Bar */}
				<div className="w-full max-w-lg space-y-2">
					<Progress value={progress} className="h-3" />
					<p className="text-center text-white/80">
						{progress.toFixed(1)}% of the way there
					</p>
				</div>


				<div className="absolute bottom-0 right-0 animate-bounce m-1">
					<a href='https://discord.gg/46cJAE9z4h' className={styles.button}>
						<Icon Component={DiscordLogo} alt="DiscordLogo" />
					</a>
				</div>	
			</div>
		</div>
	)
}