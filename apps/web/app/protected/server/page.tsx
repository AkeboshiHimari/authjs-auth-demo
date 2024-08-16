import { auth } from "@/auth";

export default async function Page() {
	const session = await auth();
	if (!session)
		return (
			<div className="p-20">
				<p className="text-lg font-semibold">Please sign in</p>
                <code>server</code>
			</div>
		);

	return (
		<>
			<div className="p-8">
				<p className="text-2xl font-bold">Authenticated</p>
                <code>server</code>
				<div className="mb-8 flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit  rounded-xl border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
					<pre className="font-mono p-4 rounded-lg overflow-auto">
						{JSON.stringify(session, null, 2)}
					</pre>
				</div>
			</div>
		</>
	);
}
