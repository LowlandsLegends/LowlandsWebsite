// components/Icon.tsx

import React from 'react';
import styles from './Icon.module.scss';

interface IconProps {
  Component: React.FC<React.SVGProps<SVGSVGElement>>;
  alt: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ Component, alt, className = '', ...props }) => {
  return (
    <div className={`${styles.iconContainer} ${className}`} aria-label={alt}>
      <Component className={styles.icon} {...props} />
    </div>
  );
};

export default Icon;
