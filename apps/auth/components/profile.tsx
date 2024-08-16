import { auth } from "@/lib/auth/auth";
import { DeleteAccount, Unlink, SignOut, Upgrade, EditProfile } from "./buttons";
import { Link } from "./signin";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import GoogleLogo from "@/public/google.svg";
import XLogo from "@/public/x.svg";
import Image from "next/image";
import { Label } from "@radix-ui/react-label";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export default async function Profile() {
	const session = await auth();

	if (!session?.user) return null;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between">
				<div className="flex flex-row gap-4 items-center">
					<Avatar>
						<AvatarImage src={session.user.image} />
						<AvatarFallback>{session.user.name[0]}</AvatarFallback>
					</Avatar>
					<div className="flex gap-2">
						<p>{session.user.name}</p>
						<div
							className={`w-auto inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${session.user.role === "super" ? "text-white border-0 transition-all duration-500 ease-in-out bg-gradient-to-r from-blue-500 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100" : "bg-muted hover:bg-muted/80 transition-all duration-500 ease-in-out"}`}
						>
							{session.user.role.charAt(0).toUpperCase() +
								session.user.role.slice(1)}
						</div>
					</div>
				</div>
				<EditProfile id={session.user.id}/>
			</div>
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Connected Accounts</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-3">
					<ConnectedAccounts provider="google" />
					<ConnectedAccounts provider="twitter" />
				</CardContent>
			</Card>
			<Upgrade id={session.user.id} />
			<SignOut />
			<DeleteAccount id={session.user.id} />
		</div>
	);
}

const ConnectedAccounts = async ({ provider }: { provider: string }) => {
	const session = await auth();
	if (!session?.user) return null;
	const size = provider === "google" ? 24 : 20;
	return (
		<div className="flex justify-between items-center w-full">
			<div className="flex flex-row gap-3 items-center">
				<Image
					src={provider === "google" ? GoogleLogo : XLogo}
					alt={`연결된 ${provider}계정`}
					className={provider === "twitter" ? "dark:invert mr-1" : ""}
					width={size}
					height={size}
				/>
				<Label
					className={session.user[provider] ? "" : "text-muted-foreground"}
				>
					{session.user[provider] ? session.user[provider] : "Not Connected"}
				</Label>
			</div>
			{session.user.google && session.user.twitter && (
				<Unlink id={session.user.id} provider={provider} />
			)}
			{!session.user[provider] && <Link provider={provider} />}
		</div>
	);
};
