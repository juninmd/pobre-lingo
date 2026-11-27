import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-[color,background-color,border-color,box-shadow,transform] duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"press bg-primary text-primary-foreground hover:bg-primary/90 active:scale-100",
				destructive:
					"press [--press-color:hsl(var(--destructive))] bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-100",
				outline:
					"press press-muted border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-100",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				gamified:
					"press press-gold bg-gold text-gold-foreground font-bold hover:brightness-105 active:scale-100",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
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

const Button = React.forwardRef<
	HTMLButtonElement | HTMLAnchorElement,
	PolymorphicButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild
		? Slot
		: (props as ButtonAsLinkProps).href
			? "a"
			: "button";

	if (Comp === "a") {
		const { href, ...rest } = props as ButtonAsLinkProps;
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref as React.ForwardedRef<HTMLAnchorElement>}
				href={href}
				{...rest}
			/>
		);
	}

	const { type = "button", ...rest } = props as ButtonAsButtonProps;
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref as React.ForwardedRef<HTMLButtonElement>}
			type={type}
			{...rest}
		/>
	);
});
Button.displayName = "Button";

export { Button, buttonVariants };
