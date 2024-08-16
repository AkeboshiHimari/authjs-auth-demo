"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

export function SignInButton({ signInUrl }: { signInUrl: string }) {
	return (
		<Button type="button" size="lg" variant="default" asChild>
			<Link href={signInUrl}>
				<LogIn className="h-4 w-4 mr-2" />
				Sign In
			</Link>
		</Button>
	);
}
