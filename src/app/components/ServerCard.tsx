//TODO create server card
import React from "react";
import ParticlesBackground from "./Particles";
import styles from './ServerCard.module.scss';

interface ServerCardProps{
    /*title:string;
    ipAdress:string;
    gameMode:string; */
    href: string
    imageSrc:string;
}

export default function ServerCard({/*title, ipAdress,  gameMode, */href, imageSrc}:ServerCardProps){
    return(
        <div style={{width:1, height:1}}>
            <a href={href}>
                <div className={styles.card}>
                    <ParticlesBackground
                        imageSrc={imageSrc}
                        imageSize={[5,10]}
                        density={[100,150]}
                        click={false}
                        speed={4}
                        link={false}
                        hover={false}
                    />
                </div>
            </a>
        </div>

    );
}