'use client';

import React, { useEffect, useState, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadBaseMover } from "tsparticles-move-base";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadImageShape } from "tsparticles-shape-image";
import { loadExternalPushInteraction } from "tsparticles-interaction-external-push";
import { loadExternalRepulseInteraction } from "tsparticles-interaction-external-repulse";
import { loadParticlesLinksInteraction } from "tsparticles-interaction-particles-links";
import { Engine } from "tsparticles-engine";

interface ParticlesBackgroundProps {
	imageSrc: string;
	imageSize: Array<number>; // min[0], max[1]
	density: Array<number>; // min[0], max[1]
	speed: number;
	click: boolean;
	link: boolean;
	hover: boolean;
}

export default function ParticlesBackground({ imageSrc, imageSize, density, speed, link, click, hover }: ParticlesBackgroundProps) {
	const [particlesInit, setParticlesInit] = useState<(engine: Engine) => Promise<void>>();
	const memoizedImageSize = useMemo(() => imageSize, [imageSize]);
	const memoizedDensity = useMemo(() => density, [density]);
	useEffect(() => {
		const initializeParticles = async (engine: Engine) => {
			// Load required components for particles
			await loadColorUpdater(engine);
			await loadBaseMover(engine);
			await loadSizeUpdater(engine);
			await loadOpacityUpdater(engine);
			await loadOutModesUpdater(engine);
			await loadImageShape(engine);
			await loadExternalPushInteraction(engine);
			await loadExternalRepulseInteraction(engine);
			await loadParticlesLinksInteraction(engine);
		};

		setParticlesInit(() => initializeParticles); // Store the initialized function in state
	}, []); // Only run once on component mount



	return (
		particlesInit && (
			<Particles
				style={{
					position: 'absolute', // Position absolutely within the parent
					top: 0,
					left: 0,
					width: '100%', // Fill the parent width
					height: '100%', // Fill the parent height
					zIndex: 10,
					pointerEvents: 'none', // Ensure particles don't block clicks
				}}
				init={particlesInit}
				options={{
					fpsLimit: 120,
					interactivity: {
						events: {
							onClick: {
								enable: click,
								mode: "push",
							},
							onHover: {
								enable: hover,
								mode: "repulse", 
							}
						},
						modes: {
							push: {
								quantity: 4,
							},
							repulse: { 
								distance: 150,
								duration: 0.5,
							},
						},
					},
					particles: {
						color: { value: "#ffffff" },
						links: {
							color: "#fe1d4c",
							distance: 180,
							enable: link,
							opacity: 1,
							width: 1,
						},
						move: {
							direction: "none",
							enable: true,
							outModes: "bounce",
							random: true,
							speed: speed, // default = 2
							straight: true,
						},
						number: {
							density: { enable: true },
							value: memoizedDensity[0],
							max: memoizedDensity[1],
						},
						opacity: {
							value: 0.7,
						},
						shape: {
							type: "image",
							image: {
								src: imageSrc, 
								width: 200,
								height: 200,
							},
						},
						size: {
							value: { min: memoizedImageSize[0], max: memoizedImageSize[1] },
						},
					},
					detectRetina: true,
				}}
			/>
		)
	);
}