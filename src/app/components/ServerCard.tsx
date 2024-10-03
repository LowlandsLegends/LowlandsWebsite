//TODO create server card
import React from "react";
import Image from "next/image";
import ParticlesBackground from "./Particles";
import styles from './ServerCard.module.scss';

interface ServerCardProps {
    gameMode:string;
    ipAdress:string;
    href: string
    imageSrc: string;
    title:string;
    playerCount:number;
}

export default function ServerCard({title, href, ipAdress, imageSrc, gameMode, playerCount }: ServerCardProps) {
    return (
        <div style={{ width: 1, height: 1 }} className={styles.cardWrapper}>
            <a href={href}>
                <div className={styles.card}>
                    <ParticlesBackground
                        imageSrc={imageSrc}
                        imageSize={[5, 10]}
                        density={[100, 150]}
                        click={false}
                        speed={4}
                        link={false}
                        hover={false}
                    />
                    <div className={styles.titleWrapper}>
                        <span className={styles.text}>
                            {title}
                        </span>
                    </div>
                    <div className={styles.image} style={{ position: "relative", zIndex: 2 }}>
                        <Image
                            src={imageSrc}
                            alt={imageSrc}
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className={styles.footer}>
                        <span className={styles.text}>
                            {ipAdress}
                        </span>
                        <span className={styles.text}>
                            {gameMode}
                        </span>
                        <span className={styles.text}>
                            Online: {playerCount}
                        </span>
                    </div>
                </div>
            </a>
        </div>
    );
}