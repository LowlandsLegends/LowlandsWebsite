// components/Home.tsx

import Logo from '@images/Logo_Text.svg';
import DiscordLogo from '@images/Discord_Icon.svg';
import AscendedLogo from '@images/White_Ascended_Logo.svg';
import ShopIcon from '@images/Shop.svg';
import Icon from '@components/Icon';
import ParticlesBackground from '@components/Particles';

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center h-screen relative">
			<ParticlesBackground
				imageSrc="/images/logo/logo.svg"
				imageSize={[7, 10]}
				density={[20, 40]}
				click={true}
				speed={4}
				link={true}
				hover={true}
			/>
			<div className="flex flex-col mt-auto z-10">
				<Logo className="w-72 sm:w-64 md:w-80 lg:w-[400px] h-auto" />
			</div>
			<div className="flex flex-row gap-5 sm:gap-8 md:gap-10 mt-auto mb-32 z-10">
				<a href="https://discord.gg/46cJAE9z4h">
					<Icon Component={DiscordLogo} alt="DiscordLogo" />
				</a>
				<a href="/app/server-info">
					<Icon Component={AscendedLogo} alt="Ascended Logo" />
				</a>
				<a href="/app/shop">
					<Icon Component={ShopIcon} alt="Shop Icon" />
				</a>
			</div>
		</div>
	);
}