'use client';

import Link from "next/link";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from '@images/Logo.svg';
import Image from 'next/image';
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
				redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL!}/app/shop`,
			},
		});

		if (error) {
			console.error("Error logging in with Discord:", error.message);
		}
	};

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error('Error logging out', error)
		}
	}

	return (
		<header className={`flex h-20 w-full shrink-0 items-center px-4 md:px-6 fixed z-10 transition-backdrop-blur duration-500 ${isScrolled ? 'backdrop-blur-sm rounded-md shadow-md' : 'backdrop-blur-none'
			}`}>
			<Link href="/" className="mr-6 flex items-center bg-white bg-opacity-5 rounded-[30%] shadow-lg backdrop-blur-[80%] p-[]" prefetch={false}>
				<Icon className="" />
				<span className="sr-only">ASANL.EU</span>
			</Link>
			<div className="flex-grow flex justify-center">
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
									<Button
										onClick={handleLogout}
										variant='login'
									>
										Logout
									</Button> :
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
			{isAuthenticated && (
				<div className="hidden lg:flex items-center ml-auto">
					<span className="mr-2">{user?.user_metadata.full_name}</span>
					<Image src={user?.user_metadata.avatar_url} alt="Avatar" width={32} height={32} className="rounded-full" />
				</div>
			)}
			<Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
				<SheetTrigger asChild>
					<Button variant="navbar" size="icon" className="ml-auto lg:hidden">
						<MenuIcon className="h-6 w-6" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="flex flex-col">
					<div className="flex-grow">
						<div className="grid gap-2 py-6">
							<Link href="/app/server-info" className="flex w-full items-center py-2 text-lg font-semibold pl-0" prefetch={false} onClick={toggleSheet}>
								Server-Info
							</Link>
							<Link href="/app/shop" className="flex w-full items-center py-2 text-lg font-semibold pl-0" prefetch={false} onClick={toggleSheet}>
								Shop
							</Link>
							{
								!isAuthenticated &&
								<Button className="flex w-full items-center py-2 text-lg font-semibold text-left p-1 pl-0" onClick={handleLogin} variant='loginmobile'>
									Login
								</Button>
							}
						</div>
					</div>
					{isAuthenticated && (
						<div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-gray-200 pt-4">
							<div className="flex items-center">
								<Image src={user?.user_metadata.avatar_url} alt="Avatar" width={32} height={32} className="rounded-full mr-2" />
								<span className="mr-2">{user?.user_metadata.full_name}</span>
							</div>
							<Button className="text-sm text-center mt-auto mb-auto p-1" onClick={handleLogout} variant='ghost'>
								Logout
							</Button>
						</div>
					)}
				</SheetContent>
			</Sheet>
		</header>
	)
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
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

function Icon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<Logo
			{...props}
			width={50}
			height={50}
		/>
	)
}