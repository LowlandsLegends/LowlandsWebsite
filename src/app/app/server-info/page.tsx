// pages/about.tsx
import React from 'react';
import ServerCard from '@components/ServerCard'

const InfoPage: React.FC = () => {
	return (
		<ServerCard
			imageSrc='/images/Logo.svg'
			href='/'
			title='[EU/NL] ASA NEDERLAND SCORCHED EARTH'
			ipAdress='127.0.0.1:80'
			gameMode='PVP'
			playerCount={0}
		/>
	);
};

export default InfoPage;