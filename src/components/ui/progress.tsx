"use client";

import { ProgressBar } from "@juninmd/sonido";
import * as React from "react";

interface ProgressProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> {
	/** 0 a `max` (padrão 100), como o Radix Progress que o app já usava. */
	value?: number;
	max?: number;
	/** Cor do preenchimento, quando a barra representa uma série de gráfico. */
	indicatorColor?: string;
}

/**
 * O `className` dos chamadores define a altura (`h-1.5`, `h-2`, `h-4`). O
 * Sonido só tem `sm`/`md`, então a altura vira o tamanho e sai da lista de
 * classes para não brigar com a trilha.
 */
function splitHeight(className?: string) {
	const match = className?.match(/(?:^|\s)h-(\d+(?:\.\d+)?)(?=\s|$)/);
	const rest = className
		?.replace(/(?:^|\s)h-\d+(?:\.\d+)?(?=\s|$)/g, " ")
		.trim();
	return {
		size: match && Number(match[1]) <= 1.75 ? ("sm" as const) : ("md" as const),
		className: rest,
	};
}

/**
 * Adaptador do `ProgressBar` do Sonido. A API antiga (`value` de 0 a `max`,
 * `indicatorColor`, `aria-label`) fica igual; o `role="progressbar"` e o
 * `aria-valuenow` continuam vindo do componente, que também anuncia o rótulo.
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
	({ className, value, max = 100, indicatorColor, style, ...props }, ref) => {
		// Fora da faixa ou NaN deixaria a barra indeterminada.
		const safeValue = Math.min(
			Math.max(Number.isFinite(value) ? (value as number) : 0, 0),
			max,
		);
		const fraction = max > 0 ? safeValue / max : 0;
		const { size, className: layout } = splitHeight(className);
		const {
			"aria-label": ariaLabel,
			"aria-labelledby": _ariaLabelledBy,
			...rest
		} = props;

		return (
			<div
				ref={ref}
				data-slot="progress"
				className={layout}
				style={
					indicatorColor
						? ({
								...style,
								"--sn-gradient-signature": `linear-gradient(90deg, ${indicatorColor}, ${indicatorColor})`,
							} as React.CSSProperties)
						: style
				}
				{...rest}
			>
				<ProgressBar
					value={fraction}
					label={ariaLabel ?? "Progresso"}
					size={size}
				/>
			</div>
		);
	},
);
Progress.displayName = "Progress";

export { Progress };
