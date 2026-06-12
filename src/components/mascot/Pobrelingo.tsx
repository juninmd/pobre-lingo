import React from "react";
import { cn } from "@/lib/utils";

interface PobrelingoProps {
	className?: string;
	width?: number | string;
	height?: number | string;
	emotion?: "happy" | "excited" | "neutral" | "winking";
}

export function Pobrelingo({
	className,
	width = 100,
	height = 100,
	emotion = "happy",
}: PobrelingoProps) {
	// New Design: A cute, round, friendly green blob/bird character
	// More modern and "kawaii" style

	const mainColor = "#22c55e"; // Green 500
	const highlightColor = "#4ade80"; // Green 400
	const shadowColor = "#15803d"; // Green 700
	const cheekColor = "#fca5a5"; // Red 300

	return (
		<div
			className={cn(
				"inline-block drop-shadow-sm transition-transform hover:scale-105 duration-300",
				className,
			)}
			style={{ width, height }}
		>
			<svg
				viewBox="0 0 200 200"
				xmlns="http://www.w3.org/2000/svg"
				className="w-full h-full"
			>
				<defs>
					<linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor={highlightColor} />
						<stop offset="100%" stopColor={mainColor} />
					</linearGradient>
				</defs>

				{/* Body - Soft round shape */}
				<path
					d="M100 20
             C 160 20, 190 60, 190 110
             C 190 170, 150 190, 100 190
             C 50 190, 10 170, 10 110
             C 10 60, 40 20, 100 20 Z"
					fill="url(#bodyGradient)"
					stroke={shadowColor}
					strokeWidth="3"
				/>

				{/* Belly - Lighter patch */}
				<path
					d="M100 120
             Q 150 120, 150 160
             Q 150 185, 100 185
             Q 50 185, 50 160
             Q 50 120, 100 120 Z"
					fill="#dcfce7"
					opacity="0.8"
				/>

				{/* Hair / Feathers on top */}
				<path
					d="M85 25 Q 90 5, 100 20"
					fill="none"
					stroke={shadowColor}
					strokeWidth="4"
					strokeLinecap="round"
				/>
				<path
					d="M100 20 Q 110 0, 120 25"
					fill="none"
					stroke={shadowColor}
					strokeWidth="4"
					strokeLinecap="round"
				/>

				{/* Eyes - Big and cute */}
				<g transform="translate(0, 5)">
					{/* Left Eye */}
					<circle
						cx="70"
						cy="90"
						r="18"
						fill="white"
						stroke={shadowColor}
						strokeWidth="2"
					/>
					<circle cx="70" cy="90" r="8" fill="#1e293b" />
					<circle cx="73" cy="87" r="3" fill="white" />

					{/* Right Eye */}
					{emotion === "winking" ? (
						<path
							d="M112 90 Q 130 80, 148 90"
							fill="none"
							stroke="#1e293b"
							strokeWidth="4"
							strokeLinecap="round"
						/>
					) : (
						<>
							<circle
								cx="130"
								cy="90"
								r="18"
								fill="white"
								stroke={shadowColor}
								strokeWidth="2"
							/>
							<circle cx="130" cy="90" r="8" fill="#1e293b" />
							<circle cx="133" cy="87" r="3" fill="white" />
						</>
					)}
				</g>

				{/* Cheeks */}
				<circle cx="55" cy="115" r="10" fill={cheekColor} opacity="0.6" />
				<circle cx="145" cy="115" r="10" fill={cheekColor} opacity="0.6" />

				{/* Beak / Mouth */}
				<g transform="translate(0, 10)">
					{emotion === "happy" && (
						<path
							d="M90 115 Q 100 125, 110 115"
							fill="none"
							stroke="#f59e0b"
							strokeWidth="4"
							strokeLinecap="round"
						/>
					)}
					{emotion === "excited" && (
						<path
							d="M90 115 Q 100 135, 110 115"
							fill="#f59e0b"
							stroke="#d97706"
							strokeWidth="2"
						/>
					)}
					{emotion === "neutral" && (
						<line
							x1="90"
							y1="115"
							x2="110"
							y2="115"
							stroke="#f59e0b"
							strokeWidth="4"
							strokeLinecap="round"
						/>
					)}
				</g>

				{/* The "Pobre" Element: A tiny bandage instead of a patch, slightly more subtle */}
				<rect
					x="150"
					y="60"
					width="20"
					height="10"
					rx="2"
					fill="#fcd34d"
					stroke="#d97706"
					strokeWidth="1"
					transform="rotate(-15 160 65)"
				/>
				<circle
					cx="160"
					cy="65"
					r="1"
					fill="#d97706"
					transform="rotate(-15 160 65)"
				/>
			</svg>
		</div>
	);
}
