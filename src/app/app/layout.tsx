
import styles from './layout.module.scss';
import Logo from '@images/Logo.svg'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
		<div className={styles.navbar}>
			<a href="/" style={{margin:10, zIndex: 10}}>
				<Logo
					width={60}
					height={60}
				/>
			</a>
		</div>
        {children}
    </div>
  )
}