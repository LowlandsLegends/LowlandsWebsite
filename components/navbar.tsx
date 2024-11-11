'use client';
import Link from "next/link";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from '@images/Logo.svg';
import { useState, useEffect } from "react";
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';

export function Navbar() {
	const supabase = useSupabaseClient();
	const session = useSession();
	const [isSheetOpen, setSheetOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	const isAuthenticated = !!session;
	const user = session?.user;
	console.log(user)

	const toggleSheet = () => setSheetOpen(!isSheetOpen);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleLogin = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "discord",
			options: {
				redirectTo: `${window.location.origin}/app/shop`,
			},
		});

		if (error) {
			console.error("Error logging in with Discord:", error.message);
		}
	};
	return (
		<header className={`flex h-20 w-full shrink-0 items-center px-4 md:px-6 fixed z-10 transition-backdrop-blur duration-500 ${isScrolled ? 'backdrop-blur-sm rounded-md shadow-md' : 'backdrop-blur-none'
			}`}>
			<Link href="/" className="mr-6 flex items-center bg-white bg-opacity-5 rounded-[30%] shadow-lg backdrop-blur-[80%] p-[]" prefetch={false}>
				<Icon className="" />
				<span className="sr-only">ASANL.EU</span>
			</Link>
			<div className="absolute left-1/2 transform -translate-x-1/2">
				<NavigationMenu className="hidden lg:flex">
					<NavigationMenuList>
						<NavigationMenuLink asChild>
							<Link
								href="/app/server-info"
								className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
								prefetch={false}
							>
								Server-Info
							</Link>
						</NavigationMenuLink>
						<NavigationMenuLink asChild>
							<Link
								href="/app/shop"
								className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
								prefetch={false}
							>
								Shop
							</Link>
						</NavigationMenuLink>
						<NavigationMenuLink asChild>
							{
								isAuthenticated ?
									<Link
										href="/app/Dashboard"
										className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
										prefetch={false}
									>
										Dashboard
									</Link> :
									<Button
										onClick={handleLogin}
										variant='login'
									>
										Login
									</Button>
							}
						</NavigationMenuLink>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			<Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
				<SheetTrigger asChild>
					<Button variant="navbar" size="icon" className="ml-auto lg:hidden">
						<MenuIcon className="h-6 w-6" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<div className="grid gap-2 py-6">
						<Link href="/app/server-info" className="flex w-full items-center py-2 text-lg font-semibold pl-0" prefetch={false} onClick={toggleSheet}>
							Server-Info
						</Link>
						<Link href="/app/shop" className="flex w-full items-center py-2 text-lg font-semibold pl-0" prefetch={false} onClick={toggleSheet}>
							Shop
						</Link>
						{
							isAuthenticated ?
								<Link href="/app/dashboard" className="flex w-full items-center py-2 text-lg font-semibold pl-0" prefetch={false} onClick={toggleSheet}>
									Dashboard
								</Link> :
								<Button className="flex w-full items-center py-2 text-lg font-semibold text-left p-1 pl-0" onClick={handleLogin} variant='loginmobile'>
									Login
								</Button>
						}
					</div>
				</SheetContent>
			</Sheet>
		</header>
	)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MenuIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="4" x2="20" y1="12" y2="12" />
			<line x1="4" x2="20" y1="6" y2="6" />
			<line x1="4" x2="20" y1="18" y2="18" />
		</svg>
	)
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Icon(props: any) {
	return (
		<Logo
			{...props}
			width={50}
			height={50}
		/>
	)
}
