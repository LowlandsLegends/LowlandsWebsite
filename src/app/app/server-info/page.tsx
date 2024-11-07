// pages/about.tsx
import React from 'react';
import styles from './page.module.scss'
import { RCONScheduler} from '@lib/rcon';
import ServerInfoCard from '@components/ServerInfoCard';

const InfoPage: React.FC = () => {

	const getPlayers = async (index:number): Promise<number> => {
		const obj = new RCONScheduler(index);
		await obj.connectRCON();
		const players = await obj.getPlayerCount()
		return players
	}

	const islandPlayers = async () => { return await getPlayers(0); }
	const centerPlayers = async () => { return await getPlayers(1); }
	const scorchedEarthPlayers = async () => { return await getPlayers(2); }
	const aberrationPlayers = async () => { return await getPlayers(3); }

	return (
		<div className={styles.main}>
			<ServerInfoCard
				serverName='[EU/NL] ASA NEDERLAND Abberation'
				serverIp='127.0.0.1:80'
				gamemode='pvp'
				isOnline={true}
				playerCount={aberrationPlayers()}
				upTime={99}
				serverIndex={3}
			/>
			<ServerInfoCard 
				serverName='[EU/NL] ASA NEDERLAND island'
				serverIp='127.0.0.1:80'
				gamemode='pvp'
				isOnline={true}
				playerCount={islandPlayers()}
				upTime={99}
				serverIndex={0}
			/>
			<ServerInfoCard 
				serverName='[EU/NL] ASA NEDERLAND center'
				serverIp='127.0.0.1:80'
				gamemode='pvp'
				isOnline={true}
				playerCount={centerPlayers()}
				upTime={99}
				serverIndex={1}
			/>
			<ServerInfoCard 
				serverName='[EU/NL] ASA NEDERLAND scorchedEarth'
				serverIp='127.0.0.1:80'
				gamemode='pvp'
				isOnline={true}
				playerCount={scorchedEarthPlayers()}
				upTime={99}
				serverIndex={2}
			/>
		</div>
		
	);
};

export default InfoPage;