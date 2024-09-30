import styles from './page.module.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ height: '100vh', margin: 0 }} className={styles.page}>
        <div style={{ height: '100%', width: '100%' }}>
          {children}
        </div>
      </body>
    </html>
  )
}