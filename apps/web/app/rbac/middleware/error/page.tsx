import { auth } from "@/auth";
import Link from "next/link";

export default async function Page() {
	return (
		<>
			<div className="p-20">
				<p className="text-lg font-semibold">
					This page is only available for Super users.
				</p>
				<p className="mt-2">
					Please upgrade your account on the{" "}
					<Link
						href={`${process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3001"}/dashboard`}
						className="text-blue-600 hover:underline"
					>
						management page
					</Link>
					.
				</p>
                <code>middleware</code>
			</div>
		</>
	);
}
