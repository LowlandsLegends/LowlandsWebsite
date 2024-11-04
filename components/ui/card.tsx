import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const cardVariants = cva(
	"rounded-lg shadow-custom backdrop-blur-sm", // Base classes
	{
		variants: {
			variant: {
				default:
					"rounded-lg bg-card-dark text-card-foreground shadow-custom backdrop-blur-sm",
			},
			colorScheme: {
				dark: "bg-card-dark text-card-foreground",
				light: "bg-white text-black",
			},
			size: {
				small: "p-4",
				medium: "p-6",
				large: "p-8",
			},
		},
		defaultVariants: {
			colorScheme: "dark",
			size: "medium",
		},
	}
);

type CardProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof cardVariants>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, variant, colorScheme, size, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				cardVariants({ variant, colorScheme, size, className })
			)}
			{...props}
		/>
	)
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col items-center justify-center ", className)}
		{...props}
	/>
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn(
			"text-2xl text-white leading-none tracking-tight mt-3 p-2",
			className
		)}
		{...props}
	/>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn("text-sm text-white mt-4 text-muted-foreground", className)}
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
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
};