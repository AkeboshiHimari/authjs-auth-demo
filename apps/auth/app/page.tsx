import {
	Card,
	CardTitle,
	CardHeader,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { SignIn } from "@/components/signin";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";
export default async function Home() {
	return (
		<>
			<Card className="mx-auto justify-center items-center p-4 mt-[1vh] md:mt-[20vh] w-full md:w-1/2 lg:w-2/5 xl:w-1/3 border-0 shadow-none md:shadow-lg rounded-2xl md:border">
				<CardHeader>
					<div className="flex flex-col gap-6">
						<CardTitle>Sign In</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="flex gap-2">
					<div className="w-full">
						<SignIn provider="google" />
					</div>
					<div className="w-full">
						<SignIn provider="twitter" />
					</div>
				</CardContent>
				<CardFooter className="flex flex-col gap-2 ">
					<CardDescription className="text-start">
						This site is for demonstration purposes. Please make sure to delete
						your account after use.
					</CardDescription>
				</CardFooter>
			</Card>
		</>
	);
}
