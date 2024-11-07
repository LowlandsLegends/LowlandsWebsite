// pages/about.tsx
import React from 'react';
import styles from './page.module.scss'
import { RCONScheduler } from '@lib/rcon';
import ServerInfoCard from '@components/ServerInfoCard';
import { error } from 'node:console';

const InfoPage: React.FC = async () => {

	const getPlayers = async (index: number): Promise<number> => {
		try {
			const obj = new RCONScheduler(index);
			await obj.connectRCON();
			const players = await obj.getPlayerCount()
			return players
		} catch (error) {
			console.log(error)
			return 0
		}
	}

	const islandPlayers = async () => { return await getPlayers(0); }
	const centerPlayers = async () => { return await getPlayers(1); }
	const scorchedEarthPlayers = async () => { return await getPlayers(2); }
	const aberrationPlayers = async () => { return await getPlayers(3); }

	const isOnline = async (index: number): Promise<boolean> => {
		const rcon = new RCONScheduler(index);
		try {
			await rcon.connectRCON();
			return true;
		} catch (error) {
			console.log(error)
			return false;
		}
	}

	return (
		<div className={styles.main}>
			<ServerInfoCard
				serverName='[EU/NL] ASA NEDERLAND Abberation'
				serverIp='212.132.124.138:7786'
				gamemode='pvp'
				isOnline={isOnline(3)}
				playerCount={aberrationPlayers()}
				upTime={99}
				serverIndex={3}
			/>
			<ServerInfoCard
				serverName='[EU/NL] ASA NEDERLAND The Island'
				serverIp='212.132.124.138:7777'
				gamemode='pvp'
				isOnline={isOnline(0)}
				playerCount={islandPlayers()}
				upTime={99}
				serverIndex={0}
			/>
			<ServerInfoCard
				serverName='[EU/NL] ASA NEDERLAND The Center'
				serverIp='212.132.124.138:7789'
				gamemode='pvp'
				isOnline={isOnline(1)}
				playerCount={centerPlayers()}
				upTime={99}
				serverIndex={1}
			/>
			<ServerInfoCard
				serverName='[EU/NL] ASA NEDERLAND Scorched Earth'
				serverIp='212.132.124.138:7780'
				gamemode='pvp'
				isOnline={await isOnline(2)}
				playerCount={scorchedEarthPlayers()}
				upTime={99}
				serverIndex={2}
			/>
		</div>

	);
};

export default InfoPage;