import { auth } from "@/auth";

export default async function Page() {
	const session = await auth();
	return (
		<>
			<div className="p-8">
				<p className="text-2xl font-bold">Authenticated & Super</p>
				<code>middleware</code>
				<div className="mb-8 flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit  rounded-xl border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
					<pre className="font-mono p-4 rounded-lg overflow-auto">
						{JSON.stringify(session, null, 2)}
					</pre>
				</div>
			</div>
		</>
	);
}
