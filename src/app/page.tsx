
import Logo from '@images/Logo_Text.svg';
import DiscordLogo from '@images/Discord_Icon.svg';
import AscendedLogo from '@images/White_Ascended_Logo.svg';
import ShopIcon from '@images/Shop.svg'
import Icon from '@components/Icon'
import ParticlesBackground from '@components/Particles';

import styles from './page.module.scss';

export default function Home() {
	return (
		<div className={styles.page}>
			<ParticlesBackground
				imageSrc='/images/logo.svg'
				imageSize={[7, 10]}
				density={[20, 40]}
				click={true}
				speed={4}
				link={true}
				hover={true}
			/>
			<div className={styles.main} style={{ zIndex: 10 }}>
				<Logo
					width={400}
					height={400}
				/>
			</div>
			<div className={styles.footer}>
				<a href='https://discord.gg/46cJAE9z4h' className={styles.button}>
					<Icon Component={DiscordLogo} alt="DiscordLogo" />
				</a>
				<a href="/app/server-info">
					<Icon Component={AscendedLogo} alt="Ascended Logo" />
				</a>
				<Icon Component={ShopIcon} alt="Shop Icon" />
			</div>
		</div>
	);
}