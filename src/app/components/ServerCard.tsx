//TODO create server card
'use client';
import React from "react";
import Image from "next/image";
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
        <div className={styles.cardWrapper} style={{display:'inline-block'}}>
            <a href={href}>
                <div className={styles.card}>
                    <div className={styles.titleWrapper}>
                        <span className={styles.text}>
                            {title}
                        </span>
                    </div>
                    <div className={styles.image} style={{ position: "relative", zIndex: 2 }}>
                        <Image
                            src={imageSrc}
                            alt={imageSrc}
                            width={300}
                            height={300}
                        />
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.spanWrapper}>
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
                </div>
            </a>
        </div>
    );
}