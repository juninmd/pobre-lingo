import {
	Badge as SonidoBadge,
	type BadgeProps as SonidoBadgeProps,
} from "@juninmd/sonido";
import type * as React from "react";

import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export type BadgeTone = NonNullable<SonidoBadgeProps["tone"]>;
export type BadgeAppearance = NonNullable<SonidoBadgeProps["appearance"]>;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant;
	/** Tom do Sonido; quando informado, vence o mapeamento de `variant`. */
	tone?: BadgeTone;
	/** `count` é o bloco compacto de 10px para contadores. */
	appearance?: BadgeAppearance;
	dot?: boolean;
	live?: boolean;
}

const VARIANT_TONE: Record<BadgeVariant, BadgeTone> = {
	default: "accent",
	secondary: "neutral",
	destructive: "danger",
	outline: "neutral",
};

const VARIANT_APPEARANCE: Record<BadgeVariant, BadgeAppearance> = {
	default: "solid",
	secondary: "soft",
	destructive: "solid",
	outline: "soft",
};

/** Classes da pílula do Sonido, para quem monta o próprio elemento. */
export function badgeVariants({
	variant = "default",
	className,
}: {
	variant?: BadgeVariant;
	className?: string;
} = {}) {
	return cn(
		"sn-badge",
		`sn-badge--${VARIANT_TONE[variant]}`,
		`sn-badge--${VARIANT_APPEARANCE[variant]}`,
		variant === "outline" && "bg-transparent",
		className,
	);
}

/**
 * Adaptador do `Badge` do Sonido. O app usava `variant` para categoria e
 * `className` para cor; os dois continuam valendo.
 */
export function Badge({
	className,
	variant = "default",
	tone,
	appearance,
	dot,
	live,
	...props
}: BadgeProps) {
	return (
		<SonidoBadge
			tone={tone ?? VARIANT_TONE[variant]}
			appearance={appearance ?? VARIANT_APPEARANCE[variant]}
			dot={dot}
			live={live}
			className={cn(variant === "outline" && "bg-transparent", className)}
			{...props}
		/>
	);
}
