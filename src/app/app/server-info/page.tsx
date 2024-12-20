// pages/about.tsx
import React from 'react';
import styles from './page.module.scss'
import ServerInfoCard from '@components/server-info/ServerInfoCard';
//import ChatBox from '@components/server-info/ChatBox'
import { Metadata } from 'next';
//import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
//import { Button } from '@/components/ui/button';
//import { MessageSquareMore } from 'lucide-react';

export const metadata: Metadata = {
	title: "Server-Info",
};

const InfoPage: React.FC = () => {
	return (
		<><div className={styles.main}>
			<div className={styles.serverCards}>
				<ServerInfoCard
					serverName='[EU/NL] LowlandsLegends.eu - The Island PVP'
					serverIp='212.132.124.138:7777'
					gamemode='pvp'
					upTime={99}
					serverIndex={0} 
				/>
				<ServerInfoCard
					serverName='[EU/NL] LowlandsLegends.eu - Abberation PVP'
					serverIp='212.132.124.138:7788'
					gamemode='pvp'
					upTime={99}
					serverIndex={1} 
				/>
				<ServerInfoCard
					serverName='[EU/NL] LowlandsLegends.eu - Extinction PVP'
					serverIp='212.132.124.138:7791'
					gamemode='pvp'
					upTime={99}
					serverIndex={1} 
				/>

			</div>
			{/* <div className={styles.chatBox}>
				<ChatBox />
			</div> */}
		</div>
		<div className="fixed bottom-8 right-0 flex justify-end p-4 lg:hidden">
			{/* <Popover>
				<PopoverTrigger asChild>
					<Button variant="shoppingcart" className="relative">
						<div className="h-10 w-10 flex items-center justify-center">
							<MessageSquareMore className='text-white' />
						</div>
					</Button>
				</PopoverTrigger>
				<PopoverContent className='lg:hidden w-full' id='popover'>
					<ChatBox />
				</PopoverContent>
			</Popover> */}
		</div>
		</>

	);
};

export default InfoPage;