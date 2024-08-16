"use server";
import client from "@/lib/db";
import { ObjectId } from "mongodb";
import { signOut } from "./auth";

const db = client.db("auth");
const accounts = db.collection("accounts");
const users = db.collection("users");

export const initializeUser = async (id: string) => {
	return users.updateOne(
		{
			_id: new ObjectId(id),
		},
		{
			$set: {
				role: "user",
				createdAt: new Date(),
			},
		},
		{
			upsert: true,
		},
	);
};

export const findUser = async (id: string) => {
	return users.findOne({ _id: new ObjectId(id) });
};


export const unlinkProfile = async (
	id: string,
	provider: string,
): Promise<boolean> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	if (!ObjectId.isValid(id)) {
		return false;
	}

	try {
		await users.updateOne(
			{ _id: new ObjectId(id) },
			{
				$unset: {
					[provider]: "",
				},
			},
		);
		await accounts.deleteOne({
			userId: new ObjectId(id),
			provider,
		});
		return true;
	} catch (error) {
		return false;
	}
};


/**
 * 사용자의 프로필을 연결합니다.
 *
 * @param id - 사용자의 UID
 * @param provider - 연결할 OAuth 제공자
 * @param profile - OAuth 프로필
 */
export const linkProfile = async (
	id: string | undefined,
	provider: string | null,
	profile: GoogleProfile | TwitterProfile | null,
) => {
	if (!provider || !profile) return;
	const updateData = (() => {
		switch (provider) {
			case "google":
				if ("sub" in profile) {
					return {
						google: {
							id: profile.sub,
							name: profile.name,
							picture: profile.picture,
							addedAt: new Date(),
						},
					};
				}
				break;
			case "twitter":
				if ("data" in profile) {
					return {
						twitter: {
							id: profile.data.id,
							name: profile.data.name,
							username: profile.data.username,
							picture: profile.data.profile_image_url,
							addedAt: new Date(),
						},
					};
				}
				break;
		}
		return null;
	})();

	if (updateData) {
		await users.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: updateData },
			{ upsert: true },
		);
	}
};


interface GoogleProfile {
	sub: string;
	name: string;
	picture: string;
}

interface TwitterProfile {
	data: {
		id: string;
		name: string;
		username: string;
		profile_image_url: string;
	};
}


export const deleteAccount = async (id: string): Promise<boolean> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	if (!ObjectId.isValid(id)) {
		return false;
	}
	try {
		await users.deleteOne({ _id: new ObjectId(id) });
		await accounts.deleteMany({
			userId: new ObjectId(id),
		});
		return true;
	} catch (error) {
		return false;
	}
};


export const upgradeAccount = async (id: string): Promise<boolean> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	if (!ObjectId.isValid(id)) {
		return false;
	}
	try {
		await users.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: { role: "super" } },
		);
		return true;
	} catch (error) {
		return false;
	}
};


export const editUsername = async (
	id: string,
	name: string,
): Promise<boolean> => {
	const sanitizedName = name
		.replace(/<[^>]*>?/gm, "")
		.trim()
		.slice(0, 50);
	await new Promise((resolve) => setTimeout(resolve, 1000));
	if (!ObjectId.isValid(id)) {
		return false;
	}
	try {
		await users.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: { name: sanitizedName } },
		);
		return true;
	} catch (error) {
		return false;
	}
};


export const handleSignOut = async (): Promise<void> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	await signOut({ redirectTo: "/" });
};
