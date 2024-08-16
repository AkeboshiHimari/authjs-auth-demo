import { Button } from "@/components/ui/button";
import { auth, signOut } from "../auth";
import { Cog, LogIn, LogOut, Shield, UserRoundCheck } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";
import { SignInButton } from "@/components/signin";
export default async function Home() {
	const headersList = headers();
	const host = headersList.get("host") || "localhost:3001";
	const proto = headersList.get("x-forwarded-proto") || "http";
	const currentUrl = `${proto}://${host}${headersList.get("x-invoke-path") || ""}`;
	const signInUrl = new URL(
		process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3001",
	);
	signInUrl.searchParams.set("next", currentUrl);

	const session = await auth();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
			<div className="mb-8 flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit  rounded-xl border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
				<pre className="font-mono p-4 rounded-lg overflow-auto">
					{JSON.stringify(session, null, 2)}
				</pre>
			</div>

			<div className="flex flex-col items-center gap-4 z-20">
				<p className="text-2xl font-bold">
					{session ? `Welcome, ${session.user.name}` : "Please sign in."}
				</p>
				<div className="flex flex-row gap-2">
					{!session && <SignInButton signInUrl={signInUrl.toString()} />}
					{session && (
						<>
							<form
								action={async () => {
									"use server";
									await signOut();
								}}
							>
								<Button type="submit" size="lg" variant="secondary">
									<LogOut className="h-4 w-4 mr-2" />
									Sign Out
								</Button>
							</form>

							<Button type="button" size="lg" variant="default" asChild>
								<Link
									href={`${process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3001"}/dashboard`}
								>
									<Cog className="h-4 w-4 mr-2" />
									Manage Account
								</Link>
							</Button>
						</>
					)}
				</div>
				<p className="mb-8">
					Please delete your account after use. You can delete your account on
					management page.
				</p>
			</div>
			<div className="mb-32 grid gap-8 text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-2 text-left">
				<div className="flex flex-col gap-2 justify-start text-left">
					<Shield className="h-8 w-8 mr-2" />
					<p className="text-lg font-bold">Protected Pages</p>
					<Button size="lg" asChild variant="secondary">
						<Link href="/protected/server">By Server-side Session Check</Link>
					</Button>
					<Button size="lg" asChild variant="secondary">
						<Link href="/protected/middleware">By Middleware</Link>
					</Button>
				</div>
				<div className="flex flex-col gap-2 justify-start text-left">
					<UserRoundCheck className="h-8 w-8 mr-2" />
					<p className="text-lg font-bold">Role-Based Access Control</p>
					<Button size="lg" asChild variant="secondary">
						<Link href="/rbac/server">By Server-side Session Check</Link>
					</Button>
					<Button size="lg" asChild variant="secondary">
						<Link href="/rbac/middleware">By Middleware</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
