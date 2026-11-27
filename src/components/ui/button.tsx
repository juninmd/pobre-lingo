import {
	Button as SonidoButton,
	type ButtonProps as SonidoButtonProps,
} from "@juninmd/sonido";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant =
	| "default"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link"
	| "gamified";

export type ButtonSize = "default" | "xs" | "sm" | "lg" | "icon";
export type ButtonAppearance = "solid" | "outline";

/** Nomes que o app já usava → variantes publicadas pelo Sonido. */
const SONIDO_VARIANT: Record<ButtonVariant, SonidoButtonProps["variant"]> = {
	default: "primary",
	destructive: "danger",
	outline: "secondary",
	secondary: "secondary",
	ghost: "ghost",
	link: "link",
	gamified: "primary",
};

const SONIDO_SIZE: Record<ButtonSize, SonidoButtonProps["size"]> = {
	default: "md",
	xs: "xs",
	sm: "sm",
	lg: "lg",
	icon: "icon",
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
	default: "sn-button--primary",
	destructive: "sn-button--danger",
	outline: "sn-button--secondary sn-button--outline",
	secondary: "sn-button--secondary",
	ghost: "sn-button--ghost",
	link: "sn-button--link",
	gamified: "sn-button--primary sn-button--press pl-button--gamified",
};

const SIZE_CLASS: Partial<Record<ButtonSize, string>> = {
	xs: "sn-button--xs",
	sm: "sn-button--sm",
	lg: "sn-button--lg",
	icon: "sn-button--icon",
};

interface ButtonVariantOptions {
	variant?: ButtonVariant | null;
	size?: ButtonSize | null;
	appearance?: ButtonAppearance | null;
	className?: string;
}

/**
 * Classes do botão do Sonido. Exportada porque `AlertDialogAction` e
 * `AlertDialogCancel` montam o próprio elemento e só reaproveitam o visual.
 */
export function buttonVariants({
	variant = "default",
	size = "default",
	appearance,
	className,
}: ButtonVariantOptions = {}) {
	const variantName = variant ?? "default";
	const sizeName = size ?? "default";
	return cn(
		"sn-button",
		VARIANT_CLASS[variantName],
		SIZE_CLASS[sizeName],
		(appearance ?? (variantName === "outline" ? "outline" : "solid")) ===
			"outline" && "sn-button--outline",
		className,
	);
}

export interface ButtonProps {
	variant?: ButtonVariant;
	size?: ButtonSize;
	/** `outline` = só borda e texto na cor do tom, como o antigo `outline`. */
	appearance?: ButtonAppearance;
	asChild?: boolean;
}

export interface ButtonAsButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		ButtonProps {}

export interface ButtonAsLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
		ButtonProps {
	href: string;
}

export type PolymorphicButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

/**
 * Adaptador fino do `Button` do Sonido. Mantém a API do app (`asChild`,
 * `href`, `gamified`, `size="default"`), o `type="button"` padrão e o link
 * que perde `href` quando desabilitado.
 */
const Button = React.forwardRef<
	HTMLButtonElement | HTMLAnchorElement,
	PolymorphicButtonProps
>(
	(
		{ className, variant, size, appearance, asChild = false, ...props },
		ref,
	) => {
		if (asChild) {
			return (
				<Slot
					ref={ref as React.Ref<HTMLElement>}
					className={buttonVariants({ variant, size, appearance, className })}
					{...(props as React.HTMLAttributes<HTMLElement>)}
				/>
			);
		}

		const sonidoProps = {
			className: cn(variant === "gamified" && "pl-button--gamified", className),
			variant: SONIDO_VARIANT[variant ?? "default"],
			size: SONIDO_SIZE[size ?? "default"],
			appearance: appearance ?? (variant === "outline" ? "outline" : "solid"),
			press: variant === "gamified",
		};

		if ("href" in props && props.href) {
			const { href, type: _type, ...rest } = props as ButtonAsLinkProps;
			return (
				<SonidoButton
					{...sonidoProps}
					ref={ref as React.Ref<HTMLAnchorElement>}
					href={href}
					{...(rest as unknown as SonidoButtonProps)}
				/>
			);
		}

		const { type = "button", ...rest } = props as ButtonAsButtonProps;
		return (
			<SonidoButton
				{...sonidoProps}
				type={type}
				{...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button };
