'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import styles from './page.module.scss'
import DiscordLogo from '@images/Discord_Icon.svg'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// Reusing the existing ParticlesBackground component
import ParticlesBackground from '@/src/app/components/ui/Particles'
import Icon from './components/ui/Icon'
import ReactMarkdown from 'react-markdown'


export default function Home() {
	const targetDate = new Date('2024-12-16')
	const startDate = new Date('2024-11-12') // Assuming 1 month countdown
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	})
	const [progress, setProgress] = useState(0)

	const message = `
## **What’s New?**
> - *Extinction Map Launch*: Join us on **December 16th** for the release of extinction 	.  
> - *New Features*: Point system, in-game crosschat, and a sleek shop UI for trading & **nonP2W** endgame items.  
> - *Rewritten Rules*: Designed to create a fairer and smoother experience.
> - *Rebalancing Multipliers*: We are reworking the multipliers on harvesting, xp, breeding & taming
> - Click the **Discord icon** to join the discord server and stay updated!
 > - *Get involved and help shape the server by participating in community polls in the Discord Server.*`
 


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

			<div className="z-10 flex flex-col items-center space-y-8 max-w-4xl w-full">
				{/* Message Card */}
				<Card className="w-full max-w-lg bg-white/10 backdrop-blur-lg border-white/20">
					<CardContent className="p-6 text-white">
						<h2 className="text-2xl font-bold mb-4 text-center">Welcome to Lowlands Legends!</h2>
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[rehypeRaw]}
						>
							{message}
						</ReactMarkdown>
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