"use client";
import {
	deleteAccount,
	editUsername,
	handleSignOut,
	unlinkProfile,
	upgradeAccount,
} from "@/lib/auth/account";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "./ui/drawer";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { ChevronsUp, LogOut, UserRoundX } from "lucide-react";
import { toast } from "sonner";
import { Label } from "./ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

export function Unlink({ id, provider }: { id: string; provider: string }) {
	const router = useRouter();
	const { update } = useSession();
	const unlink = async () => {
		const success = await unlinkProfile(id, provider);
		if (!success) {
			throw new Error();
		}
		await update({});
		router.refresh();
	};

	return (
		<Button
			variant="secondary"
			onClick={() => {
				toast.promise(unlink(), {
					loading: "Disconnecting profile...",
					success: "Profile disconnected",
					error: "Failed to disconnect",
				});
			}}
		>
			Disconnect
		</Button>
	);
}

export function DeleteAccount({ id }: { id: string }) {
	const [input, setInput] = React.useState("");
	const challenge = "delete my account";
	const isDesktop: boolean = useMediaQuery({
		query: "(min-width:768px)",
	});
	const goodbye = async () => {
		const success = await deleteAccount(id);
		if (!success) {
			throw new Error();
		}
		await handleSignOut();
	};

	const highlightText = (input: string, challenge: string) => {
		return challenge.split("").map((char, index) => {
			let colorClass = "currentColor";
			if (index < input.length) {
				colorClass = input[index] === char ? "text-cyan-500" : "text-red-500";
			}
			return (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<span key={index} className={colorClass}>
					{char}
				</span>
			);
		});
	};

	const confirmation = (
		<>
			<p className="mb-1 md:-mb-2">
				Enter{" "}
				<span className="font-bold">{highlightText(input, challenge)}</span> to
				continue.
			</p>
			<Input
				className="text-[16px]"
				onChange={(e) => setInput(e.target.value)}
				placeholder="delete my account"
				value={input}
			/>
		</>
	);

	const confirmButton = (
		<Button
			onClick={() => {
				toast.promise(goodbye(), {
					loading: "Deleting account...",
					success: "Account deleted",
					error: "Failed to delete account",
				});
			}}
			variant="destructive"
			disabled={input !== challenge}
			className="w-full"
		>
			Delete Account
		</Button>
	);
	return isDesktop ? (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" size="lg" className="w-full">
					<UserRoundX className="h-4 w-4 mr-2" />
					Delete Account
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="sm:max-w-[425px]">
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Account</AlertDialogTitle>
					<AlertDialogDescription>
						All your data will be deleted permanently.
					</AlertDialogDescription>
				</AlertDialogHeader>
				{confirmation}
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={() => {
							setInput("");
						}}
					>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={input !== challenge}
						className="bg-transparent hover:bg-transparent px-0"
					>
						{confirmButton}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	) : (
		<Drawer dismissible={false}>
			<DrawerTrigger asChild>
				<Button variant="destructive" size="lg" className="w-full">
					<UserRoundX className="h-4 w-4 mr-2" />
					Delete Account
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Delete Account</DrawerTitle>
					<DrawerDescription>
						All your data will be deleted permanently.
					</DrawerDescription>
				</DrawerHeader>
				<div className="px-4">{confirmation}</div>
				<DrawerFooter className="mt-2">
					{confirmButton}
					<DrawerClose asChild>
						<Button
							variant="outline"
							onClick={() => {
								setInput("");
							}}
						>
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

export function SignOut() {
	const signout = async () => {
		await handleSignOut();
	};

	return (
		<Button
			type="submit"
			className="w-full"
			variant="secondary"
			size="lg"
			onClick={() => {
				toast.promise(signout(), {
					loading: "Signing out...",
					success: "Signed out",
					error: "Failed to signed out",
				});
			}}
		>
			<LogOut className="h-4 w-4 mr-2" />
			Sign Out
		</Button>
	);
}

export function Upgrade({ id }: { id: string }) {
	const router = useRouter();
	const { data, update } = useSession();
	const upgrade = async () => {
		const success = await upgradeAccount(id);
		if (!success) {
			throw new Error();
		}
		await update({});
		router.refresh();
	};
	const isSuper = data?.user.role === "super";

	return (
		<Button
			variant="secondary"
			className={`transition-all ease-in-out duration-300 ${isSuper ? "h-0 p-0 -mt-4 text-transparent overflow-hidden" : ""}`}
			size="lg"
			onClick={() => {
				toast.promise(upgrade(), {
					loading: "Upgrading...",
					success: "Upgraded",
					error: "Failed to upgrade account",
				});
			}}
			disabled={isSuper}
		>
			<ChevronsUp className="h-4 w-4 mr-2" />
			Upgrade Account
		</Button>
	);
}

export function EditProfile({ id }: { id: string }) {
	const router = useRouter();
	const { update } = useSession();
	const [name, setName] = useState("");
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery({ query: "(min-width:768px)" });

	const edit = async () => {
		const success = await editUsername(id, name);
		if (!success) {
			throw new Error();
		}
		await update({});
		router.refresh();
	};

	const formContent = (
		<form
			className="flex flex-col gap-4"
			action={() => {
				toast.promise(edit(), {
					loading: "Changing...",
					success: "Changed",
					error: "Failed to change username",
				});
				setOpen(false);
				setName("");
			}}
		>
			<div className="flex flex-col gap-2">
				<Label htmlFor="username">Username</Label>
				<Input
					id="username"
					className="text-[16px]"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
			</div>
			<Button type="submit">Change</Button>
		</form>
	);

	return isDesktop ? (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="secondary">Edit</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Profile</DialogTitle>
				</DialogHeader>
				{formContent}
			</DialogContent>
		</Dialog>
	) : (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="secondary">Edit</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Edit Profile</DrawerTitle>
				</DrawerHeader>
				<div className="px-4 mb-4">{formContent}</div>
			</DrawerContent>
		</Drawer>
	);
}
