import React from 'react';
import { cn } from "@/lib/utils";

interface PobrelingoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  emotion?: 'happy' | 'excited' | 'neutral' | 'winking';
}

export function Pobrelingo({
  className,
  width = 100,
  height = 100,
  emotion = 'happy'
}: PobrelingoProps) {

  // Base colors
  const skinColor = "#4ade80"; // green-400 equivalent
  const skinDark = "#22c55e"; // green-500
  const bellyColor = "#bbf7d0"; // green-200

  return (
    <div className={cn("inline-block", className)} style={{ width, height }}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Body - Round shape with slight wobble */}
        <path
          d="M100 20
             C 150 20, 180 50, 180 100
             C 180 150, 150 185, 100 185
             C 50 185, 20 150, 20 100
             C 20 50, 50 20, 100 20 Z"
          fill={skinColor}
          stroke={skinDark}
          strokeWidth="4"
        />

        {/* Belly Patch */}
        <ellipse cx="100" cy="140" rx="40" ry="25" fill={bellyColor} opacity="0.6" />

        {/* Ears */}
        <path d="M40 50 C 30 30, 50 10, 70 40" fill={skinColor} stroke={skinDark} strokeWidth="4" />
        <path d="M160 50 C 170 30, 150 10, 130 40" fill={skinColor} stroke={skinDark} strokeWidth="4" />

        {/* Eyes Background */}
        <circle cx="70" cy="90" r="15" fill="white" stroke={skinDark} strokeWidth="2" />
        <circle cx="130" cy="90" r="15" fill="white" stroke={skinDark} strokeWidth="2" />

        {/* Pupils - Dynamic based on emotion */}
        {emotion === 'winking' ? (
           <>
             <circle cx="70" cy="90" r="6" fill="black" />
             <path d="M120 90 Q 130 80, 140 90" fill="none" stroke="black" strokeWidth="3" />
           </>
        ) : (
           <>
             <circle cx="70" cy="90" r="6" fill="black" />
             <circle cx="130" cy="90" r="6" fill="black" />
             {/* Sparkle in eyes */}
             <circle cx="73" cy="87" r="2" fill="white" />
             <circle cx="133" cy="87" r="2" fill="white" />
           </>
        )}

        {/* Mouth - Dynamic based on emotion */}
        {emotion === 'happy' && (
          <path d="M80 120 Q 100 140, 120 120" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
        )}
        {emotion === 'excited' && (
          <path d="M80 120 Q 100 150, 120 120 Z" fill="#ef4444" stroke="black" strokeWidth="2" />
        )}
        {emotion === 'neutral' && (
          <path d="M85 130 L 115 130" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
        )}

        {/* Cheeks */}
        <circle cx="60" cy="110" r="8" fill="#fca5a5" opacity="0.6" />
        <circle cx="140" cy="110" r="8" fill="#fca5a5" opacity="0.6" />

        {/* Patch (The "Pobre" element - a little sewn patch) */}
        <rect x="140" y="140" width="20" height="20" rx="2" fill="#fcd34d" stroke="#d97706" strokeWidth="1" transform="rotate(15 150 150)" />
        <line x1="145" y1="142" x2="145" y2="158" stroke="#d97706" strokeWidth="1" transform="rotate(15 150 150)" />
        <line x1="155" y1="142" x2="155" y2="158" stroke="#d97706" strokeWidth="1" transform="rotate(15 150 150)" />
        <line x1="142" y1="150" x2="158" y2="150" stroke="#d97706" strokeWidth="1" transform="rotate(15 150 150)" />

      </svg>
    </div>
  );
}
