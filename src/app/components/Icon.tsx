// components/Icon.tsx

import React from 'react';

interface IconProps {
	Component: React.FC<React.SVGProps<SVGSVGElement>>;
	alt: string;
	className?: string;
}

const Icon: React.FC<IconProps> = ({ Component, alt, className = '', ...props }) => {
	return (
		<div
			className={`flex items-center justify-center w-[100px] h-[100px] ${className}`}
			aria-label={alt}
		>
			<Component
				className={`
          relative
          w-[clamp(65px,6.5vw,130px)]
          h-[65px]
          transition-transform duration-300 ease
          rounded-[30%] 
          shadow-[0_2px_20px_rgba(0,0,0,0.35)]
          backdrop-blur-[5px]
          p-2.5
          hover:scale-110
          md:w-[clamp(110px,13vw,220px)]
          md:h-[100px]
          md:rounded-[30%]
          md:shadow-[0_2px_20px_rgba(0,0,0,0.35)]
          md:backdrop-blur-[5px]
          md:px-2.5
          md:py-2.5
        `}
				{...props}
			/>
		</div>
	);
};

export default Icon;