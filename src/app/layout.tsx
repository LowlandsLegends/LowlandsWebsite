import '@styles/globals.css';
import '@styles/globals.scss';

import { RCONScheduler } from '@lib/rcon';

async function fetchAndStoreIslandPlayerCount(){
	const scheduler = new RCONScheduler(0);
	try {
		await scheduler.connectRCON();
		const playerCount = await scheduler.getPlayerCount();
		await scheduler.storePlayerCount(playerCount);
		await scheduler.rconClient?.end();
	} catch (error) {
		console.error(`Error fetching player count for server ${scheduler.index}:`, error);
	}
}

async function fetchAndStoreCenterPlayerCount(){
	const scheduler = new RCONScheduler(1);
	try {
		await scheduler.connectRCON();
		const playerCount = await scheduler.getPlayerCount();
		await scheduler.storePlayerCount(playerCount);
		await scheduler.rconClient?.end();
	} catch (error) {
		console.error(`Error fetching player count for server ${scheduler.index}:`, error);
	}
}

async function fetchAndStoreScorchedEarthPlayerCount(){
	const scheduler = new RCONScheduler(2);
	try {
		await scheduler.connectRCON();
		const playerCount = await scheduler.getPlayerCount();
		await scheduler.storePlayerCount(playerCount);
		await scheduler.rconClient?.end();
	} catch (error) {
		console.error(`Error fetching player count for server ${scheduler.index}:`, error);
	}
}

async function fetchAndStoreAberrationPlayerCount(){
	const scheduler = new RCONScheduler(3);
	try {
		await scheduler.connectRCON();
		const playerCount = await scheduler.getPlayerCount();
		await scheduler.storePlayerCount(playerCount);
		await scheduler.rconClient?.end();
	} catch (error) {
		console.error(`Error fetching player count for server ${scheduler.index}:`, error);
	}
}

setInterval(fetchAndStoreAberrationPlayerCount, 360000);
fetchAndStoreAberrationPlayerCount();

setInterval(fetchAndStoreIslandPlayerCount, 360000);
fetchAndStoreIslandPlayerCount();

setInterval(fetchAndStoreCenterPlayerCount, 360000);
fetchAndStoreCenterPlayerCount();

setInterval(fetchAndStoreScorchedEarthPlayerCount, 360000);
fetchAndStoreScorchedEarthPlayerCount();

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