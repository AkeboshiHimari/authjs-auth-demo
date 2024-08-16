import { Button } from "./ui/button";
import Image from "next/image";
import GoogleLogo from "@/public/google.svg";
import XLogo from "@/public/x.svg";
import { signIn } from "@/lib/auth/auth";
import { headers } from "next/headers";

export function SignIn({ provider }: { provider: string }) {
	const size = provider === "google" ? 30 : 24;
	return (
		<form
			action={async () => {
				"use server";
				const headersList = headers();
				const referer = headersList.get("referer");
				let next = "";

				if (referer) {
					try {
						const url = new URL(referer);
						next = url.searchParams.get("next") || "";
					} catch (error) {
						console.error("Invalid referer URL:", error);
					}
				}

				await signIn(provider, {
					redirectTo: `/handshake${
						next ? `?next=${encodeURIComponent(next)}` : ""
					}`,
				});
			}}
		>
			<Button
				size="lg"
				variant="secondary"
				className="w-full rounded-xl h-16"
				onClick={async () => {
					"use server";
					const headersList = headers();
					const referer = headersList.get("referer");
					let next = "";

					if (referer) {
						try {
							const url = new URL(referer);
							next = url.searchParams.get("next") || "";
						} catch (error) {
							console.error("Invalid referer URL:", error);
						}
					}

					await signIn(provider, {
						redirectTo: `/handshake${
							next ? `?next=${encodeURIComponent(next)}` : ""
						}`,
					});
				}}
			>
				<Image
					src={provider === "google" ? GoogleLogo : XLogo}
					alt={`${provider}로 계속하기`}
					className={provider === "twitter" ? "dark:invert" : ""}
					width={size}
					height={size}
				/>
			</Button>
		</form>
	);
}

export function Link({ provider }: { provider: string }) {
	return (
		<form
			action={async () => {
				"use server";
				await signIn(provider);
			}}
		>
			<Button variant="default" >Connect</Button>
		</form>
	);
}
