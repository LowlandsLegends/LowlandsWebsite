// pages/about.tsx
import React from 'react';
import ServerCard from '@components/ServerCard'
import styles from './page.module.scss'
import { RCONScheduler } from '@lib/rcon';

const InfoPage: React.FC = () => {

	const islandPlayers = async () => {
		const island = new RCONScheduler(0)
		await island.connectRCON();
		const players = await island.getPlayerCount()
		return players
	}

	return (
		<div className={styles.main}>
			<div className={styles.cardWrapper}>
				<ServerCard
					imageSrc='/images/Ark_SE.svg'
					href='/'
					title='[EU/NL] ASA NEDERLAND SCORCHED EARTH'
					ipAdress='127.0.0.1:80	'
					gameMode='PVP'
					playerCount={islandPlayers()}
				/>
			</div>
		</div>
	);
};

export default InfoPage;