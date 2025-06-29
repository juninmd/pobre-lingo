import type { FC } from 'react';

interface PobreLingoLogoProps {
  className?: string;
  iconSize?: string; // e.g., 'h-8 w-8'
}

const PobreLingoLogo: FC<PobreLingoLogoProps> = ({ className, iconSize = 'h-8 w-8' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        className={`${iconSize} text-primary`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        <path d="m12 6-2 5 2 5"></path>
        <path d="m17 6-2 5 2 5"></path>
      </svg>
      <span className="ml-2 font-headline text-2xl font-bold text-primary">
        Pobre<span className="text-accent">Lingo</span>
      </span>
    </div>
  );
};

export default PobreLingoLogo;
