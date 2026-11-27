import { Card as SonidoCard } from "@juninmd/sonido";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Superfície do `Card` do Sonido (`surface="solid"`, sem padding próprio).
 * Cabeçalho, corpo e rodapé continuam wrappers de layout do app: o Sonido os
 * publica com tipografia e `display:flex` próprios, que mudariam telas que já
 * dependem do padding e da ordem atuais.
 */
// O `Card` do Sonido é uma função sem `forwardRef` nos tipos, mas o React 19
// entrega `ref` como prop e o componente repassa o resto ao `<div>`.
const CardWithRef = SonidoCard as unknown as React.ForwardRefExoticComponent<
	React.ComponentProps<typeof SonidoCard> & React.RefAttributes<HTMLDivElement>
>;

const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<CardWithRef
		ref={ref}
		surface="solid"
		padding="none"
		className={cn("pl-card", className)}
		{...props}
	/>
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col space-y-1.5 p-6", className)}
		{...props}
	/>
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"text-2xl font-semibold leading-none tracking-tight",
			className,
		)}
		{...props}
	/>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center p-6 pt-0", className)}
		{...props}
	/>
));
CardFooter.displayName = "CardFooter";

export {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
};
