// pages/about.tsx
'use client';
import React from 'react';
import ServerCard from '@components/ServerCard'
import styles from './page.module.scss'

const InfoPage: React.FC = () => {
	return (
		<div className={styles.main}>
			<div className={styles.cardWrapper}>
				<ServerCard
					imageSrc='/images/Ark_SE.svg'
					href='/'
					title='[EU/NL] ASA NEDERLAND SCORCHED EARTH'
					ipAdress='127.0.0.1:80	'
					gameMode='PVP'
					playerCount={0}
				/>
			</div>
			<div className={styles.cardWrapper}>
				<ServerCard
					imageSrc='/images/Ark_SE.svg'
					href='/'
					title='[EU/NL] ASA NEDERLAND SCORCHED EARTH'
					ipAdress='127.0.0.1:80	'
					gameMode='PVP'
					playerCount={0}
				/>
			</div>
			<div className={styles.cardWrapper}>
				<ServerCard
					imageSrc='/images/Ark_SE.svg'
					href='/'
					title='[EU/NL] ASA NEDERLAND SCORCHED EARTH'
					ipAdress='127.0.0.1:80	'
					gameMode='PVP'
					playerCount={0}
				/>
			</div>
		</div>
	);
};

export default InfoPage;