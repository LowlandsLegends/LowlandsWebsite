// pages/about.tsx
import React from 'react';
import styles from './page.module.scss'
import ServerInfoCard from '@components/server-info/ServerInfoCard';
import ChatBox from '@components/server-info/ChatBox'
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: "Server-Info",
};

const InfoPage: React.FC = () => {
	return (
		<div className={styles.main}>
			<div className={styles.serverCards}>
				<ServerInfoCard
					serverName='[EU/NL] ASA NEDERLAND Abberation'
					serverIp='212.132.124.138:7786'
					gamemode='pvp'
					upTime={99}
					serverIndex={3}
				/>
				<ServerInfoCard
					serverName='[EU/NL] ASA NEDERLAND The Island'
					serverIp='212.132.124.138:7777'
					gamemode='pvp'
					upTime={99}
					serverIndex={0}
				/>
				<ServerInfoCard
					serverName='[EU/NL] ASA NEDERLAND The Center'
					serverIp='212.132.124.138:7789'
					gamemode='pvp'
					upTime={99}
					serverIndex={1}
				/>
				<ServerInfoCard
					serverName='[EU/NL] ASA NEDERLAND Scorched Earth'
					serverIp='212.132.124.138:7780'
					gamemode='pvp'
					upTime={99}
					serverIndex={2}
				/>
			</div>
			<div className={styles.chatBox}>
				<ChatBox/>
			</div>
		</div>

	);
};

export default InfoPage;