import Image from "next/image";
import {
	Card,
	CardTitle,
	CardHeader,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import KiteLogo from "@/public/kite.svg";
import Link from "next/link";
import Profile from "@/components/profile";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
export default async function Home() {
	return (
		<>
			<Card className="mx-auto justify-center items-center p-4 mt-[1vh] md:mt-[20vh] w-full md:w-1/2 lg:w-2/5 xl:w-1/3 border-0 shadow-none md:shadow-lg rounded-2xl md:border ">
				<CardHeader>
					<div className="flex flex-col gap-6">
						<CardTitle>Account</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<Profile />
				</CardContent>
			</Card>
			<div className="mt-8 flex justify-center items-center w-full">
				<Button type="button" size="icon" variant="ghost" asChild>
					<Link href="https://github.com/AkeboshiHimari/authjs-auth-demo">
						<Github className="h-4 w-4" />
					</Link>
				</Button>
			</div>
		</>
	);
}
