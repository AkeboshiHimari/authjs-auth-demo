import Twitter from "next-auth/providers/twitter";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
export default {
	providers: [
		Google({
			authorization: {
				params: {
					scope: "openid profile",
				},
			},
		}),
		Twitter({
			authorization: {
				params: {
					scope: "offline.access",
				},
			},
		}),
	],
} satisfies NextAuthConfig;
