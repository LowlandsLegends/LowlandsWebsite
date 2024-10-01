// pages/about.tsx
import React from 'react';
import ServerCard from '@components/ServerCard'

const InfoPage: React.FC = () => {
	return (
		<ServerCard
			imageSrc='/images/Logo.svg'
			href='/'
		/>
	);
};

export default InfoPage;